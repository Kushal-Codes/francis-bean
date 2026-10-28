/**
 * Serverless Function: /api/chat
 * 
 * Secure proxy for conversational cafe inquiries.
 * - Protects API keys (never exposed to client).
 * - Enforces strict grounding in verified Francis Bean records.
 * - Fallbacks 100% reliably to deterministic engine if GEMINI_API_KEY is not configured or fails.
 */

import { processChatQuery } from '../src/utils/chatbotEngine';
import { MENU_ITEMS } from '../src/data/menu';

// Simple in-memory rate limiter for serverless environment
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(clientIp: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 25; // max 25 messages per minute

  const record = rateLimitMap.get(clientIp);
  if (!record || record.expiresAt < now) {
    rateLimitMap.set(clientIp, { count: 1, expiresAt: now + windowMs });
    return false;
  }

  if (record.count >= maxRequests) {
    return true;
  }

  record.count += 1;
  return false;
}

export default async function handler(req: any, res: any) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const clientIp = (req.headers && req.headers['x-forwarded-for']) || req.socket?.remoteAddress || 'local';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      text: "Whoa, slow down a sec! Beanie's pouring a coffee. Please wait a moment before sending another message.",
      sourceConfidence: 'rate_limited',
    });
  }

  try {
    const { message } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message string' });
    }

    const trimmed = message.trim().slice(0, 300); // enforce length limit
    if (!trimmed) {
      return res.status(400).json({ error: 'Empty message' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If no key is configured in the environment, use our deterministic grounded engine
    if (!apiKey) {
      const deterministicResponse = processChatQuery(trimmed);
      return res.status(200).json(deterministicResponse);
    }

    // Optional Gemini API call with strict grounding instructions
    const systemPrompt = `You are "Beanie", the charming, friendly, illustrated coffee-bean character assistant for Francis Bean Café, located at 3 Mari Street, Alexandra Headland, QLD, Australia.
Trading hours: Monday to Sunday 6:00 AM to 1:00 PM.
Phone: (07) 5479 0079.
Coffee: Proudly brews Campos Superior Blend.
Dog policy: Dogs are warmly welcome at outdoor tables.
Takeaway: Full takeaway available.

CRITICAL RULES:
1. ONLY answer using the verified menu and cafe details provided.
2. NEVER invent a dish, price, discount, ingredient, or live inventory status.
3. If asked about live availability, state that you cannot check live kitchen stock and advise calling (07) 5479 0079.
4. If asked about severe nut or coeliac allergies, state that the kitchen handles nuts, gluten, dairy and eggs daily, and instruct them to speak directly with staff on (07) 5479 0079 before ordering.
5. Tone: Warm, relaxed, Australian coastal cafe companion. Concise (2-4 sentences max).

Menu Items:
${MENU_ITEMS.map(i => `- ${i.name} (${i.priceFormatted}): ${i.description}`).join('\n')}
`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: 'user',
            parts: [{ text: trimmed }],
          },
        ],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 250,
        },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (geminiRes.ok) {
      const geminiData = await geminiRes.json();
      const generatedText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        // Also run deterministic item search to attach clickable dish cards
        const localCheck = processChatQuery(trimmed);
        return res.status(200).json({
          text: generatedText.trim(),
          highlightItems: localCheck.highlightItems,
          suggestedAction: localCheck.suggestedAction,
          sourceConfidence: 'gemini_grounded',
        });
      }
    }

    // Fallback if Gemini fails or times out
    const fallbackResponse = processChatQuery(trimmed);
    return res.status(200).json(fallbackResponse);
  } catch {
    // Silent safe fallback
    const fallbackResponse = processChatQuery(req.body?.message || '');
    return res.status(200).json(fallbackResponse);
  }
}
