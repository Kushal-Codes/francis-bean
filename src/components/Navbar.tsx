import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Coffee, MessageCircle } from 'lucide-react';
import { BUSINESS_DATA } from '../data/business';
import { getBrisbaneCaféStatus } from '../utils/brisbaneTime';
import { BeanieCharacter } from './illustrations/DoodleIllustrations';

interface NavbarProps {
  onOpenChat: (initialMessage?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [liveStatus, setLiveStatus] = useState(getBrisbaneCaféStatus());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => {
      setLiveStatus(getBrisbaneCaféStatus());
    }, 60000); // refresh every minute

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: '$16 Brekkie', href: '#special' },
    { label: 'Menu', href: '#menu' },
    { label: 'Our Café', href: '#about' },
    { label: 'Find Us', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-paper/95 backdrop-blur-md shadow-sm border-b-2 border-cocoa/20 py-2.5'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Wordmark Badge (Inspired by Attached Menu Top-Left Badge) */}
          <a
            href="#hero"
            className="group flex items-center gap-1.5 sm:gap-2.5 focus:outline-none shrink-0"
            aria-label="Francis Bean Home"
          >
            <div className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border-2 border-cocoa bg-peach-light shadow-doodle-hover group-hover:-rotate-1 transition-transform">
              <span className="font-display font-bold text-base sm:text-xl text-cocoa tracking-tight">
                Francis bean
              </span>
            </div>
            <span className="font-hand text-sm sm:text-lg text-terracotta -rotate-6 hidden xs:inline-block">
              Café
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-display font-medium text-sm text-cocoa hover:text-terracotta transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-terracotta transition-all duration-200 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Bar: Status Pill & Chat Trigger */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-warm border border-cocoa/30 text-xs font-medium text-cocoa">
              <span
                className={`w-2 h-2 rounded-full ${
                  liveStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-terracotta'
                }`}
              />
              <span>{liveStatus.message}</span>
            </div>

            {/* Chat With Beanie Button */}
            <button
              onClick={() => onOpenChat()}
              className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-cocoa bg-peach text-cocoa font-display font-semibold text-xs tracking-wide shadow-doodle-hover hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all active:translate-y-1"
              aria-label="Chat with Beanie the cafe assistant"
            >
              <BeanieCharacter size={20} mood="happy" className="-my-1" />
              <span>Chat with Beanie</span>
            </button>
          </div>

          {/* Mobile Right Controls: Quick Chat Button & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenChat()}
              className="p-2 rounded-full border-2 border-cocoa bg-peach text-cocoa shadow-doodle-hover"
              aria-label="Chat with Beanie"
            >
              <BeanieCharacter size={24} mood="happy" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl border-2 border-cocoa bg-cream-warm text-cocoa shadow-doodle-hover focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream-paper border-b-2 border-cocoa shadow-lg px-6 py-5 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display font-medium text-base text-cocoa hover:text-terracotta py-1.5 border-b border-cocoa/10 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-terracotta font-hand text-sm">→</span>
              </a>
            ))}

            <div className="pt-2 flex flex-col gap-2.5">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-peach-light border border-cocoa/20 text-xs text-cocoa">
                <span
                  className={`w-2 h-2 rounded-full ${
                    liveStatus.isOpen ? 'bg-emerald-500' : 'bg-terracotta'
                  }`}
                />
                <span>{liveStatus.message}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${BUSINESS_DATA.contact.phoneRaw}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-cocoa bg-cream-warm font-display text-xs font-semibold text-cocoa shadow-doodle-hover"
                >
                  <Phone size={14} />
                  <span>Call Café</span>
                </a>
                <a
                  href={BUSINESS_DATA.address.mapsQueryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border-2 border-cocoa bg-butter font-display text-xs font-semibold text-cocoa shadow-doodle-hover"
                >
                  <MapPin size={14} />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
