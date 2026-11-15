import React from 'react';
import { DEMO_METRICS, CATEGORIES } from '../data/mockData';
import { t } from '../lang';

export function LandingPage({ lang = 'en', onLangChange, onStartReport, onLoadDemo, onExploreDashboard, onGoToResources }) {
  return (
    <div className="space-y-8 py-4 px-gutter-mobile">
      
      {/* Top Hero Identity Lockup Banner */}
      <div className="flex flex-col gap-space-sm">
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="relative w-12 h-12 rounded-xl bg-primary-container/5 flex items-center justify-center p-1.5 flex-shrink-0">
              <img
                src="/kuralguard-logo.png"
                alt="KuralGuard shield and community safety logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-headline-sm text-primary font-extrabold tracking-tight truncate">
                KuralGuard
              </span>
              <span className="font-label-sm text-label-sm text-secondary truncate">
                AI Safety Briefs for Safer Student Communities
              </span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="inline-flex items-center p-1 rounded-full bg-surface-container text-on-surface text-[11px] font-bold">
              <button
                type="button"
                onClick={() => onLangChange && onLangChange('en')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  lang === 'en'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLangChange && onLangChange('ta')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  lang === 'ta'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                தமிழ்
              </button>
            </div>
          </div>
        </div>

        {/* Reassuring Civic Tagline Strip */}
        <div className="bg-gradient-to-r from-secondary-fixed/50 via-surface-container to-surface-container-high px-space-md py-2.5 rounded-xl flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-[18px] text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
            verified
          </span>
          <p className="font-label-md text-label-md text-on-secondary-fixed font-semibold">
            "Turn a local safety concern into the right next step."
          </p>
        </div>
      </div>

      {/* Hero Content Area */}
      <div className="flex flex-col gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-extrabold leading-tight">
            Make your community safer, one clear report at a time.
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Turn local safety observations into multilingual, evidence-backed community action. Calibrated for students, parents, and civic bodies.
          </p>
        </div>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-space-sm pt-1">
          <button
            onClick={onStartReport}
            aria-label="Report an Issue"
            className="w-full min-h-[52px] px-space-lg rounded-xl bg-primary text-on-primary font-headline-sm text-headline-sm flex items-center justify-center gap-space-xs shadow-md transition-all active:scale-[0.98] group"
          >
            <span>Create a Safety Brief</span>
            <span className="material-symbols-outlined text-[20px] text-secondary-fixed-dim transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>

          <button
            onClick={onLoadDemo}
            aria-label="Try Demo"
            className="w-full min-h-[48px] px-space-md rounded-xl bg-surface-container-high text-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs transition-colors hover:bg-surface-container-highest"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">play_circle</span>
            <span>Try Interactive Demo</span>
          </button>

          {onGoToResources && (
            <button
              type="button"
              onClick={onGoToResources}
              className="w-full min-h-[48px] px-space-md rounded-xl bg-surface-container text-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs transition-colors hover:bg-surface-container-high"
            >
              <span>{t(lang, 'landing.ctaResources')}</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Pipeline Flow Card */}
      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Intelligent Action Pipeline
          </span>
          <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
            Multilingual Flow
          </span>
        </div>

        {/* 3-Step Horizontal Flow Preview */}
        <div className="grid grid-cols-3 gap-space-xs relative pt-1">
          <div className="bg-surface-container-low p-2.5 rounded-xl flex flex-col gap-1 items-center text-center">
            <div className="w-7 h-7 rounded-full bg-surface-container-high text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">visibility</span>
            </div>
            <span className="font-label-sm text-label-sm font-bold text-on-surface">1. Observation</span>
            <span className="font-label-sm text-[10px] text-on-surface-variant">Tamil / Eng input</span>
          </div>

          <div className="bg-surface-container p-2.5 rounded-xl flex flex-col gap-1 items-center text-center relative">
            <div className="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-[16px]">analytics</span>
            </div>
            <span className="font-label-sm text-label-sm font-bold text-on-surface">2. Risk Insight</span>
            <span className="font-label-sm text-[10px] text-secondary font-semibold">Triage & Context</span>
          </div>

          <div className="bg-surface-container-low p-2.5 rounded-xl flex flex-col gap-1 items-center text-center">
            <div className="w-7 h-7 rounded-full bg-surface-container-high text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">send_and_archive</span>
            </div>
            <span className="font-label-sm text-label-sm font-bold text-on-surface">3. Civic Action</span>
            <span className="font-label-sm text-[10px] text-on-surface-variant">PTA & Ward Brief</span>
          </div>
        </div>
      </div>

      {/* Live Demo Metric Pills */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-[18px]">equalizer</span>
            <span className="font-title-md text-title-md text-primary font-bold">
              Community Safety Pulse
            </span>
          </div>
          <span className="font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-secondary-container/30 text-on-secondary-fixed font-bold tracking-tight">
            Demonstration Impact Metrics
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs flex flex-col">
            <span className="font-headline-sm text-headline-sm font-extrabold text-primary">
              {DEMO_METRICS.totalReports}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Total Hazards</span>
          </div>

          <div className="bg-error-container/40 p-3 rounded-xl shadow-xs flex flex-col">
            <span className="font-headline-sm text-headline-sm font-extrabold text-error">
              {DEMO_METRICS.highRisk}
            </span>
            <span className="font-label-sm text-label-sm text-on-error-container font-semibold">
              High Risk Identified
            </span>
          </div>

          <div className="bg-secondary-fixed/30 p-3 rounded-xl shadow-xs flex flex-col">
            <span className="font-headline-sm text-headline-sm font-extrabold text-secondary">
              {DEMO_METRICS.resolved}
            </span>
            <span className="font-label-sm text-label-sm text-on-secondary-fixed-variant font-semibold">
              Resolved / Safe
            </span>
          </div>
        </div>
      </div>

      {/* Safety Report Hero Preview Card */}
      <div className="bg-surface-container-lowest rounded-2xl shadow-md p-space-md flex flex-col gap-space-sm relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
        <div className="flex items-center justify-between gap-space-xs pl-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-wide text-error font-extrabold">
              Featured Student Observation
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">14m ago</span>
        </div>

        <div className="pl-1 flex flex-col gap-1.5">
          <h3 className="font-title-md text-title-md text-primary font-bold">
            Dangerous Road Crossing Near Bharathi Matriculation School
          </h3>

          {/* Risk Chips */}
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-md text-label-md font-bold">
              <span className="material-symbols-outlined text-[14px]">directions_walk</span>
              Road Safety
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-md text-label-md font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
              High Risk
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
              Ward 142
            </span>
          </div>

          {/* Key Finding Block */}
          <div className="mt-1 bg-surface-container-low p-space-sm rounded-xl">
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-start gap-1.5">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-[18px] flex-shrink-0 mt-0.5">warning</span>
              <span>
                <strong className="text-on-surface">Key Finding:</strong> No marked zebra crossing, blind turn, high-speed school-bus transit corridor during 8:00–8:45 AM.
              </span>
            </p>
          </div>
        </div>

        {/* Quick Action Preview Anchor */}
        <button
          onClick={onLoadDemo}
          className="pl-1 w-full min-h-[44px] mt-1 rounded-xl bg-surface-container flex items-center justify-between px-space-md text-primary font-label-lg text-label-lg transition-colors hover:bg-surface-container-high"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">assignment_turned_in</span>
            <span>View AI Brief (Ready in 30s)</span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-secondary">arrow_forward</span>
        </button>
      </div>

      {/* Value & Benefit Cards Stack */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
            How KuralGuard Protects
          </h2>
          <span className="font-label-sm text-label-sm text-secondary font-semibold">Civic First</span>
        </div>

        {/* Benefit 1 */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-xs flex items-start gap-space-md">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">health_and_safety</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-title-md text-title-md text-primary font-bold">1. Understand Risk</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Clear danger grading without panic or viral sensationalism. Pinpoints immediate hazard factors logically.
            </p>
          </div>
        </div>

        {/* Benefit 2 */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-xs flex items-start gap-space-md">
          <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-on-secondary-container flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">directions_run</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-title-md text-title-md text-primary font-bold">2. Get Safe Guidance</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Actionable transit safety protocols for students walking home, school escorts, and van operators.
            </p>
          </div>
        </div>

        {/* Benefit 3 */}
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-xs flex items-start gap-space-md">
          <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">account_balance</span>
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="font-title-md text-title-md text-primary font-bold">3. Support Community Action</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Create a Clear Report • One-tap structured PDF/WhatsApp dossiers formatted specifically for Ward Councillors, PTAs, and Police Patrols.
            </p>
          </div>
        </div>
      </div>

      {/* Social Impact & Civic Footer Note */}
      <div className="p-space-md rounded-2xl bg-surface-container-low text-center flex flex-col items-center justify-center gap-1.5">
        <div className="flex items-center gap-1.5 text-secondary">
          <span className="material-symbols-outlined text-[18px]">diversity_3</span>
          <span className="font-label-md text-label-md font-bold uppercase tracking-wider">
            Social Impact Edition
          </span>
        </div>
        <p className="font-label-sm text-label-sm text-on-surface-variant">
          Built for Student Communities, Resident Associations & PTAs.
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-label-sm text-[11px] text-on-surface-variant">
            Tamil Nadu Civic Technology Initiative
          </span>
        </div>
      </div>

    </div>
  );
}
