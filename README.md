# Francis Bean — The Interactive Illustrated Café

> **A Little Café World By The Coast**  
> An interactive digital sales demonstration built for **Francis Bean**, located at 3 Mari Street, Alexandra Headland, Queensland, Australia. Inspired directly by the café’s warm hand-drawn illustrated menu.

---

## ☕ Creative Vision

Instead of a generic, corporate restaurant template with static white boxes, **Francis Bean** transforms the café’s physical, illustrated breakfast menu into a living digital world.

- **Warm Paper Aesthetic:** Cream textured paper background (`#FFF7EA`), soft peach (`#F1C5A8`), dark cocoa brown outlines (`#49352D`), butter yellow accents (`#F1CF82`), and coastal seafoam (`#BDD6C7`).
- **Artisan Typography:** Distinctive editorial serif lettering (*Fraunces*), natural handwritten annotations (*Kalam*), and legible body text (*DM Sans*).
- **Original Hand-Drawn SVG System:** Bespoke illustrated ceramic coffee cups with animated curling steam, smiling egg mascot, smiling biscuit badge, toast, croissants, bagels, and strawberries.
- **The $16 Brekkie Club:** Prominent illustrated ticket promotion inspired directly by the top-right block of the physical menu.
- **Meet Beanie:** A conversational café assistant integrated with the real menu dataset and strictly grounded against hallucination.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ or v26)
- npm (v9+)

### Installation & Local Run
```bash
# 1. Navigate to the project directory
cd francis-bean

# 2. Start the local development server (includes local /api/chat mock)
npm run dev

# 3. Or build and preview the optimized production build
npm run build
npm run preview
```
Visit `http://localhost:5173` (or `http://localhost:4173` for preview).

---

## 📂 Content Management Guide for Café Owners

All business facts, menu items, prices, hours, and editorial stories are cleanly decoupled into **four structured configuration files** in `src/data/`. You can update the entire website and chatbot without editing a single React component!

### 1. `src/data/menu.ts` (Menu Items, Prices, Ingredients)
Add, remove, or modify any food or beverage:
```typescript
{
  id: 'brekky-wrap',
  name: 'Brekky Wrap',
  category: 'QUICK & EASY',
  description: 'Crispy bacon, fried free-range egg, baby spinach, melted cheese and smoky BBQ sauce.',
  priceAUD: 16.80,
  priceFormatted: '$16.80',
  priceVerified: true,
  lastVerified: '2026-10-28',
  sourceURL: 'In-store Physical Menu',
  ingredients: ['Crispy bacon', 'Fried egg', 'Baby spinach', 'Tasty cheese', 'BBQ sauce', 'Wrap'],
  verifiedDietaryTags: [],
  allergenInformation: 'Contains gluten, egg, dairy.',
  availabilityStatus: 'available',
  featured: true,
  badge: 'Morning Classic'
}
```

### 2. `src/data/business.ts` (Hours, Address, Phone, Policy)
Update operating hours, telephone numbers, and trading statuses:
```typescript
export const BUSINESS_DATA = {
  name: "Francis Bean",
  address: {
    street: "3 Mari Street",
    suburb: "Alexandra Headland",
    state: "QLD",
    postcode: "4572",
    formatted: "3 Mari St, Alexandra Headland, QLD 4572",
    mapsQueryUrl: "https://www.google.com/maps/search/?api=1&query=Francis+Bean+3+Mari+St+Alexandra+Headland+QLD"
  },
  contact: {
    phoneDisplay: "(07) 5479 0079",
    phoneRaw: "+61754790079"
  },
  operatingHours: [
    { day: "Monday", open: "06:00", close: "13:00", isOpen: true },
    // ...
  ]
};
```

### 3. `src/data/faqs.ts` (Chatbot Knowledge Base)
Add customer questions, keyword synonyms, and quick starter actions:
```typescript
{
  id: 'faq-dog-friendly',
  category: 'amenities',
  question: "Can I bring my dog?",
  aliases: ["are dogs allowed", "pet friendly"],
  keywords: ["dog", "pet", "puppy"],
  answer: "Yes! Francis Bean is proudly dog-friendly with relaxed outdoor seating."
}
```

### 4. `src/data/siteContent.ts` (Marketing Copy & Scrapbook Photos)
Change hero headlines, scrapbook captions, and seasonal notices:
```typescript
export const SITE_CONTENT = {
  hero: {
    headlinePart1: "Good mornings start",
    headlinePart2: "with good beans.",
    subheading: "Your little coffee stop by the coast..."
  },
  brekkieSpecial: {
    title: "The $16 Brekkie Club",
    // ...
  }
};
```

---

## 🤖 Beanie Assistant: Hybrid Architecture & Setup

Beanie uses a **3-tier cost-efficient hybrid architecture**:

```
User Query
   │
   ├── Layer 1: Strict Allergen & Stock Safeguards (Zero hallucination policy)
   │
   ├── Layer 2: Deterministic FAQ & Structured Menu Search Engine (Instant, Offline)
   │
   └── Layer 3: Optional Gemini API (Natural language synthesis via /api/chat proxy)
```

### Optional Gemini API Setup
If you wish to enable Google Gemini natural language processing:
1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
2. Set `GEMINI_API_KEY` in your environment or Vercel dashboard:
   ```bash
   GEMINI_API_KEY="AIzaSy..."
   ```
3. When deployed, `api/chat.ts` proxies user queries with strict grounding prompts.
4. **Fallback Safety:** If no key is set or if the network times out, Beanie automatically falls back to the deterministic client-side engine with 100% accuracy.

### Anti-Hallucination & Allergen Guardrails
- **Allergies:** The chatbot **never** promises 100% allergy-free preparation. Anyone asking about serious coeliac or anaphylactic nut allergies is immediately instructed to phone the kitchen staff directly on `(07) 5479 0079`.
- **Live Inventory:** The chatbot explicitly states that this digital demonstration is not connected to live kitchen inventory and recommends calling ahead for batch-sensitive bakery items.
- **Prices:** The chatbot only cites verified prices from `src/data/menu.ts` and will never invent discounts (e.g., rejecting queries like "Can I get a wrap for $5?").

---

## 🔍 Business Verification Report & Owner Checklist

Before official commercial launch, the following items documented in `BUSINESS_RESEARCH.md` should be confirmed with the owner of Francis Bean:

1. **Current $16 Breakfast Deal Terms:** Confirm whether the $16 special is active all week or weekdays only, and confirm whether size upgrades are currently active.
2. **Seasonal Kitchen Wraps:** Confirm whether the Pork Belly Wrap and seasonal quiches are currently on rotation.
3. **Public Holiday Surcharge:** Confirm whether standard 10–15% public holiday surcharges apply.
4. **Retail Coffee Bean Pricing:** Confirm whether Campos Superior 250g, 500g, and 1kg bag prices match latest roaster wholesale prices.

---

## 🚢 Deployment to Vercel

The application is pre-configured for instant zero-config deployment to Vercel:
```bash
# If Vercel CLI is installed and authenticated:
vercel --prod
```
Or connect the repository to the [Vercel Dashboard](https://vercel.com).
The `vercel.json` file handles routing and serverless `/api/chat` dispatch.
