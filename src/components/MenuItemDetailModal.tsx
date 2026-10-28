import React, { useEffect } from 'react';
import { X, Check, AlertCircle, Sparkles, MessageCircle, ExternalLink } from 'lucide-react';
import { MenuItem } from '../data/menu';
import { BUSINESS_DATA } from '../data/business';
import { DoodleSparkle } from './illustrations/DoodleIllustrations';

interface MenuItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAskBeanie: (dishName: string) => void;
}

export const MenuItemDetailModal: React.FC<MenuItemDetailModalProps> = ({
  item,
  onClose,
  onAskBeanie,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-cocoa/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-dish-title"
    >
      <div
        className="relative w-full max-w-lg bg-cream-warm rounded-3xl border-3 border-cocoa shadow-doodle-lg p-6 sm:p-8 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full border-2 border-cocoa bg-peach-light text-cocoa hover:bg-terracotta hover:text-cream-paper transition-colors shadow-doodle-hover"
          aria-label="Close dish details"
        >
          <X size={18} />
        </button>

        {/* Category Pill & Verification Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3 pr-10">
          <span className="px-3 py-1 rounded-full bg-peach border border-cocoa font-display text-xs font-bold text-cocoa uppercase tracking-wider">
            {item.category}
          </span>
          {item.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-butter border border-cocoa text-[11px] font-bold text-cocoa">
              {item.badge}
            </span>
          )}
          <span className="text-[11px] text-cocoa-muted font-mono">
            {item.priceVerified ? 'Verified Price' : 'Indicative Price'}
          </span>
        </div>

        {/* Dish Title & Price */}
        <div className="flex items-baseline justify-between gap-4 mb-4 pb-3 border-b-2 border-cocoa/15">
          <h2
            id="modal-dish-title"
            className="font-display text-2xl sm:text-3xl font-bold text-cocoa"
          >
            {item.name}
          </h2>
          <span className="font-display font-extrabold text-2xl text-terracotta shrink-0">
            {item.priceFormatted}
          </span>
        </div>

        {/* Description */}
        <p className="font-body text-sm sm:text-base text-cocoa-light mb-5 leading-relaxed">
          {item.description}
        </p>

        {/* Sub-options if available */}
        {item.subOptions && item.subOptions.length > 0 && (
          <div className="mb-5 p-3 rounded-2xl bg-peach-light/60 border border-cocoa/30">
            <span className="text-xs font-display font-bold text-cocoa uppercase tracking-wider block mb-2">
              Serving / Upgrade Options:
            </span>
            <div className="flex flex-col gap-1.5">
              {item.subOptions.map((opt) => (
                <div key={opt.name} className="flex justify-between text-xs text-cocoa font-medium">
                  <span>{opt.name}</span>
                  <span className="font-bold text-terracotta">
                    {opt.priceAUD > 0 ? `+$${opt.priceAUD.toFixed(2)}` : 'Included'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ingredients Breakdown */}
        <div className="mb-5">
          <span className="text-xs font-display font-bold text-cocoa uppercase tracking-wider block mb-2">
            Ingredients:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {item.ingredients.map((ing) => (
              <span
                key={ing}
                className="px-2.5 py-1 rounded-lg bg-cream-paper border border-cocoa/20 text-xs text-cocoa font-medium"
              >
                {ing}
              </span>
            ))}
          </div>
        </div>

        {/* Dietary & Allergen Advisory */}
        <div className="mb-6 p-3.5 rounded-2xl bg-cream-deep border border-cocoa/20 text-xs">
          {item.verifiedDietaryTags.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2 font-medium text-emerald-800">
              <Check size={14} className="text-emerald-700" />
              <span>Verified Dietary: {item.verifiedDietaryTags.join(', ')}</span>
            </div>
          )}
          <div className="flex items-start gap-1.5 text-cocoa-muted">
            <AlertCircle size={14} className="text-terracotta shrink-0 mt-0.5" />
            <p>
              <strong className="text-cocoa">Allergen Notice:</strong> {item.allergenInformation}
            </p>
          </div>
        </div>

        {/* Actions Strip */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onAskBeanie(`Tell me about the ${item.name}`);
            }}
            className="btn-doodle w-full text-xs sm:text-sm py-2.5"
          >
            <MessageCircle size={15} className="mr-2" />
            <span>Ask Beanie about this dish</span>
          </button>

          <a
            href={BUSINESS_DATA.deliveryLinks.doorDashUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-doodle-cream w-full sm:w-auto text-xs py-2.5 shrink-0"
          >
            <span>Order DoorDash</span>
            <ExternalLink size={12} className="ml-1 text-terracotta" />
          </a>
        </div>
      </div>
    </div>
  );
};
