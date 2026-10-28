/**
 * FRANCIS BEAN — GROUNDED CONVERSATIONAL CHATBOT ENGINE
 * 
 * Multi-layer hybrid query processing:
 * 1. Intent & FAQ Matching
 * 2. Menu Item Search & Price Constraints ($5, under $15, etc.)
 * 3. Dietary & Ingredient Inspection
 * 4. Brisbane Timezone & Trading Hours Resolution
 * 5. Strict Fallbacks (No hallucination of inventory, discounts, or allergen safety)
 */

import { MENU_ITEMS, MenuItem } from '../data/menu';
import { FAQ_ITEMS, FAQItem } from '../data/faqs';
import { BUSINESS_DATA } from '../data/business';
import { getBrisbaneCaféStatus } from './brisbaneTime';

export interface ChatResponse {
  text: string;
  matchedFaqId?: string;
  highlightItems?: MenuItem[];
  suggestedAction?: {
    type: 'scroll-to-menu' | 'filter-category' | 'call-phone' | 'open-maps';
    target?: string;
    label: string;
  };
  sourceConfidence: 'verified_fact' | 'menu_retrieval' | 'faq_match' | 'safe_fallback';
}

function cleanInput(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[?!.,'’]/g, '');
}

export function processChatQuery(rawQuery: string): ChatResponse {
  const query = cleanInput(rawQuery);

  // 1. Check for greetings, empty or very short input
  const greetings = ['hi', 'hello', 'hey', 'gday', 'g\'day', 'good morning', 'howdy', 'yo'];
  if (!query || query.length <= 2 || greetings.includes(query)) {
    return {
      text: "G'day! I'm Beanie, your little coffee guide at Francis Bean in Alexandra Headland. Ask me anything about our breakfast menu, prices, Campos coffee, opening hours, or where to find us on Mari Street!",
      suggestedAction: {
        type: 'scroll-to-menu',
        label: 'Take a peek at the menu',
      },
      sourceConfidence: 'safe_fallback',
    };
  }

  // 2. Severe Allergies & Safety Protocol (Top Priority)
  if (
    query.includes('severe') ||
    query.includes('anaphyl') ||
    query.includes('nut allergy') ||
    query.includes('peanut') ||
    query.includes('coeliac') ||
    query.includes('celiac disease') ||
    query.includes('cross contamination')
  ) {
    return {
      text: `Your safety is our top priority! Our kitchen handles nuts, sesame, eggs, dairy, and wheat flour daily. If you have an anaphylactic allergy or strict coeliac condition, we cannot guarantee zero cross-contact online. Please phone our team directly on ${BUSINESS_DATA.contact.phoneDisplay} or speak with our kitchen staff before ordering so we can discuss safe options with you.`,
      suggestedAction: {
        type: 'call-phone',
        target: BUSINESS_DATA.contact.phoneRaw,
        label: `Call ${BUSINESS_DATA.contact.phoneDisplay}`,
      },
      sourceConfidence: 'verified_fact',
    };
  }

  // 3. Live Inventory & Availability Question
  if (
    query.includes('available right now') ||
    query.includes('available today') ||
    query.includes('in stock') ||
    query.includes('sold out') ||
    query.includes('do you have any left')
  ) {
    return {
      text: `While our core dishes (like açaí bowls, breakfast wraps, and Campos coffees) are made fresh daily, this digital menu is not connected to live kitchen stock. Daily baked cabinet treats can occasionally sell out! If you're heading in specifically for something, give the team a quick ring on ${BUSINESS_DATA.contact.phoneDisplay} to check.`,
      suggestedAction: {
        type: 'call-phone',
        target: BUSINESS_DATA.contact.phoneRaw,
        label: `Call ${BUSINESS_DATA.contact.phoneDisplay} to Confirm Stock`,
      },
      sourceConfidence: 'verified_fact',
    };
  }

  // 4. Unrealistically low or fabricated discount queries (e.g. "wrap for $5")
  const priceMatch = rawQuery.match(/\$(\d+(\.\d+)?)/);
  if (priceMatch) {
    const requestedPrice = parseFloat(priceMatch[1]);
    if (query.includes('wrap') && requestedPrice < 10) {
      return {
        text: `Our Brekky Wrap is $16.80 and our Pork Belly Wrap is $17.00 (we don't have $5 wraps, as much as we'd love that!). If you're after something lighter or budget-friendly, check out our Toasted Banana Bread ($6.50), Raisin Toast ($7.00), or Daily Quiche ($8.50).`,
        highlightItems: MENU_ITEMS.filter((item) => item.priceAUD < 12),
        suggestedAction: {
          type: 'scroll-to-menu',
          label: 'View Budget Bites',
        },
        sourceConfidence: 'verified_fact',
      };
    }
    if (requestedPrice <= 15 && (query.includes('under') || query.includes('cheap') || query.includes('budget') || query.includes('less than'))) {
      const budgetItems = MENU_ITEMS.filter((item) => item.priceAUD <= 15);
      return {
        text: `Here are our delicious items under $${requestedPrice}: ${budgetItems.map((i) => `${i.name} (${i.priceFormatted})`).join(', ')}. Pop down to Mari Street to grab one!`,
        highlightItems: budgetItems,
        suggestedAction: {
          type: 'scroll-to-menu',
          label: 'See Menu',
        },
        sourceConfidence: 'menu_retrieval',
      };
    }
  }

  // 5. General Menu Overview
  if (
    query === 'whats on the menu' ||
    query === 'menu' ||
    query.includes('what can i eat') ||
    query.includes('show me the menu') ||
    query.includes('breakfast menu')
  ) {
    return {
      text: "We serve fresh, beachside breakfast and brunch classics! Our menu features Quick & Easy wraps & muffins, our famous $16 Brekkie Club deal with coffee included, Signature Eggs Benny & Chilli Scramble, artisan bagels (like the B.E.A.T Bagel), refreshing Açaí (acai) & Yoghurt Bowls, and Campos specialty coffee.",
      highlightItems: MENU_ITEMS.filter((i) => i.featured),
      suggestedAction: {
        type: 'scroll-to-menu',
        label: 'Explore the Menu',
      },
      sourceConfidence: 'verified_fact',
    };
  }

  // 6. Brisbane Timezone & Opening Hours (Tomorrow, Sunday, Right Now)
  if (
    query.includes('open') ||
    query.includes('hour') ||
    query.includes('close') ||
    query.includes('sunday') ||
    query.includes('tomorrow') ||
    query.includes('trading')
  ) {
    const status = getBrisbaneCaféStatus();
    const isAskingSunday = query.includes('sunday');
    const isAskingTomorrow = query.includes('tomorrow');

    let answerPrefix = '';
    if (isAskingSunday) {
      answerPrefix = "Yes, we are open on Sunday! ";
    } else if (isAskingTomorrow) {
      answerPrefix = "Yes! Tomorrow we open bright and early at 6:00 am. ";
    }

    return {
      text: `${answerPrefix}Francis Bean is open 7 days a week, Monday to Sunday, from 6:00 AM to 1:00 PM (Australia/Brisbane time). Currently: ${status.message}. Note that public holiday trading can vary slightly, so feel free to call on ${BUSINESS_DATA.contact.phoneDisplay}.`,
      suggestedAction: {
        type: 'scroll-to-menu',
        label: 'View Trading Hours',
      },
      sourceConfidence: 'verified_fact',
    };
  }

  // 7. Location, Address & Directions
  if (
    query.includes('where') ||
    query.includes('address') ||
    query.includes('direction') ||
    query.includes('location') ||
    query.includes('find us') ||
    query.includes('mari st')
  ) {
    return {
      text: `You'll find us at 3 Mari Street, Alexandra Headland, QLD 4572. We're nestled just behind Alexandra Parade, an easy two-minute barefoot stroll from the Alex surf beach and surf club. Look for our warm peach awning!`,
      suggestedAction: {
        type: 'open-maps',
        target: BUSINESS_DATA.address.mapsQueryUrl,
        label: 'Open in Google Maps',
      },
      sourceConfidence: 'verified_fact',
    };
  }

  // 8. Coffee & Roaster Details
  if (
    query.includes('coffee') ||
    query.includes('bean') ||
    query.includes('campos') ||
    query.includes('espresso') ||
    query.includes('latte') ||
    query.includes('flat white') ||
    query.includes('roaster')
  ) {
    const coffeeItems = MENU_ITEMS.filter((i) => i.category === 'COFFEE & DRINKS');
    return {
      text: `We proudly serve Campos Coffee! We extract the signature Campos Superior Blend — famous for its sweet caramel, Belgian chocolate, and malt sweetness. We also brew 18-hour Cold Brew ($7.80) and sell 250g ($22.00) and 1kg ($65.00) bags of whole beans to brew at home.`,
      highlightItems: coffeeItems,
      suggestedAction: {
        type: 'filter-category',
        target: 'COFFEE & DRINKS',
        label: 'View Coffee Menu',
      },
      sourceConfidence: 'verified_fact',
    };
  }

  // 9. $16 Brekkie Deal / Breakfast Special
  if (
    query.includes('16') ||
    query.includes('deal') ||
    query.includes('special') ||
    query.includes('brekkie club')
  ) {
    const dealItems = MENU_ITEMS.filter((i) => i.category === 'BREAKFAST DEAL');
    return {
      text: `Our '$16 Brekkie Club' includes your choice of: 1) Eggs on Toast + Coffee ($16.00), 2) Bacon & Egg Roll + Coffee ($16.00), or 3) Smashed Avo (1/2 avo) + Coffee ($16.00). Regular Campos coffee included in every deal! (Upgrade to Large for +$1, or any Smoothie for +$3). Check in-store for daily availability.`,
      highlightItems: dealItems,
      suggestedAction: {
        type: 'filter-category',
        target: 'BREAKFAST DEAL',
        label: 'Explore $16 Deal',
      },
      sourceConfidence: 'verified_fact',
    };
  }

  // 10. Pet / Dog Policy
  if (
    query.includes('dog') ||
    query.includes('pet') ||
    query.includes('puppy') ||
    query.includes('paws')
  ) {
    return {
      text: `Yes, absolutely! Francis Bean is proudly dog-friendly. We have relaxed outdoor alfresco seating where your furry friend is welcome to relax by your side, plus fresh water bowls on hand after beach walks.`,
      sourceConfidence: 'verified_fact',
    };
  }

  // 11. Vegetarian & Vegan Inquiries
  if (query.includes('vegan') || query.includes('plant based') || query.includes('plant-based')) {
    const veganItems = MENU_ITEMS.filter((i) => 
      i.verifiedDietaryTags.includes('Vegan-Friendly')
    );
    return {
      text: `Our Signature Açaí Bowl ($18.90), Francis Bean Cold Brew ($7.80), and Coastal Green Smoothie ($10.50) are naturally vegan-friendly! You can also request our Smashed Avo on Toast without feta. We offer oat, almond, and soy milk for all coffees.`,
      highlightItems: veganItems,
      suggestedAction: {
        type: 'filter-category',
        target: 'FRUIT BOWLS',
        label: 'View Vegan-Friendly Options',
      },
      sourceConfidence: 'verified_fact',
    };
  }

  if (query.includes('vegetarian') || query.includes('veggie')) {
    const vegItems = MENU_ITEMS.filter((i) => 
      i.verifiedDietaryTags.some((t) => t.toLowerCase().includes('vegetarian'))
    );
    return {
      text: `We have great vegetarian options! Favorites include our Full Smashed Avo on Toast ($18.90), Grilled Halloumi Bagel ($16.00), Eggs Benny with Mushrooms ($20.90), Chilli Scramble ($20.90), Açaí Bowl ($18.90), and Thick Raisin Toast ($7.00).`,
      highlightItems: vegItems,
      suggestedAction: {
        type: 'scroll-to-menu',
        label: 'Explore Vegetarian Dishes',
      },
      sourceConfidence: 'verified_fact',
    };
  }

  // 12. Gluten-Free Inquiry
  if (query.includes('gluten') || query.includes('gf') || query.includes('coeliac') || query.includes('celiac')) {
    return {
      text: `We offer gluten-free bread substitutions for our toast, eggs, and bagel dishes on request. Our Cold Brew and fruit smoothies are naturally wheat-free. Please note that our kitchen is an active bakery environment handling flour daily, so we cannot guarantee 100% coeliac cross-contact safety.`,
      suggestedAction: {
        type: 'scroll-to-menu',
        label: 'View Menu Items',
      },
      sourceConfidence: 'verified_fact',
    };
  }

  // 13. Bagels Query
  if (query.includes('bagel')) {
    const bagels = MENU_ITEMS.filter((i) => i.category === 'BAGELS');
    return {
      text: `Our artisan bagels are toasted to order: 1) B.E.A.T Bagel ($17.00) with bacon, fried egg, avocado, tomato, spinach, Kewpie mayo & sweet strawberry jam; 2) Rustic Bagel ($16.00) with grilled pesto chicken, fried egg, spinach & mayo; and 3) Grilled Halloumi Bagel ($16.00) with golden halloumi, roasted tomato & relish.`,
      highlightItems: bagels,
      suggestedAction: {
        type: 'filter-category',
        target: 'BAGELS',
        label: 'View Artisan Bagels',
      },
      sourceConfidence: 'menu_retrieval',
    };
  }

  // 14. Direct Specific Menu Item Search (e.g. "acai", "wrap", "eggs benny", "chilli scramble")
  const foundItem = MENU_ITEMS.find((item) => 
    query.includes(item.name.toLowerCase()) ||
    (item.name.toLowerCase().includes('açaí') && (query.includes('acai') || query.includes('açaí'))) ||
    (item.id.includes('wrap') && query.includes('wrap')) ||
    (item.id.includes('benny') && (query.includes('benny') || query.includes('benedict'))) ||
    (item.id.includes('chilli') && query.includes('chilli'))
  );

  if (foundItem) {
    const isPriceQuery = query.includes('how much') || query.includes('price') || query.includes('cost');
    let reply = '';
    if (isPriceQuery) {
      reply = `${foundItem.name} is published at ${foundItem.priceFormatted} (verified from café menu records). ${foundItem.description}`;
    } else {
      reply = `${foundItem.name} (${foundItem.priceFormatted}): ${foundItem.description} Ingredients include: ${foundItem.ingredients.join(', ')}.`;
    }

    if (foundItem.subOptions && foundItem.subOptions.length > 0) {
      reply += ` Options: ${foundItem.subOptions.map((o) => `${o.name} (${o.priceAUD > 0 ? `+$${o.priceAUD.toFixed(2)}` : ''})`).join(', ')}.`;
    }

    return {
      text: reply,
      highlightItems: [foundItem],
      suggestedAction: {
        type: 'scroll-to-menu',
        label: `View ${foundItem.name}`,
      },
      sourceConfidence: 'menu_retrieval',
    };
  }

  // 15. Takeaway
  if (query.includes('takeaway') || query.includes('take away') || query.includes('to go')) {
    return {
      text: `Yes, we offer our full menu for takeaway! Grab your Campos coffee, Brekky Wrap, Bagel, or Açaí Bowl and take a two-minute stroll straight down to Alexandra Headland beach.`,
      sourceConfidence: 'verified_fact',
    };
  }

  // 16. Kids & Family
  if (query.includes('kid') || query.includes('children') || query.includes('family')) {
    return {
      text: `Little ones love our Toasted Banana Bread ($6.50), buttered Raisin Toast ($7.00), Bacon & Egg Muffin ($10.80), and fresh fruit smoothies. Our outdoor beachside seating is relaxed, pram-friendly, and very welcoming for families!`,
      sourceConfidence: 'verified_fact',
    };
  }

  // 17. Match against FAQ keywords
  for (const faq of FAQ_ITEMS) {
    if (faq.aliases.some((alias) => query.includes(cleanInput(alias)))) {
      const items = faq.highlightMenuItems 
        ? MENU_ITEMS.filter((m) => faq.highlightMenuItems?.includes(m.id))
        : undefined;

      return {
        text: faq.answer,
        matchedFaqId: faq.id,
        highlightItems: items,
        suggestedAction: faq.actionHint ? {
          type: faq.actionHint.type,
          target: faq.actionHint.target,
          label: 'View Relevant Items',
        } : undefined,
        sourceConfidence: 'faq_match',
      };
    }
  }

  // 18. Keyword scoring across all FAQs
  const words = query.split(/\s+/).filter((w) => w.length > 3);
  let bestFaq: FAQItem | null = null;
  let maxScore = 0;

  for (const faq of FAQ_ITEMS) {
    let score = 0;
    for (const word of words) {
      if (faq.keywords.some((k) => k.includes(word) || word.includes(k))) score += 2;
      if (faq.question.toLowerCase().includes(word)) score += 1;
    }
    if (score > maxScore) {
      maxScore = score;
      bestFaq = faq;
    }
  }

  if (bestFaq && maxScore >= 2) {
    const items = bestFaq.highlightMenuItems 
      ? MENU_ITEMS.filter((m) => bestFaq?.highlightMenuItems?.includes(m.id))
      : undefined;
    return {
      text: bestFaq.answer,
      matchedFaqId: bestFaq.id,
      highlightItems: items,
      sourceConfidence: 'faq_match',
    };
  }

  // 19. Graceful café fallback (Strictly avoids hallucination)
  return {
    text: `That one's worth double-checking directly with the friendly team at the counter! You can give the café a ring on ${BUSINESS_DATA.contact.phoneDisplay} during trading hours (6:00 am to 1:00 pm daily), or feel free to ask me about our coffee, wraps, bagels, or opening hours!`,
    suggestedAction: {
      type: 'call-phone',
      target: BUSINESS_DATA.contact.phoneRaw,
      label: `Call ${BUSINESS_DATA.contact.phoneDisplay}`,
    },
    sourceConfidence: 'safe_fallback',
  };
}
