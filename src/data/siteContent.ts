/**
 * FRANCIS BEAN — EDITABLE SITE CONTENT & EDITORIAL COPY
 * 
 * Central file for all marketing copy, scrapbook entries,
 * photo captions, hero headlines, and customer notifications.
 * Can be edited without modifying component source code.
 */

export interface ScrapbookItem {
  id: string;
  title: string;
  caption: string;
  note: string;
  rotation: string;
  aspect: string;
  tag: string;
  imageUrl: string;
  fallbackGradient: string;
}

export const SITE_CONTENT = {
  hero: {
    badgeText: "3 Mari St • Alexandra Headland • QLD",
    headlinePart1: "Good mornings start",
    headlinePart2: "with good beans.",
    subheading: "Your little coffee stop by the coast. Fresh brekkie, lovely Campos coffee, and something tasty for the road.",
    handwrittenNote: "Made for slow mornings ~",
    ctaPrimary: "Take a peek at the menu",
    ctaSecondary: "Find our little café",
    cupSticker: "100% Campos Coffee",
    hoursBadge: "Open 6am – 1pm Daily",
  },

  brekkieSpecial: {
    badge: "DAILY MORNING SPECIAL",
    title: "The $16 Brekkie Club",
    subtitle: "Your morning pick-me-up, paired with a regular Campos coffee.",
    coffeeOffer: "Includes regular Campos coffee • Large +$1.00 • Smoothie +$3.00",
    termsNotice: "Promotional deal as featured on our illustrated menu. Please check in-store for daily availability.",
    stampText: "BREKKIE & BEANS",
  },

  menuSection: {
    title: "The Illustrated Menu",
    subtitle: "Hand-crafted eats, toasted bites, and coastal brews made fresh to order.",
    searchPlaceholder: "Search for wraps, bagels, acai, coffee...",
    noResultsText: "No menu items found matching your search. Try asking Beanie or checking our categories!",
    externalOrderCta: "Craving delivery? Order via DoorDash",
    externalOrderNotice: "Opens official DoorDash delivery storefront. Platform prices may differ from in-store.",
  },

  aboutScrapbook: {
    headline: "A little coffee. A lot of good mornings.",
    intro: "Tucked into Mari Street just a short stroll from the Alexandra Headland surf break, Francis Bean is the friendly neighborhood spot where morning rituals feel unhurried and coastal sunshine greets every pour.",
    highlights: [
      {
        icon: "sun",
        title: "Beachside Mornings",
        description: "From 6:00 am daily, watch the morning light filter through while you grab your post-surf flat white.",
      },
      {
        icon: "coffee",
        title: "Campos Superior",
        description: "Rich sweet chocolate, salted caramel, and red fruit notes in every double-shot espresso.",
      },
      {
        icon: "heart",
        title: "Paws & Prams Welcome",
        description: "Sunny alfresco seating for sandy feet, happy dogs, and relaxed weekend family catch-ups.",
      },
    ],
    scrapbookItems: [
      {
        id: 'scrapbook-coffee',
        title: "The Morning Pour",
        caption: "Silky flat white made with Campos Superior beans.",
        note: "Double shot, always.",
        rotation: "-rotate-2",
        aspect: "aspect-[4/3]",
        tag: "COFFEE",
        imageUrl: "/images/coffee-pour.jpg",
        fallbackGradient: "from-[#BB795F] to-[#49352D]",
      },
      {
        id: 'scrapbook-acai',
        title: "Fresh Coast Açaí",
        caption: "Loaded with fresh strawberries, banana, blueberries and house granola.",
        note: "Cool & crunchy!",
        rotation: "rotate-2",
        aspect: "aspect-[4/3]",
        tag: "BREAKFAST",
        imageUrl: "/images/acai-bowl.jpg",
        fallbackGradient: "from-[#6E5246] to-[#BB795F]",
      },
      {
        id: 'scrapbook-bagel',
        title: "The B.E.A.T Bagel",
        caption: "Bacon, fried egg, avocado, tomato, spinach and Kewpie mayo.",
        note: "With a touch of jam!",
        rotation: "-rotate-1",
        aspect: "aspect-[4/3]",
        tag: "BAGELS",
        imageUrl: "/images/bagel-beat.jpg",
        fallbackGradient: "from-[#F1CF82] to-[#BB795F]",
      },
      {
        id: 'scrapbook-beach',
        title: "Alex Headland Vibe",
        caption: "Two minutes barefoot from the patrolled beach and coastline.",
        note: "Our sunny corner.",
        rotation: "rotate-3",
        aspect: "aspect-[4/3]",
        tag: "NEIGHBOURHOOD",
        imageUrl: "/images/alex-beach.jpg",
        fallbackGradient: "from-[#BDD6C7] to-[#BB795F]",
      },
    ] as ScrapbookItem[],
  },

  beanieAssistant: {
    name: "Beanie",
    role: "Café Companion",
    greeting: "G'day! I'm Beanie, your little coffee-bean guide. Ask me anything about our menu, prices, dietary options, or opening hours!",
    starterPrompts: [
      "What's on the menu?",
      "How much is the açaí bowl?",
      "Do you have vegetarian options?",
      "What coffee do you use?",
      "Are you open on Sunday?",
      "Can I bring my dog?",
      "Where are you located?",
    ],
    disclaimer: "Answers are grounded in verified café records. For live orders or severe medical allergies, please phone the team on (07) 5479 0079.",
  },

  locationSection: {
    headline: "Come for the coffee. Stay for the good vibes.",
    subheading: "Located in the heart of Alexandra Headland on Queensland's Sunshine Coast. An easy barefoot walk from the beach.",
    addressTitle: "Our Little Corner",
    phoneTitle: "Give Us A Buzz",
    hoursTitle: "Trading Hours",
    directionsPrompt: "Get walking or driving directions directly in Google Maps.",
  },

  footer: {
    tagline: "Your little coffee stop by the coast.",
    copyrightYear: 2026,
    credits: "Designed with hand-drawn warmth inspired by the illustrated menu.",
    demoDisclaimer: "Independent website concept. Created as a sales demonstration. Not affiliated with or endorsed by Francis Bean.",
  },
};
