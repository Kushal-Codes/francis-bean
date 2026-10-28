import React, { useState, useMemo } from 'react';
import { Search, X, Filter, Sparkles, Coffee, ExternalLink, HelpCircle } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { MENU_ITEMS, MENU_CATEGORIES, MenuItem, MenuCategory } from '../data/menu';
import { BUSINESS_DATA } from '../data/business';
import {
  DoodleSmilingEgg,
  DoodleSmilingBadge,
  DoodleCroissant,
  DoodleBagel,
  DoodleStrawberry,
  DoodleCoffeeCup,
  DoodleUnderline,
  DoodleSparkle,
} from './illustrations/DoodleIllustrations';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onAskBeanie: (query: string) => void;
  highlightedItemId?: string | null;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectItem,
  onAskBeanie,
  highlightedItemId,
}) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'ALL' | 'VEGETARIAN' | 'VEGAN' | 'UNDER_15'>('ALL');

  // Filtered Items logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== 'ALL' && item.category !== activeCategory) {
        return false;
      }

      // Dietary filter
      if (dietaryFilter === 'VEGETARIAN') {
        const isVeg = item.verifiedDietaryTags.some((t) => t.toLowerCase().includes('vegetarian'));
        if (!isVeg) return false;
      } else if (dietaryFilter === 'VEGAN') {
        const isVegan = item.verifiedDietaryTags.includes('Vegan-Friendly');
        if (!isVegan) return false;
      } else if (dietaryFilter === 'UNDER_15') {
        if (item.priceAUD > 15) return false;
      }

      // Text search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesIng = item.ingredients.some((ing) => ing.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }

      return true;
    });
  }, [activeCategory, dietaryFilter, searchQuery]);

  // Group items by category for the digital menu board display
  const categoriesToDisplay = useMemo(() => {
    if (activeCategory !== 'ALL') {
      return [activeCategory];
    }
    return [
      'QUICK & EASY',
      'SIGNATURE',
      'BAGELS',
      'FRUIT BOWLS',
      'COFFEE & DRINKS',
      'BAKED BITES',
    ] as MenuCategory[];
  }, [activeCategory]);

  return (
    <section
      id="menu"
      className="py-20 sm:py-28 relative scroll-mt-20 bg-cream-paper overflow-hidden"
      aria-label="Francis Bean Digital Illustrated Menu"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-butter/60 border border-cocoa text-xs font-display font-bold text-cocoa tracking-wider uppercase mb-3">
            <Sparkles size={13} className="text-terracotta" />
            <span>Digital Menu Board</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold text-cocoa tracking-tight mb-3">
            {SITE_CONTENT.menuSection.title}
          </h2>

          <p className="font-body text-base text-cocoa-light">
            {SITE_CONTENT.menuSection.subtitle}
          </p>

          <div className="mt-3 w-48 mx-auto">
            <DoodleUnderline color="#F1C5A8" />
          </div>
        </div>

        {/* Search & Dietary Filter Control Bar */}
        <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row items-center gap-4">
          
          {/* Search Input Box */}
          <div className="relative w-full md:flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cocoa-muted">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={SITE_CONTENT.menuSection.searchPlaceholder}
              className="w-full pl-10 pr-10 py-3 rounded-2xl border-2 border-cocoa bg-cream-warm text-cocoa placeholder-cocoa-muted/70 font-body text-sm shadow-doodle-hover focus:outline-none focus:ring-2 focus:ring-terracotta transition-all"
              aria-label="Search menu items"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-cocoa hover:text-terracotta"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Quick Dietary Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setDietaryFilter('ALL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-display font-semibold transition-all border-2 border-cocoa ${
                dietaryFilter === 'ALL'
                  ? 'bg-cocoa text-cream-paper shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-cream-warm text-cocoa shadow-doodle-hover hover:bg-peach-light'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDietaryFilter('VEGETARIAN')}
              className={`px-3.5 py-2 rounded-xl text-xs font-display font-semibold transition-all border-2 border-cocoa ${
                dietaryFilter === 'VEGETARIAN'
                  ? 'bg-cocoa text-cream-paper shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-cream-warm text-cocoa shadow-doodle-hover hover:bg-peach-light'
              }`}
            >
              Vegetarian
            </button>
            <button
              onClick={() => setDietaryFilter('VEGAN')}
              className={`px-3.5 py-2 rounded-xl text-xs font-display font-semibold transition-all border-2 border-cocoa ${
                dietaryFilter === 'VEGAN'
                  ? 'bg-cocoa text-cream-paper shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-cream-warm text-cocoa shadow-doodle-hover hover:bg-peach-light'
              }`}
            >
              Vegan-Friendly
            </button>
            <button
              onClick={() => setDietaryFilter('UNDER_15')}
              className={`px-3.5 py-2 rounded-xl text-xs font-display font-semibold transition-all border-2 border-cocoa ${
                dietaryFilter === 'UNDER_15'
                  ? 'bg-cocoa text-cream-paper shadow-none translate-x-[1px] translate-y-[1px]'
                  : 'bg-cream-warm text-cocoa shadow-doodle-hover hover:bg-peach-light'
              }`}
            >
              Under $15
            </button>
          </div>
        </div>

        {/* Category Tabs Strip */}
        <div className="max-w-5xl mx-auto mb-12 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => setActiveCategory('ALL')}
            className={`px-4 py-2 rounded-2xl font-display text-xs sm:text-sm font-bold border-2 border-cocoa transition-all ${
              activeCategory === 'ALL'
                ? 'bg-peach text-cocoa shadow-doodle'
                : 'bg-cream-warm/80 text-cocoa-light shadow-doodle-hover hover:bg-cream-warm'
            }`}
          >
            All Categories
          </button>
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl font-display text-xs sm:text-sm font-bold border-2 border-cocoa transition-all ${
                activeCategory === cat.id
                  ? 'bg-peach text-cocoa shadow-doodle'
                  : 'bg-cream-warm/80 text-cocoa-light shadow-doodle-hover hover:bg-cream-warm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-cream-warm rounded-3xl border-2 border-cocoa shadow-doodle">
            <HelpCircle size={36} className="mx-auto text-terracotta mb-3" />
            <h3 className="font-display font-bold text-lg text-cocoa mb-1">
              No matching treats found
            </h3>
            <p className="font-body text-xs sm:text-sm text-cocoa-light mb-4">
              {SITE_CONTENT.menuSection.noResultsText}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('ALL');
                setActiveCategory('ALL');
              }}
              className="btn-doodle text-xs py-2 px-4"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* DIGITAL MENU BOARD ASYMMETRICAL FRAMES (Inspired by Reference Menu Layout) */}
        {filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
            
            {/* BOX 1: QUICK & EASY (5 cols on lg) */}
            {categoriesToDisplay.includes('QUICK & EASY') && (
              <div className="lg:col-span-6 bg-peach-light/80 rounded-3xl border-3 border-cocoa p-6 sm:p-7 shadow-doodle relative">
                
                {/* Header Tag matching reference image */}
                <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-dashed border-cocoa/30">
                  <div className="px-3 py-1 rounded-md bg-cocoa text-cream-paper font-display font-bold text-xs uppercase tracking-widest">
                    Quick & Easy
                  </div>
                  <span className="font-hand text-xs text-terracotta">
                    Grab & go classics
                  </span>
                </div>

                <div className="divide-y divide-cocoa/15">
                  {filteredItems
                    .filter((item) => item.category === 'QUICK & EASY')
                    .map((item) => (
                      <MenuItemRow
                        key={item.id}
                        item={item}
                        onSelectItem={onSelectItem}
                        isHighlighted={highlightedItemId === item.id}
                      />
                    ))}
                </div>

                {/* Bottom note from physical menu */}
                <div className="mt-4 pt-3 border-t border-dashed border-cocoa/20 text-center">
                  <p className="font-hand text-xs text-cocoa-muted">
                    *More grab and go options in our display cabinet...
                  </p>
                </div>
              </div>
            )}

            {/* BOX 2: SIGNATURE (6 cols on lg) */}
            {categoriesToDisplay.includes('SIGNATURE') && (
              <div className="lg:col-span-6 bg-cream-warm rounded-3xl border-3 border-cocoa p-6 sm:p-7 shadow-doodle relative">
                
                {/* Smiling Biscuit Sticker Badge from Attached Menu */}
                <div className="absolute -top-5 -left-4 z-10">
                  <DoodleSmilingBadge size={52} />
                </div>

                <div className="flex items-center justify-between mb-5 pb-3 pl-8 border-b-2 border-dashed border-cocoa/30">
                  <h3 className="font-display font-black text-xl text-cocoa tracking-wider uppercase">
                    SIGNATURE
                  </h3>
                  <span className="font-hand text-xs text-terracotta">
                    Cooked fresh to order
                  </span>
                </div>

                <div className="divide-y divide-cocoa/15">
                  {filteredItems
                    .filter((item) => item.category === 'SIGNATURE')
                    .map((item) => (
                      <MenuItemRow
                        key={item.id}
                        item={item}
                        onSelectItem={onSelectItem}
                        isHighlighted={highlightedItemId === item.id}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* BOX 3: ARTISAN BAGELS (6 cols on lg) */}
            {categoriesToDisplay.includes('BAGELS') && (
              <div className="lg:col-span-6 bg-cream-warm rounded-3xl border-3 border-cocoa p-6 sm:p-7 shadow-doodle relative">
                
                {/* Smiling Egg Mascot Badge from Attached Menu */}
                <div className="absolute -top-6 -right-4 z-10">
                  <DoodleSmilingEgg size={56} />
                </div>

                <div className="flex items-center justify-between mb-5 pb-3 pr-10 border-b-2 border-dashed border-cocoa/30">
                  <div className="flex items-center gap-2">
                    <DoodleBagel size={30} />
                    <h3 className="font-display font-bold text-xl text-cocoa tracking-wide">
                      Artisan Bagels
                    </h3>
                  </div>
                  <span className="font-hand text-xs text-terracotta">
                    Toasted & loaded
                  </span>
                </div>

                <div className="divide-y divide-cocoa/15">
                  {filteredItems
                    .filter((item) => item.category === 'BAGELS')
                    .map((item) => (
                      <MenuItemRow
                        key={item.id}
                        item={item}
                        onSelectItem={onSelectItem}
                        isHighlighted={highlightedItemId === item.id}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* BOX 4: FRUIT BOWLS (6 cols on lg) */}
            {categoriesToDisplay.includes('FRUIT BOWLS') && (
              <div className="lg:col-span-6 bg-peach-light/70 rounded-3xl border-3 border-cocoa p-6 sm:p-7 shadow-doodle relative">
                
                <div className="absolute -top-4 -left-3 z-10">
                  <DoodleStrawberry size={46} />
                </div>

                <div className="flex items-center justify-between mb-5 pb-3 pl-8 border-b-2 border-dashed border-cocoa/30">
                  <h3 className="font-display font-bold text-xl text-cocoa tracking-wide">
                    Fruit Bowls
                  </h3>
                  <span className="font-hand text-xs text-terracotta">
                    Organic açaí & local fruit
                  </span>
                </div>

                <div className="divide-y divide-cocoa/15">
                  {filteredItems
                    .filter((item) => item.category === 'FRUIT BOWLS')
                    .map((item) => (
                      <MenuItemRow
                        key={item.id}
                        item={item}
                        onSelectItem={onSelectItem}
                        isHighlighted={highlightedItemId === item.id}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* BOX 5: COFFEE & DRINKS (6 cols on lg) */}
            {categoriesToDisplay.includes('COFFEE & DRINKS') && (
              <div className="lg:col-span-6 bg-cream-warm rounded-3xl border-3 border-cocoa p-6 sm:p-7 shadow-doodle relative">
                
                <div className="flex items-center justify-between mb-5 pb-3 border-b-2 border-dashed border-cocoa/30">
                  <div className="flex items-center gap-2">
                    <Coffee size={20} className="text-cocoa" />
                    <h3 className="font-display font-bold text-xl text-cocoa tracking-wide">
                      Campos Coffee & Drinks
                    </h3>
                  </div>
                  <span className="font-hand text-xs text-terracotta">
                    Superior Blend
                  </span>
                </div>

                <div className="divide-y divide-cocoa/15">
                  {filteredItems
                    .filter((item) => item.category === 'COFFEE & DRINKS')
                    .map((item) => (
                      <MenuItemRow
                        key={item.id}
                        item={item}
                        onSelectItem={onSelectItem}
                        isHighlighted={highlightedItemId === item.id}
                      />
                    ))}
                </div>
              </div>
            )}

            {/* BOX 6: BAKED BITES (6 cols on lg) */}
            {categoriesToDisplay.includes('BAKED BITES') && (
              <div className="lg:col-span-6 bg-peach-light/80 rounded-3xl border-3 border-cocoa p-6 sm:p-7 shadow-doodle relative">
                
                <div className="absolute -top-4 -right-2 z-10">
                  <DoodleCroissant size={50} />
                </div>

                <div className="flex items-center justify-between mb-5 pb-3 pr-10 border-b-2 border-dashed border-cocoa/30">
                  <h3 className="font-display font-bold text-xl text-cocoa tracking-wide">
                    Baked Bites & Sweets
                  </h3>
                  <span className="font-hand text-xs text-terracotta">
                    Fresh from the oven
                  </span>
                </div>

                <div className="divide-y divide-cocoa/15">
                  {filteredItems
                    .filter((item) => item.category === 'BAKED BITES')
                    .map((item) => (
                      <MenuItemRow
                        key={item.id}
                        item={item}
                        onSelectItem={onSelectItem}
                        isHighlighted={highlightedItemId === item.id}
                      />
                    ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* External Delivery Banner */}
        <div className="mt-16 max-w-4xl mx-auto bg-butter/40 border-2 border-dashed border-cocoa p-6 rounded-3xl text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="font-display font-bold text-base text-cocoa">
                {SITE_CONTENT.menuSection.externalOrderCta}
              </h4>
              <p className="font-body text-xs text-cocoa-light mt-0.5">
                {SITE_CONTENT.menuSection.externalOrderNotice}
              </p>
            </div>
            <a
              href={BUSINESS_DATA.deliveryLinks.doorDashUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-doodle text-xs py-2.5 px-5 shrink-0"
            >
              <span>Open DoorDash</span>
              <ExternalLink size={13} className="ml-1.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

// Row item component for digital menu board
interface MenuItemRowProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
  isHighlighted?: boolean;
}

const MenuItemRow: React.FC<MenuItemRowProps> = ({
  item,
  onSelectItem,
  isHighlighted = false,
}) => {
  return (
    <div
      onClick={() => onSelectItem(item)}
      className={`py-3.5 px-2 rounded-xl transition-all duration-200 cursor-pointer group flex items-start justify-between gap-3 ${
        isHighlighted
          ? 'bg-butter/50 ring-2 ring-terracotta -mx-1 px-3 shadow-sm'
          : 'hover:bg-cream-paper/70'
      }`}
    >
      <div className="flex-1 pr-2">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="font-display font-bold text-sm sm:text-base text-cocoa group-hover:text-terracotta transition-colors">
            {item.name}
          </h4>
          {item.badge && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-butter border border-cocoa text-cocoa hidden sm:inline-block">
              {item.badge}
            </span>
          )}
        </div>
        <p className="font-body text-xs text-cocoa-light line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Dietary labels */}
        {item.verifiedDietaryTags.length > 0 && (
          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-terracotta font-medium">
            <span>• {item.verifiedDietaryTags.join(' • ')}</span>
          </div>
        )}
      </div>

      {/* Aligned price pill */}
      <div className="shrink-0 self-start">
        <span className="inline-block px-3 py-1 rounded-lg bg-cocoa text-cream-paper font-display font-bold text-xs sm:text-sm tracking-tight shadow-sm group-hover:bg-terracotta transition-colors">
          {item.priceFormatted}
        </span>
      </div>
    </div>
  );
};
