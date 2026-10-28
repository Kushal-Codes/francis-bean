# Francis Bean — Quality Assurance & Verification Report

**Date of Execution:** October 28, 2026  
**Application Target:** Francis Bean — The Interactive Illustrated Café  
**Version:** 1.0.0 (Production Build Verified)  
**Test Suite:** `scripts/test-chatbot.ts` (18 Conversational Verification Tests)  
**Visual Viewport Verifications:** 390px (Mobile), 768px (Tablet), 1440px (Desktop)  

---

## 1. Executive QA Summary

| Category | Status | Details |
| :--- | :--- | :--- |
| **TypeScript / Type Safety** | ✅ PASS (0 errors) | Strict compilation passes with `tsc --noEmit`. No any/unknown leaks. |
| **Production Build** | ✅ PASS | Vite v6.4.5 bundles in 1.66s. Gzipped assets: CSS ~7.0 KB, JS ~76.4 KB. |
| **Conversational Engine** | ✅ PASS (18/18) | 100% of Phase 9 required chat scenarios passed with strict anti-hallucination checks. |
| **Mobile Responsiveness** | ✅ PASS | Verified on 390px viewport with CDP device emulation. No horizontal overflow. |
| **Design Integrity** | ✅ PASS | Peach paper aesthetic, cocoa borders, Fraunces serif typography, original SVGs. |
| **Offline Reliability** | ✅ PASS | Deterministic engine works completely offline with zero API key dependency. |

---

## 2. Conversational QA Audit (All 18 Scenarios)

The automated test runner (`node --experimental-strip-types scripts/test-chatbot.ts` via Jiti) verified all required conversational flows against the live knowledge repository:

```
====================================================
   FRANCIS BEAN — BEANIE CHATBOT QA VERIFICATION    
====================================================

✅ PASS: [1. Menu Overview]
   Q: "What's on the menu?"
   A: "We serve fresh, beachside breakfast and brunch classics! Our menu features Quick & Easy wraps & muffins, our famous $16 Brekkie Club deal with coffee included, Signature Eggs Benny & Chilli Scramble, artisan bagels (like the B.E.A.T Bagel), refreshing Açaí (acai) & Yoghurt Bowls, and Campos specialty coffee."
   Dishes attached: Brekky Wrap, Bacon, Egg & Cheese Muffin, Eggs on Toast + Coffee, Bacon & Egg Roll + Coffee, Smash Avo (1/2 Avo) + Coffee, Eggs Benny on Sourdough, Chilli Scramble Eggs, B.E.A.T Bagel, Grilled Halloumi Bagel, Signature Açaí Bowl, Campos Superior Coffee

✅ PASS: [2. Acai Bowl Price Retrieval]
   Q: "How much is the acai bowl?"
   A: "Signature Açaí Bowl is published at $18.90 (verified from café menu records). Pure organic frozen açaí blended with banana and coconut water, topped with crunchy toasted granola, fresh strawberries, blueberries, banana slices and chia seeds."
   Dishes attached: Signature Açaí Bowl

✅ PASS: [3. Vegan Dietary Options]
   Q: "Do you have vegan food?"
   A: "Our Signature Açaí Bowl ($18.90), Francis Bean Cold Brew ($7.80), and Coastal Green Smoothie ($10.50) are naturally vegan-friendly! You can also request our Smashed Avo on Toast without feta. We offer oat, almond, and soy milk for all coffees."

✅ PASS: [4. Trading Hours & Timezone (Sunday)]
   Q: "Are you open on Sunday?"
   A: "Yes, we are open on Sunday! Francis Bean is open 7 days a week, Monday to Sunday, from 6:00 AM to 1:00 PM (Australia/Brisbane time). Currently: Closed for today • Reopening tomorrow at 6:00 AM. Note that public holiday trading can vary slightly, so feel free to call on (07) 5479 0079."

✅ PASS: [5. Tomorrow Trading Hours]
   Q: "Are you open tomorrow?"
   A: "Yes! Tomorrow we open bright and early at 6:00 am. Francis Bean is open 7 days a week, Monday to Sunday, from 6:00 AM to 1:00 PM (Australia/Brisbane time)."

✅ PASS: [6. Fabricated Low Price ($5 Breakfast Wrap)]
   Q: "Can I get a breakfast wrap for $5?"
   A: "Our Brekky Wrap is $16.80 and our Pork Belly Wrap is $17.00 (we don't have $5 wraps, as much as we'd love that!). If you're after something lighter or budget-friendly, check out our Toasted Banana Bread ($6.50), Raisin Toast ($7.00), or Daily Quiche ($8.50)."

✅ PASS: [7. Live Stock & Kitchen Inventory Query]
   Q: "Is the acai bowl available right now?"
   A: "While our core dishes (like açaí bowls, breakfast wraps, and Campos coffees) are made fresh daily, this digital menu is not connected to live kitchen stock. Daily baked cabinet treats can occasionally sell out! If you're heading in specifically for something, give the team a quick ring on (07) 5479 0079 to check."

✅ PASS: [8. Location, Directions & Phone]
   Q: "Where are you?"
   A: "You'll find us at 3 Mari Street, Alexandra Headland, QLD 4572. We're nestled just behind Alexandra Parade, an easy two-minute barefoot stroll from the Alex surf beach and surf club. Look for our warm peach awning!"
   Action attached: open-maps (Google Maps direct query)

✅ PASS: [9. Severe Nut & Anaphylaxis Allergy]
   Q: "What if I have a serious nut allergy?"
   A: "Your safety is our top priority! Our kitchen handles nuts, sesame, eggs, dairy, and wheat flour daily. If you have an anaphylactic allergy or strict coeliac condition, we cannot guarantee zero cross-contact online. Please phone our team directly on (07) 5479 0079 or speak with our kitchen staff before ordering so we can discuss safe options with you."

✅ PASS: [10. Dog Policy]
   Q: "Can I bring my dog?"
   A: "Yes, absolutely! Francis Bean is proudly dog-friendly. We have relaxed outdoor alfresco seating where your furry friend is welcome to relax by your side, plus fresh water bowls on hand after beach walks."

✅ PASS: [11. Coffee & Roaster Query]
   Q: "What coffee do you use?"
   A: "We proudly serve Campos Coffee! We extract the signature Campos Superior Blend — famous for its sweet caramel, Belgian chocolate, and malt sweetness. We also brew 18-hour Cold Brew ($7.80) and sell 250g ($22.00) and 1kg ($65.00) bags of whole beans to brew at home."

✅ PASS: [12. Artisan Bagels]
   Q: "Show me your bagels"
   A: "Our artisan bagels are toasted to order: 1) B.E.A.T Bagel ($17.00) with bacon, fried egg, avocado, tomato, spinach, Kewpie mayo & sweet strawberry jam; 2) Rustic Bagel ($16.00) with grilled pesto chicken, fried egg, spinach & mayo; and 3) Grilled Halloumi Bagel ($16.00) with golden halloumi, roasted tomato & relish."
   Dishes attached: B.E.A.T Bagel, Rustic Pesto Chicken Bagel, Grilled Halloumi Bagel

✅ PASS: [13. $16 Breakfast Deal]
   Q: "Do you have a $16 breakfast deal?"
   A: "Our '$16 Brekkie Club' includes your choice of: 1) Eggs on Toast + Coffee ($16.00), 2) Bacon & Egg Roll + Coffee ($16.00), or 3) Smashed Avo (1/2 avo) + Coffee ($16.00). Regular Campos coffee included in every deal! (Upgrade to Large for +$1, or any Smoothie for +$3). Check in-store for daily availability."
   Dishes attached: Eggs on Toast + Coffee, Bacon & Egg Roll + Coffee, Smash Avo (1/2 Avo) + Coffee

✅ PASS: [14. Budget Items Under $15]
   Q: "Do you have anything under $15?"
   A: "Here are our delicious items under $15: Bacon, Egg & Cheese Muffin ($10.80), Croissant (Ham & Cheese) ($10.00), Thick Cut Raisin Toast ($7.00), Campos Superior Coffee ($5.20), Francis Bean Cold Brew ($7.80), Coastal Green Smoothie ($10.50), Tropical Berry Smoothie ($10.50), Toasted Banana Bread ($6.50), Daily Café Quiche ($8.50)."

✅ PASS: [15. Kids & Children Recommendations]
   Q: "What's good for kids?"
   A: "Little ones love our Toasted Banana Bread ($6.50), buttered Raisin Toast ($7.00), Bacon & Egg Muffin ($10.80), and fresh fruit smoothies. Our outdoor beachside seating is relaxed, pram-friendly, and very welcoming for families!"

✅ PASS: [16. Takeaway Confirmation]
   Q: "Do you have takeaway?"
   A: "Yes, we offer our full menu for takeaway! Grab your Campos coffee, Brekky Wrap, Bagel, or Açaí Bowl and take a two-minute stroll straight down to Alexandra Headland beach."

✅ PASS: [17. Empty / Short Input Fallback]
   Q: "hi"
   A: "G'day! I'm Beanie, your little coffee guide at Francis Bean in Alexandra Headland. Ask me anything about our breakfast menu, prices, Campos coffee, opening hours, or where to find us on Mari Street!"

✅ PASS: [18. Out-of-Domain Question]
   Q: "Who won the 2022 World Cup?"
   A: "That one's worth double-checking directly with the friendly team at the counter! You can give the café a ring on (07) 5479 0079 during trading hours (6:00 am to 1:00 pm daily), or feel free to ask me about our coffee, wraps, bagels, or opening hours!"

----------------------------------------------------
Total tests: 18 | Passed: 18 | Failed: 0
----------------------------------------------------
```

---

## 3. Visual & Viewport Quality Checklist

- **Desktop (1440px & 1920px):**
  - Asymmetric digital menu board renders with distinct peach and cream frames.
  - Aligned prices in dark cocoa pill badges with white typography.
  - Coffee cup steam gently animates using CSS transforms without layout shift.
  - Polaroid scrapbook cards hover with slight scale and rotation.
- **Tablet (768px - 1024px):**
  - 2-column menu layout stacks cleanly.
  - Search bar and dietary filter chips wrap smoothly.
- **Mobile (360px - 390px):**
  - Hero headline wraps at `text-3xl` with zero horizontal overflow (`scrollWidth === innerWidth`).
  - Brand badge, Beanie chat trigger, and hamburger icon fit comfortably within header.
  - Floating Beanie character widget maintains 20px padding from screen bottom-right.
  - Ticket notches on the $16 Brekkie Club clip cleanly with `overflow-hidden`.

---

## 4. Accessibility & Performance Review

- **Semantic Elements:** Proper `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>` landmarks.
- **ARIA Attributes:** Modals marked with `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
- **Keyboard Navigation:** Esc key dismisses dish detail modal and Beanie chatbot. Tab navigation cycles through inputs.
- **Reduced Motion:** `@media (prefers-reduced-motion: reduce)` disables steam curls, rotations, and smooth scrolling for users with motion sensitivity.
- **Color Contrast:** Dark cocoa `#49352D` text against warm cream `#FFF7EA` yields a contrast ratio of `10.8:1` (exceeding WCAG AAA standard of `7.0:1`).
