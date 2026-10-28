import React from 'react';
import { Coffee, Sparkles, Check, HelpCircle } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { MENU_ITEMS, MenuItem } from '../data/menu';
import {
  DoodleSmilingEgg,
  DoodleSparkle,
  DoodleArrow,
  DoodleToast,
  DoodleUnderline,
} from './illustrations/DoodleIllustrations';

interface BrekkieSpecialProps {
  onSelectItem: (item: MenuItem) => void;
  onAskBeanie: (query: string) => void;
}

export const BrekkieSpecial: React.FC<BrekkieSpecialProps> = ({
  onSelectItem,
  onAskBeanie,
}) => {
  const dealItems = MENU_ITEMS.filter((i) => i.category === 'BREAKFAST DEAL');

  return (
    <section
      id="special"
      className="py-16 sm:py-20 relative bg-cream-deep/60 border-y-2 border-cocoa/20 overflow-hidden"
      aria-label="Daily Breakfast Deal"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ticket Outer Wrapper (Peach Paper Ticket with Dashed Outline) */}
        <div className="relative bg-peach-light rounded-3xl sm:rounded-[36px] border-2 border-cocoa p-4 sm:p-8 md:p-12 shadow-doodle-lg overflow-hidden">
          
          {/* Decorative Corner Perforations / Notches */}
          <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-cream-paper border-2 border-cocoa pointer-events-none" />
          <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-cream-paper border-2 border-cocoa pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-cream-paper border-2 border-cocoa pointer-events-none" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full bg-cream-paper border-2 border-cocoa pointer-events-none" />

          {/* Ticket Header & Metadata */}
          <div className="flex flex-col md:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b-2 border-dashed border-cocoa/40">
            
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="px-3 py-1 rounded-full bg-butter border border-cocoa font-display text-xs font-bold text-cocoa tracking-wider uppercase">
                MONDAY — SUNDAY
              </div>
              <span className="font-hand text-terracotta text-sm">
                ~ Brekkie & Beans Deal ~
              </span>
            </div>

            {/* Verification & Indicative Status Notice */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cream-warm border border-cocoa/30 text-[11px] font-medium text-cocoa">
              <HelpCircle size={13} className="text-terracotta shrink-0" />
              <span>In-store feature • Confirm daily with café</span>
            </div>
          </div>

          {/* Ticket Body Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Coffee Inclusions (5 cols) */}
            <div className="lg:col-span-5 text-left">
              <div className="flex items-center gap-2 mb-2">
                <DoodleSparkle size={22} className="text-butter" />
                <span className="font-display text-xs uppercase tracking-widest text-terracotta font-bold">
                  {SITE_CONTENT.brekkieSpecial.badge}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cocoa leading-tight mb-3">
                {SITE_CONTENT.brekkieSpecial.title}
              </h2>

              <p className="font-body text-sm sm:text-base text-cocoa-light mb-6">
                {SITE_CONTENT.brekkieSpecial.subtitle}
              </p>

              {/* Coffee Inclusion Banner */}
              <div className="bg-cream-warm p-4 rounded-2xl border-2 border-cocoa shadow-doodle-hover mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-peach border border-cocoa text-cocoa">
                    <Coffee size={20} />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-cocoa">
                      Coffee Included in Every Deal
                    </h4>
                    <p className="font-body text-xs text-cocoa-light mt-0.5">
                      Served with a regular Campos espresso or milk coffee.
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-medium text-terracotta">
                      <span className="bg-peach-light px-2 py-0.5 rounded border border-cocoa/20">
                        Large coffee: +$1.00
                      </span>
                      <span className="bg-peach-light px-2 py-0.5 rounded border border-cocoa/20">
                        Any smoothie: +$3.00
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chatbot Prompt Helper */}
              <button
                onClick={() => onAskBeanie("Tell me more about the $16 breakfast deal")}
                className="inline-flex items-center gap-2 font-hand text-sm sm:text-base text-terracotta hover:text-cocoa transition-colors"
              >
                <span>Ask Beanie what's included in the $16 deal</span>
                <span className="font-bold">→</span>
              </button>
            </div>

            {/* Right Column: 3 Deal Choice Cards (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {dealItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="group relative bg-cream-warm p-4 sm:p-5 rounded-2xl border-2 border-cocoa shadow-doodle hover:shadow-doodle-hover hover:translate-x-1 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    {/* Item Details */}
                    <div className="flex-1 pr-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-5 h-5 rounded-full bg-peach border border-cocoa text-[11px] font-bold text-cocoa flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h3 className="font-display font-bold text-base sm:text-lg text-cocoa group-hover:text-terracotta transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-cocoa-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Prominent Price Pill Badge ($16) */}
                    <div className="self-start sm:self-center shrink-0">
                      <div className="px-5 py-2 rounded-xl bg-cocoa text-cream-paper border-2 border-cocoa font-display font-extrabold text-lg sm:text-xl tracking-tight shadow-sm text-center group-hover:bg-terracotta transition-colors">
                        $16.
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Bottom Fine Print */}
          <div className="mt-8 pt-4 border-t border-dashed border-cocoa/30 text-center">
            <p className="font-hand text-xs sm:text-sm text-cocoa-muted">
              {SITE_CONTENT.brekkieSpecial.termsNotice}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
