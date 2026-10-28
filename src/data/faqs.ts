/**
 * FRANCIS BEAN — DETERMINISTIC FAQ & KNOWLEDGE BASE
 * 
 * Used for instant deterministic chatbot response matching,
 * offline search, and grounded AI knowledge base injection.
 */

export interface FAQItem {
  id: string;
  category: 'menu' | 'pricing' | 'dietary' | 'hours' | 'location' | 'amenities' | 'safety';
  question: string;
  aliases: string[];
  keywords: string[];
  answer: string;
  actionHint?: {
    type: 'scroll-to-menu' | 'filter-category' | 'call-phone' | 'open-maps';
    target?: string;
  };
  highlightMenuItems?: string[];
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-menu-overview',
    category: 'menu',
    question: "What's on the menu at Francis Bean?",
    aliases: [
      "what's on your breakfast menu",
      "show me the menu",
      "what food do you serve",
      "what can i eat",
      "tell me about your food"
    ],
    keywords: ["menu", "food", "eat", "breakfast", "brekkie", "brunch", "serve", "options"],
    answer: "We serve fresh, beachside breakfast and brunch classics! Our menu features Quick & Easy wraps & muffins, our famous $16 Brekkie Club with coffee, Signature Eggs Benny & Chilli Scramble, artisan bagels (like the B.E.A.T Bagel), refreshing Açaí & Yoghurt Bowls, and Campos specialty coffee.",
    actionHint: { type: 'scroll-to-menu' },
    highlightMenuItems: ['brekky-wrap', 'signature-eggs-benny', 'acai-bowl', 'beat-bagel'],
  },
  {
    id: 'faq-acai-bowl',
    category: 'pricing',
    question: "How much is an açaí bowl?",
    aliases: [
      "how much is the acai bowl",
      "acai bowl price",
      "cost of acai bowl",
      "acai cost"
    ],
    keywords: ["acai", "açaí", "bowl", "price", "cost", "how much"],
    answer: "Our Signature Açaí Bowl is published at $18.90 (verified in our latest menu records). It comes loaded with organic frozen açaí, banana, coconut water, crunchy toasted granola, fresh strawberries, blueberries, chia seeds, and toasted coconut flakes.",
    actionHint: { type: 'filter-category', target: 'FRUIT BOWLS' },
    highlightMenuItems: ['acai-bowl'],
  },
  {
    id: 'faq-brekky-deal',
    category: 'pricing',
    question: "Do you have a $16 breakfast deal?",
    aliases: [
      "is there a 16 dollar deal",
      "brekkie club",
      "breakfast special",
      "16 dollar breakfast",
      "cheap breakfast deal"
    ],
    keywords: ["16", "$16", "deal", "special", "club", "brekkie deal", "breakfast deal"],
    answer: "Yes! Our '$16 Brekkie Club' includes your choice of 1) Eggs on toast (poached, scrambled or fried), 2) Bacon & egg roll with cheese & BBQ, or 3) Smashed Avo (1/2 avo) on sourdough — each paired with a regular Campos coffee for just $16! (You can upgrade to a large coffee for +$1 or a smoothie for +$3).",
    actionHint: { type: 'filter-category', target: 'BREAKFAST DEAL' },
    highlightMenuItems: ['deal-eggs-on-toast', 'deal-bacon-egg-roll', 'deal-smash-avo'],
  },
  {
    id: 'faq-under-15',
    category: 'pricing',
    question: "Do you have anything under $15?",
    aliases: [
      "what can i get for under $15",
      "cheap items",
      "budget options",
      "anything cheap"
    ],
    keywords: ["under 15", "under $15", "cheap", "budget", "affordable", "less than 15"],
    answer: "We have several delicious options under $15! Try our thick-cut Toasted Banana Bread ($6.50), Warm Spiced Raisin Toast ($7.00), Francis Bean 18hr Cold Brew ($7.80), House Daily Quiche ($8.50), Bacon Egg & Cheese Muffin ($10.80), or Flaky Ham & Cheese Croissant ($10.00).",
    actionHint: { type: 'scroll-to-menu' },
    highlightMenuItems: ['baked-banana-bread', 'raisin-toast', 'bacon-egg-muffin', 'croissant-ham-cheese'],
  },
  {
    id: 'faq-coffee-beans',
    category: 'menu',
    question: "What coffee do you use?",
    aliases: [
      "what beans do you brew",
      "who roasts your coffee",
      "what brand of coffee",
      "tell me about your coffee"
    ],
    keywords: ["coffee", "beans", "campos", "roast", "espresso", "latte", "flat white"],
    answer: "We proudly brew Australia's award-winning Campos Coffee! Our house espresso is the iconic Campos Superior Blend — famous for its sweet caramel, Belgian chocolate, and malt profile. We also pour slow-steeped 18-hour Cold Brew ($7.80) and sell 250g, 500g, and 1kg bags of fresh Campos beans to brew at home.",
    actionHint: { type: 'filter-category', target: 'COFFEE & DRINKS' },
    highlightMenuItems: ['campos-milk-coffee', 'francis-bean-cold-brew', 'retail-beans-250g'],
  },
  {
    id: 'faq-breakfast-wrap',
    category: 'menu',
    question: "What's in the breakfast wrap?",
    aliases: [
      "what is in the brekky wrap",
      "brekky wrap ingredients",
      "breakfast wrap contents",
      "what's in the wrap"
    ],
    keywords: ["wrap", "brekky wrap", "breakfast wrap", "ingredients in wrap"],
    answer: "Our Brekky Wrap ($16.80) is filled with crispy grilled bacon, a fried free-range egg, fresh baby spinach, melted cheese, and smoky BBQ sauce all toasted inside a warm flatbread. We also serve a Pork Belly Wrap ($17.00) with tender slow-cooked pork belly and crunchy slaw!",
    actionHint: { type: 'filter-category', target: 'QUICK & EASY' },
    highlightMenuItems: ['brekky-wrap', 'pork-belly-wrap'],
  },
  {
    id: 'faq-bagels',
    category: 'menu',
    question: "Show me your bagels",
    aliases: [
      "what bagels do you have",
      "bagel options",
      "tell me about bagels",
      "do you sell bagels"
    ],
    keywords: ["bagel", "bagels", "beat bagel", "rustic bagel", "halloumi bagel"],
    answer: "We love our artisan bagels! Options include: 1) The B.E.A.T Bagel ($17.00) with bacon, fried egg, avocado, tomato, spinach, Kewpie mayo & sweet strawberry jam; 2) The Rustic Bagel ($16.00) with grilled pesto chicken, fried egg, spinach & mayo; and 3) The Grilled Halloumi Bagel ($16.00) with golden halloumi, roasted tomato, spinach & relish.",
    actionHint: { type: 'filter-category', target: 'BAGELS' },
    highlightMenuItems: ['beat-bagel', 'rustic-bagel', 'halloumi-bagel'],
  },
  {
    id: 'faq-vegetarian',
    category: 'dietary',
    question: "Do you have vegetarian options?",
    aliases: [
      "vegetarian food",
      "veggie options",
      "is there vegetarian breakfast",
      "meat free"
    ],
    keywords: ["vegetarian", "veggie", "meat-free", "plant"],
    answer: "Yes, we have wonderful vegetarian choices! Customer favorites include our Smashed Avo on Toast ($18.90), Grilled Halloumi Bagel ($16.00), Signature Eggs Benny with Sautéed Mushrooms ($20.90), Chilli Scramble Eggs ($20.90), Açaí Bowl ($18.90), Greek Yoghurt & Granola Bowl ($18.90), and Thick Raisin Toast ($7.00).",
    actionHint: { type: 'scroll-to-menu' },
    highlightMenuItems: ['halloumi-bagel', 'signature-smash-avo-full', 'acai-bowl'],
  },
  {
    id: 'faq-vegan',
    category: 'dietary',
    question: "Do you have vegan food?",
    aliases: [
      "vegan options",
      "is anything vegan",
      "plant based",
      "dairy free vegan"
    ],
    keywords: ["vegan", "plant-based", "dairy-free", "dairy free"],
    answer: "Our Signature Açaí Bowl ($18.90) is naturally plant-based and vegan-friendly. You can also enjoy our Coastal Green Smoothie ($10.50), Francis Bean Cold Brew ($7.80), or ask for our Smashed Avo on Toast prepared without feta. We offer oat, almond, and soy milks for all coffees.",
    actionHint: { type: 'filter-category', target: 'FRUIT BOWLS' },
    highlightMenuItems: ['acai-bowl', 'smoothie-green', 'francis-bean-cold-brew'],
  },
  {
    id: 'faq-gluten-free',
    category: 'dietary',
    question: "Do you have anything without gluten?",
    aliases: [
      "gluten free options",
      "gf breakfast",
      "celiac options",
      "coeliac",
      "gluten free"
    ],
    keywords: ["gluten", "gluten-free", "gf", "coeliac", "celiac", "wheat"],
    answer: "We offer gluten-free bread substitutions for our toast and egg dishes upon request, and our Cold Brew and Smoothies are naturally wheat-free. However, please note that our kitchen is an active environment handling flour and sourdough daily, so we cannot guarantee 100% coeliac cross-contact safety.",
    actionHint: { type: 'scroll-to-menu' },
  },
  {
    id: 'faq-allergies',
    category: 'safety',
    question: "What if I have a serious allergy?",
    aliases: [
      "serious allergy",
      "nut allergy",
      "severe coeliac",
      "anaphylaxis",
      "peanut allergy"
    ],
    keywords: ["allergy", "allergies", "nut", "peanut", "anaphylactic", "severe", "cross contamination"],
    answer: "For your safety, please let our team know directly! Our kitchen uses dairy, eggs, gluten, nuts, and sesame. If you have an anaphylactic allergy or strict medical dietary requirement, please call us directly on (07) 5479 0079 or speak directly with our kitchen staff before ordering so we can discuss preparation details.",
    actionHint: { type: 'call-phone' },
  },
  {
    id: 'faq-opening-hours',
    category: 'hours',
    question: "What are your opening hours? Are you open on Sunday?",
    aliases: [
      "when are you open",
      "opening times",
      "trading hours",
      "are you open tomorrow",
      "are you open sunday",
      "are you open monday",
      "what time do you close"
    ],
    keywords: ["hours", "open", "close", "sunday", "tomorrow", "time", "trading", "weekend"],
    answer: "Francis Bean is open 7 days a week, Monday through Sunday, from 6:00 AM to 1:00 PM (Australia/Brisbane time). We're an early morning spot perfect for pre-surf coffee and relaxed coastal breakfasts! Note: public holiday hours may vary, so feel free to call ahead on (07) 5479 0079.",
    actionHint: { type: 'scroll-to-menu' },
  },
  {
    id: 'faq-location',
    category: 'location',
    question: "Where are you located?",
    aliases: [
      "where are you",
      "how do i find you",
      "what is your address",
      "directions to cafe",
      "where is francis bean"
    ],
    keywords: ["location", "address", "where", "directions", "mari st", "alexandra headland", "find"],
    answer: "We are located at 3 Mari Street, Alexandra Headland, QLD 4572 on Queensland's Sunshine Coast. We're situated just one block off Alexandra Parade, right near the patrolled Alex surf beach and surf club. Look for our warm peach umbrella and sign!",
    actionHint: { type: 'open-maps' },
  },
  {
    id: 'faq-dog-friendly',
    category: 'amenities',
    question: "Can I bring my dog?",
    aliases: [
      "are you dog friendly",
      "can dogs come",
      "pets allowed",
      "dog friendly cafe"
    ],
    keywords: ["dog", "dogs", "pet", "pets", "puppy", "hound"],
    answer: "Yes! Francis Bean is proudly dog-friendly! We have sunny outdoor alfresco seating where well-behaved dogs are warmly welcome to relax with you. We even keep fresh water bowls out for thirsty beach pups.",
  },
  {
    id: 'faq-takeaway',
    category: 'amenities',
    question: "Do you have takeaway?",
    aliases: [
      "can i get takeaway",
      "to go",
      "take away coffee",
      "food to take away"
    ],
    keywords: ["takeaway", "take away", "to go", "carry out", "grab and go"],
    answer: "Yes, absolutely! Everything on our menu is available for takeaway — including our full range of Campos coffees, Brekky Wraps, artisan Bagels, Açaí Bowls, and baked treats. Many locals grab a takeaway cup and walk two minutes down to the sand!",
  },
  {
    id: 'faq-live-inventory',
    category: 'safety',
    question: "Is the açaí bowl (or another dish) available right now?",
    aliases: [
      "is this available today",
      "do you have any left",
      "is it sold out",
      "current stock"
    ],
    keywords: ["available right now", "sold out", "in stock", "live stock", "available today"],
    answer: "As an independent digital website, we aren't connected to the café's live kitchen inventory minute-by-minute. Our classic items like açaí bowls, wraps, and coffees are served daily, but popular bakery items can sell out quickly! For live batch availability, give the café a quick call on (07) 5479 0079.",
    actionHint: { type: 'call-phone' },
  },
  {
    id: 'faq-kids',
    category: 'menu',
    question: "What's good for kids?",
    aliases: [
      "kids menu",
      "food for children",
      "family friendly",
      "what do kids eat"
    ],
    keywords: ["kids", "children", "child", "family", "little ones"],
    answer: "Kids love our thick-cut Toasted Banana Bread ($6.50), buttered Raisin Toast ($7.00), Bacon & Egg Muffin ($10.80), Eggs on Toast ($16 deal), and freshly blended smoothies! We also have a relaxed outdoor area that's very family and pram friendly.",
  },
];
