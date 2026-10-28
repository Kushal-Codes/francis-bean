import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrekkieSpecial } from './components/BrekkieSpecial';
import { MenuSection } from './components/MenuSection';
import { AboutScrapbook } from './components/AboutScrapbook';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { MenuItemDetailModal } from './components/MenuItemDetailModal';
import { BeanieChatbot } from './components/BeanieChatbot';
import { MenuItem } from './data/menu';

export const App: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [initialChatPrompt, setInitialChatPrompt] = useState<string | null>(null);
  const [highlightedMenuId, setHighlightedMenuId] = useState<string | null>(null);

  const handleOpenChatWithPrompt = (prompt?: string) => {
    if (prompt) {
      setInitialChatPrompt(prompt);
    }
    setChatOpen(true);
  };

  const handleSelectItem = (item: MenuItem) => {
    setSelectedMenuItem(item);
  };

  const handleHighlightFromChat = (item: MenuItem) => {
    setSelectedMenuItem(item);
    setHighlightedMenuId(item.id);
    const menuEl = document.getElementById('menu');
    menuEl?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      setHighlightedMenuId(null);
    }, 4000);
  };

  return (
    <div className="relative min-h-screen bg-cream-paper text-cocoa selection:bg-peach selection:text-cocoa flex flex-col font-body overflow-x-hidden w-full">
      
      {/* Top Fixed Navigation */}
      <Navbar onOpenChat={() => handleOpenChatWithPrompt()} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Section 01: Hero */}
        <Hero />

        {/* Section 02: The $16 Brekkie Club Deal */}
        <BrekkieSpecial
          onSelectItem={handleSelectItem}
          onAskBeanie={handleOpenChatWithPrompt}
        />

        {/* Section 03: The Interactive Illustrated Menu Board */}
        <MenuSection
          onSelectItem={handleSelectItem}
          onAskBeanie={handleOpenChatWithPrompt}
          highlightedItemId={highlightedMenuId}
        />

        {/* Section 04: Our Little Café Scrapbook */}
        <AboutScrapbook />

        {/* Section 06: Find Your Way to the Beans (Location & Hours) */}
        <LocationSection />
      </main>

      {/* Section 07: Cute Illustrated Menu Footer */}
      <Footer />

      {/* Modal: Item Detail Popover */}
      <MenuItemDetailModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
        onAskBeanie={handleOpenChatWithPrompt}
      />

      {/* Floating Beanie Chatbot Assistant */}
      <BeanieChatbot
        isOpen={chatOpen}
        onToggle={() => setChatOpen(!chatOpen)}
        onClose={() => setChatOpen(false)}
        onSelectItem={handleHighlightFromChat}
        initialPrompt={initialChatPrompt}
      />

    </div>
  );
};

export default App;
