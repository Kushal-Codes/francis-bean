import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Phone, MapPin, Coffee, RotateCcw, ChevronRight } from 'lucide-react';
import { SITE_CONTENT } from '../data/siteContent';
import { BUSINESS_DATA } from '../data/business';
import { MenuItem } from '../data/menu';
import { processChatQuery, ChatResponse } from '../utils/chatbotEngine';
import { BeanieCharacter } from './illustrations/DoodleIllustrations';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'beanie';
  text: string;
  timestamp: string;
  highlightItems?: MenuItem[];
  suggestedAction?: {
    type: 'scroll-to-menu' | 'filter-category' | 'call-phone' | 'open-maps';
    target?: string;
    label: string;
  };
  sourceConfidence?: string;
}

interface BeanieChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
  onHighlightMenuCategory?: (category: string) => void;
  initialPrompt?: string | null;
}

export const BeanieChatbot: React.FC<BeanieChatbotProps> = ({
  isOpen,
  onToggle,
  onClose,
  onSelectItem,
  onHighlightMenuCategory,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'beanie',
      text: SITE_CONTENT.beanieAssistant.greeting,
      timestamp: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speechBubbleDismissed, setSpeechBubbleDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isTyping]);

  // Handle external prompt trigger (e.g. from hero button or dish modal)
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Optional API call to /api/chat with instant deterministic engine fallback
    let response: ChatResponse;

    try {
      // First attempt serverless endpoint with a quick timeout (1.8s)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data && data.text) {
          response = data;
        } else {
          response = processChatQuery(trimmed);
        }
      } else {
        response = processChatQuery(trimmed);
      }
    } catch {
      // Offline, sandboxed, or endpoint unavailable -> use deterministic engine
      response = processChatQuery(trimmed);
    }

    // Small delay for natural conversational rhythm
    setTimeout(() => {
      const beanieMsg: ChatMessage = {
        id: `bean-${Date.now()}`,
        sender: 'beanie',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        highlightItems: response.highlightItems,
        suggestedAction: response.suggestedAction,
        sourceConfidence: response.sourceConfidence,
      };

      setMessages((prev) => [...prev, beanieMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleActionClick = (action: ChatMessage['suggestedAction']) => {
    if (!action) return;
    if (action.type === 'call-phone') {
      window.location.href = `tel:${BUSINESS_DATA.contact.phoneRaw}`;
    } else if (action.type === 'open-maps') {
      window.open(BUSINESS_DATA.address.mapsQueryUrl, '_blank', 'noopener,noreferrer');
    } else if (action.type === 'scroll-to-menu') {
      onClose();
      const menuEl = document.getElementById('menu');
      menuEl?.scrollIntoView({ behavior: 'smooth' });
    } else if (action.type === 'filter-category' && action.target) {
      onClose();
      onHighlightMenuCategory?.(action.target);
      const menuEl = document.getElementById('menu');
      menuEl?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'beanie',
        text: "Reset and ready! What would you like to know about our breakfast, coffee, or opening hours?",
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Floating Bean Trigger Button + Speech Bubble */}
      {!isOpen && (
        <div className="relative flex items-center">
          
          {/* Introductory Speech Bubble */}
          {!speechBubbleDismissed && (
            <div className="hidden sm:flex items-center gap-2 mr-3 px-4 py-2.5 rounded-2xl border-2 border-cocoa bg-cream-warm shadow-doodle animate-bounce animate-duration-1000">
              <span className="font-hand text-sm font-bold text-cocoa">
                Need a hand with the menu?
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSpeechBubbleDismissed(true);
                }}
                className="text-cocoa-muted hover:text-cocoa"
                aria-label="Dismiss message bubble"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Floating Avatar Button */}
          <button
            onClick={onToggle}
            className="group relative p-3 rounded-full border-3 border-cocoa bg-peach text-cocoa shadow-doodle-lg hover:shadow-doodle hover:scale-105 active:scale-95 transition-all duration-200"
            aria-label="Open chat with Beanie the cafe assistant"
          >
            <BeanieCharacter size={44} mood="happy" className="group-hover:rotate-6 transition-transform" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-cream-paper animate-pulse" />
          </button>
        </div>
      )}

      {/* OPEN CHAT WINDOW DRAWER */}
      {isOpen && (
        <div
          className="relative w-[92vw] sm:w-[420px] max-w-[440px] h-[580px] max-h-[85vh] flex flex-col bg-cream-warm rounded-3xl border-3 border-cocoa shadow-doodle-lg overflow-hidden animate-in zoom-in-95 duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="beanie-chat-title"
        >
          {/* Chat Header */}
          <div className="p-4 bg-peach border-b-2 border-cocoa flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="p-1 rounded-full bg-cream-warm border border-cocoa">
                <BeanieCharacter size={32} mood={isTyping ? 'thinking' : 'happy'} />
              </div>
              <div>
                <h3 id="beanie-chat-title" className="font-display font-bold text-base text-cocoa leading-tight">
                  Beanie
                </h3>
                <span className="text-[11px] font-medium text-cocoa-light flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  <span>Café Companion • Verified Facts</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 rounded-xl border border-cocoa/30 text-cocoa hover:bg-cream-warm transition-colors"
                aria-label="Reset chat"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl border border-cocoa/30 text-cocoa hover:bg-terracotta hover:text-cream-paper transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-cream-paper/70">
            
            {/* Grounding Disclaimer Banner */}
            <div className="p-2.5 rounded-xl bg-peach-light/80 border border-cocoa/20 text-[11px] text-cocoa-muted leading-relaxed">
              <strong className="text-cocoa font-display">Bean's Promise:</strong> Answers are grounded in Francis Bean's menu & hours. For severe allergies, call (07) 5479 0079.
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 sm:p-3.5 text-xs sm:text-sm font-body leading-relaxed border-2 border-cocoa shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-butter text-cocoa rounded-br-none'
                      : 'bg-cream-warm text-cocoa rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Highlighted Menu Dish Cards if mentioned */}
                  {msg.highlightItems && msg.highlightItems.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-dashed border-cocoa/20 flex flex-col gap-1.5">
                      <span className="text-[10px] font-display font-bold uppercase tracking-wider text-terracotta">
                        Mentioned Dishes:
                      </span>
                      {msg.highlightItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onSelectItem(item)}
                          className="flex items-center justify-between p-2 rounded-xl bg-peach-light hover:bg-peach border border-cocoa/30 text-left transition-colors"
                        >
                          <div>
                            <span className="font-display font-bold text-xs text-cocoa block">
                              {item.name}
                            </span>
                            <span className="text-[10px] text-cocoa-muted">
                              {item.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-xs text-terracotta">
                              {item.priceFormatted}
                            </span>
                            <ChevronRight size={14} className="text-cocoa-muted" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Suggested Action Button (Call, Directions, Menu) */}
                  {msg.suggestedAction && (
                    <div className="mt-2.5 pt-2 border-t border-dashed border-cocoa/20">
                      <button
                        onClick={() => handleActionClick(msg.suggestedAction)}
                        className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-cocoa text-cream-paper text-xs font-display font-semibold hover:bg-terracotta transition-colors"
                      >
                        {msg.suggestedAction.type === 'call-phone' && <Phone size={13} />}
                        {msg.suggestedAction.type === 'open-maps' && <MapPin size={13} />}
                        {msg.suggestedAction.type === 'scroll-to-menu' && <Coffee size={13} />}
                        <span>{msg.suggestedAction.label}</span>
                      </button>
                    </div>
                  )}
                </div>

                <span className="text-[10px] text-cocoa-muted mt-1 px-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-cocoa-light bg-cream-warm p-2.5 rounded-2xl border-2 border-cocoa w-fit">
                <BeanieCharacter size={20} mood="thinking" />
                <span className="font-hand">Beanie is thinking...</span>
                <span className="animate-pulse">☕</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2.5 bg-peach-light/60 border-t border-cocoa/20 overflow-x-auto flex items-center gap-1.5 no-scrollbar shrink-0">
            {SITE_CONTENT.beanieAssistant.starterPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-cream-warm border border-cocoa text-[11px] font-display font-medium text-cocoa hover:bg-butter transition-colors shrink-0 shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputVal);
            }}
            className="p-3 bg-cream-warm border-t-2 border-cocoa flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about food, prices, hours, or coffee..."
              className="flex-1 py-2.5 px-3.5 rounded-xl border-2 border-cocoa bg-cream-paper text-cocoa text-xs sm:text-sm font-body placeholder-cocoa-muted/70 focus:outline-none focus:ring-2 focus:ring-terracotta"
              maxLength={250}
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="p-2.5 rounded-xl border-2 border-cocoa bg-peach text-cocoa hover:bg-terracotta hover:text-cream-paper disabled:opacity-50 disabled:pointer-events-none transition-colors shadow-doodle-hover"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
