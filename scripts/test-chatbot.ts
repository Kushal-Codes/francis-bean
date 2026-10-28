/**
 * Automated Test Suite for Beanie Conversational Engine & Business Logic
 * Covers Phase 9 QA requirements from project specifications.
 */

import { processChatQuery } from '../src/utils/chatbotEngine';

interface TestCase {
  name: string;
  query: string;
  expectedKeywords: string[];
  forbiddenKeywords?: string[];
  mustIncludeDish?: string;
  mustIncludeAction?: string;
}

const TEST_CASES: TestCase[] = [
  {
    name: '1. Menu Overview',
    query: "What's on the menu?",
    expectedKeywords: ['breakfast', 'wraps', 'bagel', 'campos', 'acai', 'deal'],
    forbiddenKeywords: ['pizza', 'cocktail', 'steak'],
    mustIncludeAction: 'scroll-to-menu',
  },
  {
    name: '2. Acai Bowl Price Retrieval',
    query: 'How much is the acai bowl?',
    expectedKeywords: ['$18.90', 'açaí', 'verified'],
    forbiddenKeywords: ['$10', '$5', 'free'],
    mustIncludeDish: 'Signature Açaí Bowl',
  },
  {
    name: '3. Vegan Dietary Options',
    query: 'Do you have vegan food?',
    expectedKeywords: ['açaí', 'cold brew', 'smoothie', 'vegan'],
    forbiddenKeywords: ['guarantee', 'certified coeliac kitchen'],
  },
  {
    name: '4. Trading Hours & Timezone (Sunday)',
    query: 'Are you open on Sunday?',
    expectedKeywords: ['yes', '6:00 am', '1:00 pm', 'brisbane'],
  },
  {
    name: '5. Tomorrow Trading Hours',
    query: 'Are you open tomorrow?',
    expectedKeywords: ['6:00 am', '1:00 pm', 'brisbane'],
  },
  {
    name: '6. Fabricated Low Price ($5 Breakfast Wrap)',
    query: 'Can I get a breakfast wrap for $5?',
    expectedKeywords: ['$16.80', '$6.50', 'banana bread'],
    forbiddenKeywords: ['yes here is your $5 wrap', 'sure you can have it for $5'],
  },
  {
    name: '7. Live Stock & Kitchen Inventory Query',
    query: 'Is the acai bowl available right now?',
    expectedKeywords: ['live kitchen stock', '5479 0079', 'call'],
    forbiddenKeywords: ['we have 3 left', 'in stock guaranteed right now'],
  },
  {
    name: '8. Location, Directions & Phone',
    query: 'Where are you?',
    expectedKeywords: ['3 mari street', 'alexandra headland', 'qld 4572', 'surf beach'],
    mustIncludeAction: 'open-maps',
  },
  {
    name: '9. Severe Nut & Anaphylaxis Allergy',
    query: 'What if I have a serious nut allergy?',
    expectedKeywords: ['safety', '5479 0079', 'speak with our kitchen staff', 'handles'],
    forbiddenKeywords: ['100% nut free', 'guaranteed allergen free', 'no problem at all'],
  },
  {
    name: '10. Dog Policy',
    query: 'Can I bring my dog?',
    expectedKeywords: ['dog', 'welcome', 'outdoor', 'water bowls'],
  },
  {
    name: '11. Coffee & Roaster Query',
    query: 'What coffee do you use?',
    expectedKeywords: ['campos', 'superior blend', 'caramel', 'chocolate'],
  },
  {
    name: '12. Artisan Bagels',
    query: 'Show me your bagels',
    expectedKeywords: ['b.e.a.t', 'rustic', 'halloumi'],
  },
  {
    name: '13. $16 Breakfast Deal',
    query: 'Do you have a $16 breakfast deal?',
    expectedKeywords: ['$16', 'brekkie club', 'eggs on toast', 'bacon & egg', 'coffee included'],
  },
  {
    name: '14. Budget Items Under $15',
    query: 'Do you have anything under $15?',
    expectedKeywords: ['banana bread', 'raisin toast', 'cold brew', 'quiche'],
  },
  {
    name: '15. Kids & Children Recommendations',
    query: "What's good for kids?",
    expectedKeywords: ['banana bread', 'raisin toast', 'smoothies', 'pram'],
  },
  {
    name: '16. Takeaway Confirmation',
    query: 'Do you have takeaway?',
    expectedKeywords: ['takeaway', 'beach', 'stroll'],
  },
  {
    name: '17. Empty / Short Input Fallback',
    query: 'hi',
    expectedKeywords: ['beanie', 'alexandra headland', 'mari street'],
  },
  {
    name: '18. Out-of-Domain Question',
    query: 'Who won the 2022 World Cup?',
    expectedKeywords: ['counter', '5479 0079', 'hours'],
    forbiddenKeywords: ['argentina won the world cup'],
  },
];

console.log('====================================================');
console.log('   FRANCIS BEAN — BEANIE CHATBOT QA VERIFICATION    ');
console.log('====================================================\n');

let passedCount = 0;
let failedCount = 0;

for (const test of TEST_CASES) {
  const result = processChatQuery(test.query);
  const textLower = result.text.toLowerCase().replace(/[()]/g, '');

  const missingExpected = test.expectedKeywords.filter(
    (kw) => !textLower.includes(kw.toLowerCase().replace(/[()]/g, ''))
  );
  const foundForbidden = (test.forbiddenKeywords || []).filter((kw) =>
    textLower.includes(kw.toLowerCase().replace(/[()]/g, ''))
  );

  let dishFound = true;
  if (test.mustIncludeDish) {
    dishFound = !!(
      result.highlightItems &&
      result.highlightItems.some((item) => item.name.includes(test.mustIncludeDish!))
    );
  }

  let actionFound = true;
  if (test.mustIncludeAction) {
    actionFound = result.suggestedAction?.type === test.mustIncludeAction;
  }

  const isSuccess =
    missingExpected.length === 0 &&
    foundForbidden.length === 0 &&
    dishFound &&
    actionFound;

  if (isSuccess) {
    passedCount++;
    console.log(`✅ PASS: [${test.name}]`);
    console.log(`   Q: "${test.query}"`);
    console.log(`   A: "${result.text.slice(0, 110)}..."`);
    if (result.highlightItems?.length) {
      console.log(`   Dishes attached: ${result.highlightItems.map((i) => i.name).join(', ')}`);
    }
    console.log('');
  } else {
    failedCount++;
    console.error(`❌ FAIL: [${test.name}]`);
    console.error(`   Q: "${test.query}"`);
    console.error(`   A: "${result.text}"`);
    if (missingExpected.length > 0) {
      console.error(`   Missing required keywords: ${missingExpected.join(', ')}`);
    }
    if (foundForbidden.length > 0) {
      console.error(`   Found forbidden hallucination: ${foundForbidden.join(', ')}`);
    }
    if (!dishFound) {
      console.error(`   Missing expected dish attachment: ${test.mustIncludeDish}`);
    }
    if (!actionFound) {
      console.error(`   Missing expected action: ${test.mustIncludeAction}`);
    }
    console.log('');
  }
}

console.log('----------------------------------------------------');
console.log(`Total tests: ${TEST_CASES.length} | Passed: ${passedCount} | Failed: ${failedCount}`);
console.log('----------------------------------------------------\n');

if (failedCount > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL 18 CONVERSATIONAL QA CRITERIA PASSED FLAWLESSLY!');
}
