import React from 'react';
import { Sun, Coffee, Heart, MapPin, Sparkles } from 'lucide-react';
import { SITE_CONTENT, ScrapbookItem } from '../data/siteContent';
import {
  DoodleSparkle,
  DoodleArrow,
  DoodleCoffeeStain,
  DoodleUnderline,
} from './illustrations/DoodleIllustrations';

export const AboutScrapbook: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 sm:py-28 relative bg-cream-deep/40 border-t-2 border-cocoa/20 overflow-hidden"
      aria-label="About Francis Bean"
    >
      {/* Background Coffee Stain & Doodle Accents */}
      <div className="absolute top-8 right-12 opacity-25 pointer-events-none hidden lg:block">
        <DoodleCoffeeStain size={180} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-peach border border-cocoa text-xs font-display font-bold text-cocoa tracking-wider uppercase mb-3">
            <Sparkles size={13} className="text-cocoa" />
            <span>Our Little Café</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-cocoa tracking-tight leading-[1.1] mb-5">
            {SITE_CONTENT.aboutScrapbook.headline}
          </h2>

          <p className="font-body text-base sm:text-lg text-cocoa-light leading-relaxed max-w-2xl">
            {SITE_CONTENT.aboutScrapbook.intro}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-terracotta">
            <span className="font-hand text-base sm:text-lg">
              3 Mari St • Steps from the patrolled surf beach ~
            </span>
            <DoodleSparkle size={18} className="text-butter shrink-0" />
          </div>
        </div>

        {/* 3 Core Highlights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {SITE_CONTENT.aboutScrapbook.highlights.map((h, i) => (
            <div
              key={h.title}
              className="bg-cream-warm p-6 rounded-3xl border-2 border-cocoa shadow-doodle hover:shadow-doodle-hover hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <div className="w-10 h-10 rounded-2xl bg-peach-light border-2 border-cocoa flex items-center justify-center text-cocoa mb-4">
                {i === 0 ? <Sun size={20} /> : i === 1 ? <Coffee size={20} /> : <Heart size={20} />}
              </div>
              <h3 className="font-display font-bold text-lg text-cocoa mb-2">
                {h.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-cocoa-light leading-relaxed">
                {h.description}
              </p>
            </div>
          ))}
        </div>

        {/* Scrapbook Photo Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {SITE_CONTENT.aboutScrapbook.scrapbookItems.map((item: ScrapbookItem) => (
              <div
                key={item.id}
                className={`relative bg-cream-warm p-3.5 sm:p-4 rounded-3xl border-2 border-cocoa shadow-doodle-lg transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] ${item.rotation}`}
              >
                {/* Washi Tape Strip on Top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 tape-strip rounded-sm -rotate-2 z-20 pointer-events-none" />

                {/* Photo Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-cocoa/30 bg-peach-light">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-cocoa/85 text-cream-paper text-[10px] font-display font-bold uppercase tracking-wider">
                    {item.tag}
                  </div>
                </div>

                {/* Polaroid Text & Handwritten Note */}
                <div className="mt-3.5 px-1">
                  <h4 className="font-display font-bold text-base text-cocoa">
                    {item.title}
                  </h4>
                  <p className="font-body text-xs text-cocoa-light mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-dashed border-cocoa/20 flex items-center justify-between">
                    <span className="font-hand text-sm text-terracotta font-bold">
                      "{item.note}"
                    </span>
                    <span className="text-[10px] text-cocoa-muted font-mono uppercase">
                      Alex QLD
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Under Scrapbook Footnote */}
          <div className="mt-12 text-center">
            <span className="inline-block font-hand text-sm text-cocoa-muted">
              *Real photography styled for the Francis Bean visual sales demonstration.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
