import React, { useState } from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, ExternalLink, Compass, Navigation } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { BUSINESS_DATA } from '../data/business';
import { getBrisbaneCaféStatus } from '../utils/brisbaneTime';
import {
  DoodleCoffeeCup,
  DoodleArrow,
  DoodleSparkle,
  DoodleUnderline,
} from './illustrations/DoodleIllustrations';

export const LocationSection: React.FC = () => {
  const [showInteractiveMap, setShowInteractiveMap] = useState(false);
  const liveStatus = getBrisbaneCaféStatus();

  return (
    <section
      id="location"
      className="py-20 sm:py-28 relative bg-cream-paper border-t-2 border-cocoa/20 scroll-mt-20 overflow-hidden"
      aria-label="Find Francis Bean in Alexandra Headland"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-butter border border-cocoa text-xs font-display font-bold text-cocoa tracking-wider uppercase mb-3">
            <Compass size={13} className="text-cocoa" />
            <span>Find Our Little Café</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold text-cocoa tracking-tight mb-3">
            {SITE_CONTENT.locationSection.headline}
          </h2>

          <p className="font-body text-base text-cocoa-light">
            {SITE_CONTENT.locationSection.subheading}
          </p>

          <div className="mt-3 w-40 mx-auto">
            <DoodleUnderline color="#F1C5A8" />
          </div>
        </div>

        {/* Content Grid: Info Cards (5 cols) + Map Preview (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            
            {/* Address Card */}
            <div className="bg-cream-warm p-6 rounded-3xl border-2 border-cocoa shadow-doodle">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-peach-light border-2 border-cocoa text-cocoa shrink-0">
                  <MapPin size={22} className="text-terracotta" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-cocoa mb-1">
                    {SITE_CONTENT.locationSection.addressTitle}
                  </h3>
                  <p className="font-body font-medium text-base text-cocoa">
                    {BUSINESS_DATA.address.street}
                  </p>
                  <p className="font-body text-sm text-cocoa-light">
                    {BUSINESS_DATA.address.suburb}, {BUSINESS_DATA.address.state} {BUSINESS_DATA.address.postcode}
                  </p>
                  <p className="font-hand text-xs text-terracotta mt-2">
                    {BUSINESS_DATA.address.landmarkHint}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-dashed border-cocoa/20 flex items-center gap-3">
                <a
                  href={BUSINESS_DATA.address.mapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-doodle text-xs py-2 px-4 w-full justify-center"
                >
                  <Navigation size={13} className="mr-1.5" />
                  <span>Get Directions in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Trading Hours Card with Live Brisbane Status */}
            <div className="bg-cream-warm p-6 rounded-3xl border-2 border-cocoa shadow-doodle">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-butter/60 border-2 border-cocoa text-cocoa shrink-0">
                  <Clock size={22} className="text-cocoa" />
                </div>
                <div className="w-full">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-display font-bold text-lg text-cocoa">
                      {SITE_CONTENT.locationSection.hoursTitle}
                    </h3>
                    {/* Live status badge */}
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-cocoa ${
                        liveStatus.isOpen
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-peach-light text-cocoa'
                      }`}
                    >
                      {liveStatus.isOpen ? 'Open Now' : 'Closed'}
                    </span>
                  </div>

                  <p className="font-body font-semibold text-sm text-cocoa">
                    Monday to Sunday: 6:00 am – 1:00 pm
                  </p>
                  <p className="font-body text-xs text-cocoa-light mt-1">
                    Brisbane Time ({liveStatus.currentTimeString})
                  </p>
                  <p className="font-hand text-xs text-cocoa-muted mt-2">
                    *Public holiday hours may vary — please call ahead to confirm!
                  </p>
                </div>
              </div>
            </div>

            {/* Phone & Contact Card */}
            <div className="bg-cream-warm p-6 rounded-3xl border-2 border-cocoa shadow-doodle">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-peach border-2 border-cocoa text-cocoa shrink-0">
                  <Phone size={22} className="text-cocoa" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg text-cocoa mb-1">
                    {SITE_CONTENT.locationSection.phoneTitle}
                  </h3>
                  <a
                    href={`tel:${BUSINESS_DATA.contact.phoneRaw}`}
                    className="font-display font-bold text-xl text-terracotta hover:underline block mb-1"
                  >
                    {BUSINESS_DATA.contact.phoneDisplay}
                  </a>
                  <p className="font-body text-xs text-cocoa-light">
                    Friendly walk-ins warmly welcome. No bookings needed.
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-dashed border-cocoa/20 flex items-center justify-between">
                <span className="text-xs font-display font-medium text-cocoa">
                  Say hello on social:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={BUSINESS_DATA.socialLinks.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-cocoa bg-peach-light text-cocoa hover:bg-peach transition-colors shadow-sm"
                    aria-label="Instagram"
                  >
                    <Instagram size={16} />
                  </a>
                  <a
                    href={BUSINESS_DATA.socialLinks.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-cocoa bg-peach-light text-cocoa hover:bg-peach transition-colors shadow-sm"
                    aria-label="Facebook"
                  >
                    <Facebook size={16} />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Illustrated Map Preview & Interactive Embed (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative bg-cream-warm p-4 sm:p-6 rounded-3xl border-3 border-cocoa shadow-doodle-lg overflow-hidden">
              
              {/* Header inside Map Card */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-cocoa/15">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-peach border border-cocoa" />
                  <span className="font-display font-bold text-sm text-cocoa">
                    Alexandra Headland, Sunshine Coast
                  </span>
                </div>

                <button
                  onClick={() => setShowInteractiveMap(!showInteractiveMap)}
                  className="font-hand text-xs sm:text-sm text-terracotta font-bold hover:underline focus:outline-none"
                >
                  {showInteractiveMap ? '← Show Illustrated Preview' : 'Interactive Google Map →'}
                </button>
              </div>

              {/* Map Display: Interactive Embed or Illustrated Coastal Graphic */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-cocoa bg-peach-light">
                {showInteractiveMap ? (
                  <iframe
                    title="Francis Bean Location Map"
                    src={BUSINESS_DATA.address.embedMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="relative w-full h-full bg-[#EAE2D5] flex items-center justify-center p-6 text-center overflow-hidden">
                    {/* Illustrated Stylized Coastal Road Map Background */}
                    <div className="absolute inset-0 opacity-40">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#BB795F" strokeWidth="0.75" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        {/* Wavy Coastline Line */}
                        <path
                          d="M -50 200 Q 150 180 300 240 T 600 210"
                          stroke="#BDD6C7"
                          strokeWidth="32"
                          fill="none"
                        />
                        <path
                          d="M 50 -20 L 180 400"
                          stroke="#FFF7EA"
                          strokeWidth="12"
                          strokeLinecap="round"
                        />
                        <path
                          d="M 120 120 L 380 90"
                          stroke="#FFF7EA"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>

                    {/* Coastal Beach Watermark */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-seafoam/80 border border-cocoa text-[11px] font-display font-bold text-cocoa">
                      Patrolled Beach ~ 150m
                    </div>

                    {/* Center Marker Card */}
                    <div className="relative z-10 bg-cream-warm p-4 rounded-2xl border-2 border-cocoa shadow-doodle max-w-xs">
                      <div className="w-10 h-10 rounded-full bg-peach border-2 border-cocoa mx-auto flex items-center justify-center mb-2">
                        <DoodleCoffeeCup size={28} withSteam={false} />
                      </div>
                      <h4 className="font-display font-bold text-base text-cocoa">
                        Francis Bean
                      </h4>
                      <p className="font-body text-xs text-cocoa-light mt-0.5">
                        3 Mari Street, Alexandra Headland
                      </p>
                      <button
                        onClick={() => setShowInteractiveMap(true)}
                        className="mt-3 px-3 py-1.5 rounded-xl bg-cocoa text-cream-paper text-xs font-display font-semibold hover:bg-terracotta transition-colors"
                      >
                        Load Interactive Google Map
                      </button>
                    </div>

                    <div className="absolute bottom-2 left-3 font-hand text-xs text-cocoa-muted">
                      *Mari Street runs just parallel to Alexandra Parade
                    </div>
                  </div>
                )}
              </div>

              {/* Map Footer Note */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cocoa-light">
                <span>Free street parking along Mari Street & nearby esplanade</span>
                <a
                  href={BUSINESS_DATA.address.mapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-terracotta hover:underline inline-flex items-center gap-1"
                >
                  <span>Open directly in Google Maps app</span>
                  <ExternalLink size={12} />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
