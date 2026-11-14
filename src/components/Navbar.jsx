import React, { useState } from 'react';
import { LANGUAGES, t } from '../lang';

export function Navbar({ activePage, setActivePage, onLoadDemo, canGoBack, onGoBack, lang = 'en', onLangChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: t(lang, 'nav.home'), icon: 'home' },
    { id: 'report', label: t(lang, 'nav.report'), icon: 'add_circle' },
    { id: 'dashboard', label: t(lang, 'nav.dashboard'), icon: 'checklist' },
    { id: 'resources', label: t(lang, 'nav.resources'), icon: 'health_and_safety' },
  ];

  const handleNavigate = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 px-gutter-mobile max-w-7xl mx-auto flex items-center justify-between gap-space-sm">
        {/* Left: Back button (if available) + Logo */}
        <div className="flex items-center gap-space-sm min-w-0">
          {canGoBack && (
            <button
              onClick={onGoBack}
              aria-label="Go back to previous screen"
              className="min-h-[44px] min-w-[44px] rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
          )}

          <button
            onClick={() => handleNavigate('landing')}
            className="flex items-center gap-space-sm group text-left focus-visible:ring-2 focus-visible:ring-secondary rounded-lg p-1"
            aria-label="KuralGuard home"
          >
            <img
              src="/kuralguard-logo.png"
              alt="KuralGuard shield and community safety logo"
              className="h-8 w-auto object-contain flex-shrink-0"
            />
            <div className="hidden sm:flex flex-col min-w-0">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-extrabold truncate">
                  KuralGuard
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-fixed text-[10px] font-bold tracking-wide uppercase">
                  Civic MVP
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                Turn a local safety concern into the right next step
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = activePage === item.id ||
              (item.id === 'report' && (activePage === 'analysis' || activePage === 'generated-report'));
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-secondary ${
                  isActive
                    ? 'bg-surface-container text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action: Language, Try Demo & Mobile Hamburger */}
        <div className="flex items-center gap-space-xs flex-shrink-0">
          {onLangChange && (
            <label className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant">
              <select
                value={lang}
                onChange={(e) => onLangChange(e.target.value)}
                aria-label="Interface language"
                className="bg-surface-container border border-surface-container-high rounded-lg px-2 py-1.5 text-xs text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary"
              >
                {LANGUAGES.map((item) => (
                  <option key={item.code} value={item.code}>{item.label}</option>
                ))}
              </select>
            </label>
          )}
          <button
            onClick={onLoadDemo}
            aria-label="Try interactive demo with sample data"
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold text-on-secondary-fixed bg-secondary-container/40 hover:bg-secondary-container/60 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary animate-pulse">auto_awesome</span>
            <span>{t(lang, 'nav.tryDemo')}</span>
          </button>

          <button
            onClick={() => handleNavigate('report')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-on-primary bg-primary hover:bg-primary-container shadow-md transition-all focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>{t(lang, 'nav.reportIssue')}</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle main menu"
            className="md:hidden p-2 rounded-full text-on-surface hover:bg-surface-container focus-visible:ring-2 focus-visible:ring-secondary"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-surface-container py-3 space-y-1 bg-surface-container-lowest">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-surface-container text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${isActive ? 'text-secondary' : 'text-on-surface-variant'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-surface-container flex flex-col gap-2">
            <button
              onClick={() => {
                onLoadDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-on-secondary-fixed bg-secondary-container/40"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">auto_awesome</span>
              <span>{t(lang, 'nav.tryDemo')} Scenario</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
