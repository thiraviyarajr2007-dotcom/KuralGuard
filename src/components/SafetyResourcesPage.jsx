import React, { useState } from 'react';
import { SAFETY_RESOURCES } from '../data/mockData';
import { t } from '../lang';

export function SafetyResourcesPage({ lang = 'en' }) {
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');

  const triggerCall = (number, name) => {
    setToastText(`Connecting to ${name}...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    window.location.href = `tel:${number}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto px-gutter-mobile py-space-md flex flex-col gap-space-md pt-16 pb-28">
      
      {/* Interactive Toast Notification */}
      <div 
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 transition-all duration-300 ${
          showToast ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-[-10px]'
        }`}
      >
        <span className="material-symbols-outlined text-[18px] text-secondary-container" style={{ fontVariationSettings: '"FILL" 1' }}>
          phone_in_talk
        </span>
        <span className="font-label-md text-label-md">{toastText}</span>
      </div>

      {/* Top Warm Banner & Demo Disclaimer */}
      <div className="bg-surface-container rounded-2xl p-space-md shadow-sm relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-secondary-container/20 blur-xl pointer-events-none"></div>
        <div className="flex items-start gap-space-sm relative z-10">
          <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: '"FILL" 1' }}>
              verified_user
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-headline-sm text-headline-sm text-primary">Emergency & Care Directory</span>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed-dim/30 text-on-tertiary-fixed font-label-sm text-label-sm">Demo</span>
            </div>
            <p className="font-label-md text-label-md text-secondary mt-0.5">
              அவசர உதவி எண்கள் மற்றும் வழிகாட்டுதல்கள்
            </p>
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-surface-container-highest/60 text-on-surface-variant font-body-sm text-body-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim" style={{ fontVariationSettings: '"FILL" 1' }}>
                info
              </span>
              <span>Demo resources — verify contact details before production use.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Dial Speed Row */}
      <div className="flex flex-col gap-space-xs">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider px-1">
          Instant Fast-Tap Responders
        </span>
        <div className="flex gap-space-sm overflow-x-auto pb-1.5 pt-0.5 no-scrollbar">
          {/* 112 Police */}
          <button
            className="flex-shrink-0 flex items-center gap-2.5 bg-error-container text-on-error-container px-3.5 py-2.5 rounded-xl shadow-sm hover:opacity-90 active:scale-95 transition-all text-left"
            onClick={() => triggerCall('112', 'National Emergency Police Dispatch')}
          >
            <div className="w-8 h-8 rounded-full bg-error text-on-error flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">local_police</span>
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm leading-tight text-on-error-container">112 / 100</div>
              <div className="font-label-sm text-label-sm opacity-90">Police Rapid</div>
            </div>
          </button>

          {/* 181 Women */}
          <button
            className="flex-shrink-0 flex items-center gap-2.5 bg-secondary text-on-secondary px-3.5 py-2.5 rounded-xl shadow-sm hover:opacity-95 active:scale-95 transition-all text-left"
            onClick={() => triggerCall('181', 'Tamil Nadu Women Helpline')}
          >
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">shield_person</span>
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm leading-tight text-on-secondary">181</div>
              <div className="font-label-sm text-label-sm opacity-90">Women's Safety</div>
            </div>
          </button>

          {/* 108 Ambulance */}
          <button
            className="flex-shrink-0 flex items-center gap-2.5 bg-surface-container-high text-on-surface px-3.5 py-2.5 rounded-xl shadow-sm hover:bg-surface-container-highest active:scale-95 transition-all text-left"
            onClick={() => triggerCall('108', 'State Medical Ambulance Cell')}
          >
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">ambulance</span>
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm leading-tight text-primary">108</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">Medical First</div>
            </div>
          </button>

          {/* 1098 Childline */}
          <button
            className="flex-shrink-0 flex items-center gap-2.5 bg-surface-container-high text-on-surface px-3.5 py-2.5 rounded-xl shadow-sm hover:bg-surface-container-highest active:scale-95 transition-all text-left"
            onClick={() => triggerCall('1098', 'Childline Student Crisis Protection')}
          >
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[18px]">school</span>
            </div>
            <div>
              <div className="font-headline-sm text-headline-sm leading-tight text-primary">1098</div>
              <div className="font-label-sm text-label-sm text-on-surface-variant">Child Helpline</div>
            </div>
          </button>
        </div>
      </div>

      {/* Category 1: Emergency Help */}
      <div className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-4 rounded-full bg-error"></div>
            <h2 className="font-title-md text-title-md text-primary">Emergency Help</h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant">அவசர உதவி</span>
          </div>
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-semibold">24/7 Priority</span>
        </div>

        {/* Police Rapid Response */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-start gap-space-sm min-w-0">
              <div className="w-11 h-11 rounded-xl bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">policy</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="font-title-md text-title-md text-primary font-bold">Police Rapid Response</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">National Emergency Central Line for on-ground police dispatch and active distress.</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                    Avg Response: &lt; 7 mins
                  </span>
                </div>
              </div>
            </div>
            <button
              aria-label="Call 112"
              className="flex-shrink-0 h-10 px-4 rounded-full bg-error text-on-error flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 active:scale-95 transition-all"
              onClick={() => triggerCall('112', 'Police Rapid Response')}
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span className="font-label-md text-label-md font-bold">112</span>
            </button>
          </div>
        </div>

        {/* Traffic Police Helpline */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-start gap-space-sm min-w-0">
              <div className="w-11 h-11 rounded-xl bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">traffic</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="font-title-md text-title-md text-primary font-bold">Traffic Police Helpline</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Immediate transit hazards, signal breakdowns, school road crossing wardens.</p>
              </div>
            </div>
            <button
              aria-label="Call 103"
              className="flex-shrink-0 h-10 px-4 rounded-full bg-primary text-on-primary flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 active:scale-95 transition-all"
              onClick={() => triggerCall('103', 'Traffic Police Control')}
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span className="font-label-md text-label-md font-bold">103</span>
            </button>
          </div>
        </div>

        {/* Childline / Student Safety */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-start gap-space-sm min-w-0">
              <div className="w-11 h-11 rounded-xl bg-secondary-container/40 text-on-secondary-fixed flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">escalator_warning</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="font-title-md text-title-md text-primary font-bold">Childline & Student Safety</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Toll-free student crisis, harassment protection, and emotional welfare lifeline.</p>
              </div>
            </div>
            <button
              aria-label="Call 1098"
              className="flex-shrink-0 h-10 px-4 rounded-full bg-secondary text-on-secondary flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 active:scale-95 transition-all"
              onClick={() => triggerCall('1098', 'Childline Safety Helpline')}
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span className="font-label-md text-label-md font-bold">1098</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category 2: Women's Safety */}
      <div className="flex flex-col gap-space-sm mt-1">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-4 rounded-full bg-secondary"></div>
            <h2 className="font-title-md text-title-md text-primary">Women's Safety</h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant">பெண்கள் பாதுகாப்பு</span>
          </div>
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">Tamil Nadu Special</span>
        </div>

        {/* Women's Helpline (Govt of TN) */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-start gap-space-sm min-w-0">
              <div className="w-11 h-11 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">female</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="font-title-md text-title-md text-primary font-bold">Women's Helpline (TN Govt)</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">24/7 confidential safety, psychological support, and transit assistance.</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface-variant">Confidential Counseling</span>
                </div>
              </div>
            </div>
            <button
              aria-label="Call 181"
              className="flex-shrink-0 h-10 px-4 rounded-full bg-secondary text-on-secondary flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 active:scale-95 transition-all"
              onClick={() => triggerCall('181', 'Women Helpline (TN)')}
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span className="font-label-md text-label-md font-bold">181</span>
            </button>
          </div>
        </div>

        {/* Pink Patrol / Transit Escort */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-start gap-space-sm min-w-0">
              <div className="w-11 h-11 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">directions_car</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="font-title-md text-title-md text-primary font-bold">Pink Patrol Transit Escort</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Direct mobile dispatch for school zones and coaching center transit corridors.</p>
                <span className="font-label-sm text-label-sm text-secondary font-semibold mt-1">Direct: 94981 11222</span>
              </div>
            </div>
            <button
              aria-label="Call 94981 11222"
              className="flex-shrink-0 h-10 px-3.5 rounded-full bg-primary text-on-primary flex items-center justify-center gap-1 shadow-sm hover:opacity-90 active:scale-95 transition-all"
              onClick={() => triggerCall('9498111222', 'Pink Patrol Dispatch')}
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span className="font-label-md text-label-md font-bold">Call</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category 3: Medical & Health */}
      <div className="flex flex-col gap-space-sm mt-1">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-4 rounded-full bg-tertiary-fixed-dim"></div>
            <h2 className="font-title-md text-title-md text-primary">Medical & Health</h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant">மருத்துவம்</span>
          </div>
        </div>

        {/* Ambulance / Medical Emergency */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-start gap-space-sm min-w-0">
              <div className="w-11 h-11 rounded-xl bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">ambulance</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="font-title-md text-title-md text-primary font-bold">Medical Ambulance (TN)</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Free, 24/7 life-saving emergency medical transport across ward zones.</p>
              </div>
            </div>
            <button
              aria-label="Call 108"
              className="flex-shrink-0 h-10 px-4 rounded-full bg-primary text-on-primary flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 active:scale-95 transition-all"
              onClick={() => triggerCall('108', 'Medical Ambulance')}
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span className="font-label-md text-label-md font-bold">108</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety Protocol Note */}
      <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary">
          <span className="material-symbols-outlined text-[20px] text-secondary">info</span>
          <h3 className="font-title-md text-title-md text-primary font-bold">Safety Protocol Note</h3>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          All numbers above are demo references for interface testing. In an actual emergency, dial your local emergency services directly. KuralGuard coordinates with verified ward authorities and community response teams.
        </p>
      </div>

    </div>
  );
}
