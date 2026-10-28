import React, { useState } from 'react';
import { ArrowUp, Heart, Instagram, Facebook, FileText, X } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { BUSINESS_DATA } from '../data/business';
import { DoodleCoffeeCup, DoodleUnderline } from './illustrations/DoodleIllustrations';

export const Footer: React.FC = () => {
  const [showOriginalMenu, setShowOriginalMenu] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-cream-deep border-t-3 border-cocoa text-cocoa pt-14 pb-12 overflow-hidden">
      
      {/* Menu Perforation Styling at Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-repeating-linear-gradient" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b-2 border-dashed border-cocoa/30">
          
          {/* Col 1: Wordmark & Brand Bio (5 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="px-3.5 py-1.5 rounded-full border-2 border-cocoa bg-peach-light shadow-doodle-hover">
                <span className="font-display font-bold text-xl text-cocoa tracking-tight">
                  Francis bean
                </span>
              </div>
              <span className="font-hand text-base text-terracotta -rotate-6">
                ~ Alexandra Headland ~
              </span>
            </div>

            <p className="font-body text-sm text-cocoa-light max-w-sm leading-relaxed mb-6">
              {SITE_CONTENT.hero.subheading}
            </p>

            {/* In-store Coffee badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cream-warm border border-cocoa/30 text-xs font-medium text-cocoa">
              <DoodleCoffeeCup size={24} withSteam={false} />
              <span>Proudly pouring Campos Coffee Superior Blend</span>
            </div>
          </div>

          {/* Col 2: Navigation (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="font-display font-bold text-sm text-cocoa uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li>
                <a href="#hero" className="hover:text-terracotta transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#special" className="hover:text-terracotta transition-colors">
                  The $16 Brekkie Club
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-terracotta transition-colors">
                  Illustrated Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-terracotta transition-colors">
                  Our Little Café
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-terracotta transition-colors">
                  Find Us (Hours & Directions)
                </a>
              </li>
              <li>
                <button
                  onClick={() => setShowOriginalMenu(true)}
                  className="hover:text-terracotta transition-colors text-terracotta inline-flex items-center gap-1.5 font-hand text-sm"
                >
                  <FileText size={13} />
                  <span>View Original Menu Reference</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="font-display font-bold text-sm text-cocoa uppercase tracking-wider mb-4">
              Visit Us
            </h4>
            <p className="font-body text-sm text-cocoa font-semibold mb-1">
              {BUSINESS_DATA.address.street}
            </p>
            <p className="font-body text-xs text-cocoa-light mb-3">
              {BUSINESS_DATA.address.suburb}, {BUSINESS_DATA.address.state} {BUSINESS_DATA.address.postcode}
            </p>

            <p className="font-display text-sm font-bold text-terracotta mb-4">
              Phone: {BUSINESS_DATA.contact.phoneDisplay}
            </p>

            <div className="flex items-center gap-3">
              <a
                href={BUSINESS_DATA.socialLinks.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border-2 border-cocoa bg-peach-light text-cocoa hover:bg-peach shadow-doodle-hover transition-all"
                aria-label="Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href={BUSINESS_DATA.socialLinks.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border-2 border-cocoa bg-peach-light text-cocoa hover:bg-peach shadow-doodle-hover transition-all"
                aria-label="Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href={BUSINESS_DATA.socialLinks.communityDirectoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-xl border-2 border-cocoa bg-cream-warm text-cocoa font-display text-xs font-bold shadow-doodle-hover hover:bg-butter transition-all"
              >
                Community Directory
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Disclaimer & Back to Top */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-hand text-xs sm:text-sm text-cocoa-muted text-center md:text-left">
            {SITE_CONTENT.footer.demoDisclaimer}
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-cocoa bg-cream-warm text-cocoa font-display text-xs font-bold shadow-doodle-hover hover:bg-peach transition-all"
            aria-label="Scroll back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>

      </div>

      {/* Modal to view Original Menu Reference */}
      {showOriginalMenu && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cocoa/70 backdrop-blur-sm"
          onClick={() => setShowOriginalMenu(false)}
        >
          <div
            className="relative bg-cream-warm p-5 sm:p-6 rounded-3xl border-3 border-cocoa shadow-doodle-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowOriginalMenu(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full border border-cocoa bg-peach-light text-cocoa"
            >
              <X size={18} />
            </button>
            <h3 className="font-display font-bold text-lg text-cocoa mb-2">
              Original In-Store Menu Reference
            </h3>
            <p className="font-body text-xs text-cocoa-light mb-4">
              This physical illustrated menu served as the primary creative DNA and pricing benchmark for this web application.
            </p>
            <div className="rounded-2xl overflow-hidden border-2 border-cocoa bg-peach-light flex justify-center p-2">
              <img
                src="/images/original-menu-ref.png"
                alt="Original Francis Bean Physical Illustrated Menu"
                className="max-h-[70vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
