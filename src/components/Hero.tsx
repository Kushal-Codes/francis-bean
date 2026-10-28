import React from 'react';
import { Coffee, MapPin, ArrowDown, Sparkles, Heart } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { BUSINESS_DATA } from '../data/business';
import {
  DoodleCoffeeCup,
  DoodleSparkle,
  DoodleArrow,
  DoodleUnderline,
  DoodleCoffeeStain,
  DoodleSmilingBadge,
  DoodleToast,
} from './illustrations/DoodleIllustrations';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-16 lg:pb-20 overflow-hidden"
      aria-label="Welcome to Francis Bean"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-12 -left-12 opacity-35 pointer-events-none">
        <DoodleCoffeeStain size={200} />
      </div>
      <div className="absolute bottom-8 right-4 opacity-25 pointer-events-none hidden md:block">
        <DoodleCoffeeStain size={160} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography, Copy & Tactile Buttons (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Illustrated Location Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-cocoa bg-peach-light shadow-doodle-hover mb-6">
              <Sparkles size={14} className="text-terracotta animate-pulse" />
              <span className="font-display font-medium text-xs sm:text-sm text-cocoa tracking-wide">
                {SITE_CONTENT.hero.badgeText}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-cocoa tracking-tight leading-[1.12] sm:leading-[1.08] mb-4 break-words max-w-full">
              <span>{SITE_CONTENT.hero.headlinePart1}</span>{' '}
              <span className="relative inline-block text-terracotta">
                {SITE_CONTENT.hero.headlinePart2}
                <div className="absolute -bottom-2 left-0 w-full pointer-events-none">
                  <DoodleUnderline color="#F1CF82" />
                </div>
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="font-body text-base sm:text-lg text-cocoa-light max-w-xl mb-8 leading-relaxed">
              {SITE_CONTENT.hero.subheading}
            </p>

            {/* Handwritten Floating Note with Doodle Arrow */}
            <div className="relative mb-8 pl-2 flex items-center gap-3">
              <span className="font-hand text-lg sm:text-xl text-terracotta font-normal rotate-[-3deg]">
                {SITE_CONTENT.hero.handwrittenNote}
              </span>
              <DoodleArrow direction="right" className="text-cocoa -mt-1" />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#menu"
                className="btn-doodle w-full sm:w-auto text-center"
              >
                <span>{SITE_CONTENT.hero.ctaPrimary}</span>
                <span className="ml-2 font-hand text-lg">↓</span>
              </a>

              <a
                href="#location"
                className="btn-doodle-cream w-full sm:w-auto text-center"
              >
                <span>{SITE_CONTENT.hero.ctaSecondary}</span>
                <MapPin size={16} className="ml-2 text-terracotta" />
              </a>
            </div>

            {/* Quick Badges Strip */}
            <div className="mt-10 pt-6 border-t-2 border-cocoa/15 w-full flex flex-wrap items-center gap-5 sm:gap-8">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-cocoa">
                <span className="w-2.5 h-2.5 rounded-full bg-peach border border-cocoa" />
                <span>{SITE_CONTENT.hero.cupSticker}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-cocoa">
                <span className="w-2.5 h-2.5 rounded-full bg-butter border border-cocoa" />
                <span>{SITE_CONTENT.hero.hoursBadge}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-cocoa">
                <span className="w-2.5 h-2.5 rounded-full bg-seafoam border border-cocoa" />
                <span>Dogs Warmly Welcome</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hand-Drawn Illustrated + Photographic Composition (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center items-center max-w-full my-4 lg:my-0">
            
            {/* Background Peach Oval Aura */}
            <div className="absolute w-[260px] h-[320px] sm:w-[360px] sm:h-[420px] rounded-[50%] bg-peach/40 border-2 border-dashed border-cocoa/30 -rotate-3 pointer-events-none" />

            {/* Scrapbook Real Food Photographic Cutout */}
            <div className="relative z-10 w-[240px] sm:w-[320px] bg-cream-warm p-3 sm:p-3.5 rounded-3xl border-2 border-cocoa shadow-doodle rotate-2 hover:rotate-0 transition-transform duration-300">
              
              {/* Tape Strip Accent */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 sm:w-24 h-5 sm:h-6 tape-strip rounded-sm -rotate-2 z-20 pointer-events-none" />

              {/* Photo Frame */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-cocoa/30 bg-peach-light">
                <img
                  src="/images/coffee-pour.jpg"
                  alt="Campos specialty flat white coffee at Francis Bean"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-cocoa/80 text-cream-paper text-[11px] font-display">
                  Fresh pour daily
                </div>
              </div>

              {/* Caption Under Photo */}
              <div className="mt-3 flex items-center justify-between px-1">
                <span className="font-hand text-sm sm:text-base text-cocoa font-bold">
                  Campos Superior Blend
                </span>
                <span className="text-[10px] sm:text-[11px] text-cocoa-muted font-display uppercase tracking-wider">
                  3 Mari St
                </span>
              </div>
            </div>

            {/* Overlapping Large Illustrated Ceramic Coffee Cup with Steam */}
            <div className="absolute -bottom-6 left-0 sm:-bottom-10 sm:-left-10 z-20">
              <DoodleCoffeeCup size={95} withSteam={true} />
            </div>

            {/* Friendly Smiling Sticker Badge */}
            <div className="absolute -top-4 right-0 sm:-top-8 sm:-right-4 z-20">
              <DoodleSmilingBadge size={54} />
            </div>

            {/* Floating Toast Doodle */}
            <div className="absolute -bottom-4 right-2 sm:-bottom-8 sm:-right-6 z-20 hidden sm:block">
              <DoodleToast size={52} />
            </div>

            {/* Sparkles Floating */}
            <div className="absolute top-4 left-4 z-20">
              <DoodleSparkle size={24} className="text-butter animate-wiggle" />
            </div>
            <div className="absolute bottom-20 right-2 z-20">
              <DoodleSparkle size={20} className="text-butter" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
