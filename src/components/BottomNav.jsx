import React from 'react';
import { t } from '../lang';

export function BottomNav({ activePage, setActivePage, lang = 'en' }) {
  const items = [
    { id: 'landing', label: t(lang, 'nav.home'), icon: 'shield' },
    { id: 'report', label: t(lang, 'nav.report'), icon: 'add_circle', isPrimary: true },
    { id: 'dashboard', label: t(lang, 'nav.dashboard'), icon: 'checklist' },
    { id: 'resources', label: t(lang, 'nav.resources'), icon: 'health_and_safety' },
  ];

  const handleNav = (id) => {
    setActivePage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_16px_rgba(13,33,64,0.06)]"
    >
      <div className="flex items-center justify-around h-16 px-gutter-mobile">
        {items.map((item) => {
          const isActive = activePage === item.id ||
            (item.id === 'report' && (activePage === 'analysis' || activePage === 'generated-report'));

          if (item.isPrimary) {
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                aria-current={isActive ? 'page' : undefined}
                aria-label="Report an issue"
                className="flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-2 transition-colors"
              >
                <div className="w-10 h-10 -mt-3.5 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-[0_4px_12px_rgba(0,103,125,0.3)] transition-transform hover:scale-105">
                  <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                </div>
                <span className="font-label-sm text-label-sm mt-0.5">{item.label}</span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-2 transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              <span className="font-label-sm text-label-sm mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
