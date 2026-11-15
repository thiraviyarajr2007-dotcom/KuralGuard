import React, { useState } from 'react';
import { SAFETY_RESOURCES } from '../data/mockData';
import { t } from '../lang';

export function SafetyResourcesPage({ lang = 'en' }) {
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const [showCounselorModal, setShowCounselorModal] = useState(false);
  const [showWardenModal, setShowWardenModal] = useState(false);
  const [supportMode, setSupportMode] = useState('text');

  const triggerCall = (number, name) => {
    setToastText(`Simulating dial to ${name} (${number})...`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3200);
  };

  const triggerSafetyEscort = () => {
    setToastText('Mapping nearby registered safe havens & open transit hubs...');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2800);
  };

  const handleCounselorSubmit = (e) => {
    e.preventDefault();
    setShowCounselorModal(false);
    setTimeout(() => {
      setToastText('Counselor request received. Check-in slot confirmed privately.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3200);
    }, 300);
  };

  const handleWardenSubmit = (e) => {
    e.preventDefault();
    setShowWardenModal(false);
    setTimeout(() => {
      setToastText('Welcome! Route orientation schedule sent to your student portal.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3200);
    }, 300);
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
              <h1 className="font-headline-sm text-headline-sm text-primary font-bold">
                Safety & Emergency Resources
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed-dim/30 text-on-tertiary-fixed font-label-sm text-label-sm">
                Demo
              </span>
            </div>
            <p className="font-label-md text-label-md text-secondary mt-0.5">
              அவசர உதவி எண்கள் மற்றும் வழிகாட்டுதல்கள்
            </p>
            <div className="mt-2.5 flex flex-col gap-1 p-2.5 rounded-lg bg-surface-container-highest/60 text-on-surface-variant font-body-sm text-body-sm">
              <div className="flex items-center gap-1.5 font-bold text-primary text-xs uppercase tracking-wide">
                <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim" style={{ fontVariationSettings: '"FILL" 1' }}>
                  info
                </span>
                <span>DEMONSTRATION RESOURCE DIRECTORY NOTICE</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All campus and local ward contacts below marked with the DEMO badge must be verified before production use.
              </p>
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
            <h2 className="font-title-md text-title-md text-primary font-bold">Emergency Help</h2>
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
                    Call 112 Toll-Free • Avg Response: &lt; 7 mins
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

      {/* Category 2: Women’s Safety */}
      <div className="flex flex-col gap-space-sm mt-1">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-4 rounded-full bg-secondary"></div>
            <h2 className="font-title-md text-title-md text-primary font-bold">Women’s Safety</h2>
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

      {/* Visual Care & Guidance Card */}
      <div className="bg-surface-container rounded-2xl p-space-md shadow-sm flex items-center gap-space-md overflow-hidden relative">
        <div className="flex-1 flex flex-col min-w-0">
          <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">You are never alone</span>
          <h3 className="font-title-md text-title-md text-primary mt-0.5 font-bold">Need a quiet safe route escort?</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Notify a peer guardian or initiate an active audio check-in right from your neighborhood desk.</p>
          <button 
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-md text-label-md font-bold w-fit shadow-sm hover:opacity-90 active:scale-95 transition-all"
            onClick={triggerSafetyEscort}
          >
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            <span>Find Nearby Safe Havens</span>
          </button>
        </div>
        <div className="w-20 h-20 rounded-2xl bg-secondary-container/40 flex items-center justify-center flex-shrink-0 shadow-sm">
          <span className="material-symbols-outlined text-[40px] text-secondary">shield_with_heart</span>
        </div>
      </div>

      {/* Category 3: Medical Assistance */}
      <div className="flex flex-col gap-space-sm mt-1">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-4 rounded-full bg-primary"></div>
            <h2 className="font-title-md text-title-md text-primary font-bold">Medical Assistance</h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant">மருத்துவ உதவி</span>
          </div>
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-semibold">First Response</span>
        </div>

        {/* Ambulance Emergency */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex items-start justify-between gap-space-sm">
          <div className="flex items-start gap-space-sm min-w-0">
            <div className="w-11 h-11 rounded-xl bg-error-container/60 text-error flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">medical_services</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="font-title-md text-title-md text-primary font-bold">Ambulance Emergency</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Free emergency paramedic transport, trauma care, and campus clinic link.</p>
            </div>
          </div>
          <button
            aria-label="Call 108"
            className="flex-shrink-0 h-10 px-4 rounded-full bg-primary text-on-primary flex items-center justify-center gap-1.5 shadow-sm hover:opacity-90 active:scale-95 transition-all"
            onClick={() => triggerCall('108', 'Emergency Ambulance 108')}
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span className="font-label-md text-label-md font-bold">108</span>
          </button>
        </div>

        {/* Disaster & Flood Relief Cell */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex items-start justify-between gap-space-sm">
          <div className="flex items-start gap-space-sm min-w-0">
            <div className="w-11 h-11 rounded-xl bg-surface-container-high text-primary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">flood</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="font-title-md text-title-md text-primary font-bold">Disaster & Flood Relief Cell</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Municipal cyclone monitoring, waterlogged roads, and emergency shelters.</p>
            </div>
          </div>
          <button
            aria-label="Call 1077"
            className="flex-shrink-0 h-10 px-4 rounded-full bg-surface-container-high text-primary hover:bg-surface-container-highest flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
            onClick={() => triggerCall('1077', 'Municipal Disaster Relief Cell')}
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            <span className="font-label-md text-label-md font-bold">1077</span>
          </button>
        </div>
      </div>

      {/* Category 4: Trusted adult or community support */}
      <div className="flex flex-col gap-space-sm mt-1">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-4 rounded-full bg-secondary-container"></div>
            <h2 className="font-title-md text-title-md text-primary font-bold">Trusted adult or community support</h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant">சமூக ஆதரவு</span>
          </div>
          <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-secondary font-semibold">Local Ward</span>
        </div>

        {/* School Counselor & PTA Lead */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-start gap-space-sm min-w-0">
              <div className="w-11 h-11 rounded-xl bg-surface-container text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">support_agent</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-title-md text-title-md text-primary font-bold">School Counselor & PTA Lead</span>
                  <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm">Active</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Bharathi Higher Secondary Student Welfare Cell — On-site emotional & academic guidance.</p>
                <div className="mt-2 flex items-center gap-3 text-secondary font-label-md text-label-md">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">badge</span>
                    Mrs. S. Meenakshi, M.Sc
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">schedule</span>
                    8:30 AM - 4:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2">
            <button
              className="flex-1 py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 transition-colors"
              onClick={() => triggerCall('+914428334400', 'Bharathi School Student Welfare Desk')}
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              <span>Direct Desk</span>
            </button>
            <button
              className="flex-1 py-2 px-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95"
              onClick={() => setShowCounselorModal(true)}
            >
              <span className="material-symbols-outlined text-[16px]">chat_bubble</span>
              <span>Book Confidential Talk</span>
            </button>
          </div>
        </div>

        {/* Ward 14 Civic Desk */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col gap-space-xs">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex items-start gap-space-sm min-w-0">
              <div className="w-11 h-11 rounded-xl bg-surface-container text-primary flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[22px]">location_city</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="font-title-md text-title-md text-primary font-bold">Ward 14 Civic Desk</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Councillor Office Ward 14 • Street lighting repairs, open manhole fixes & street safety audits.</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface font-label-sm text-label-sm">
                    Timings: 9:00 AM – 5:00 PM
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed font-label-sm text-label-sm">
                    Office: Anna Nagar West 2nd Ave
                  </span>
                </div>
              </div>
            </div>
            <button
              aria-label="Call Ward 14 Civic Desk"
              className="flex-shrink-0 h-10 w-10 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center shadow-sm"
              onClick={() => triggerCall('04425619300', 'Ward 14 Civic Councillor Office')}
            >
              <span className="material-symbols-outlined text-[18px]">phone</span>
            </button>
          </div>
        </div>

        {/* Youth Peer Safety Ambassador Network Card */}
        <div className="bg-surface-container rounded-2xl p-space-md shadow-sm flex flex-col gap-space-sm relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-title-md text-title-md text-primary font-bold truncate">Youth Peer Safety Ambassadors</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Trained student wardens monitoring safe transit routes</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest/80 backdrop-blur-md rounded-xl p-3 flex items-center justify-between gap-3">
            <div className="flex items-center -space-x-2 overflow-hidden flex-shrink-0">
              <div className="inline-block h-8 w-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm ring-2 ring-surface-container-lowest">VJ</div>
              <div className="inline-block h-8 w-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm ring-2 ring-surface-container-lowest">AK</div>
              <div className="inline-block h-8 w-8 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-label-sm text-label-sm ring-2 ring-surface-container-lowest">SN</div>
              <div className="inline-block h-8 w-8 rounded-full bg-surface-container-high text-primary flex items-center justify-center font-label-sm text-label-sm ring-2 ring-surface-container-lowest">+14</div>
            </div>
            <button
              className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold flex items-center gap-1 hover:opacity-90 active:scale-95 transition-all"
              onClick={() => setShowWardenModal(true)}
            >
              <span>Join Wardens</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Community Peace & Trust Footer */}
      <div className="mt-space-md mb-space-sm bg-surface-container-lowest rounded-2xl p-space-md flex flex-col items-center text-center shadow-sm gap-2">
        <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined text-[24px]">verified</span>
        </div>
        <span className="font-title-md text-title-md text-primary font-bold">KuralGuard Safety Network</span>
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
          In active collaboration with Tamil Nadu Civic Community initiatives, school boards, and verified municipal safety wardens.
        </p>
        <div className="flex items-center gap-2 mt-1">
          <span className="font-label-sm text-label-sm text-secondary font-bold">24/7 Verified Helplines</span>
          <span className="text-on-surface-variant">•</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Zero Tolls</span>
          <span className="text-on-surface-variant">•</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Zero Log Storage</span>
        </div>
      </div>

      {/* Confidential Counselor Talk Modal */}
      {showCounselorModal && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-surface rounded-t-3xl sm:rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md animate-in fade-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                </div>
                <span className="font-title-md text-title-md text-primary font-bold">Confidential Welfare Talk</span>
              </div>
              <button 
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                onClick={() => setShowCounselorModal(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Your conversation is 100% private. School authorities and parents are not alerted unless there is immediate personal harm.
            </p>
            <form onSubmit={handleCounselorSubmit} className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-2">
                <label className="font-label-md text-label-md text-primary font-semibold">Preferred Mode of Support</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className={`p-3 rounded-xl font-label-md text-label-md flex flex-col items-center gap-1 transition-all ${
                      supportMode === 'text' ? 'bg-surface-container-high ring-2 ring-secondary text-primary' : 'bg-surface-container text-on-surface'
                    }`}
                    onClick={() => setSupportMode('text')}
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>Anonymous Text</span>
                  </button>
                  <button
                    type="button"
                    className={`p-3 rounded-xl font-label-md text-label-md flex flex-col items-center gap-1 transition-all ${
                      supportMode === 'call' ? 'bg-surface-container-high ring-2 ring-secondary text-primary' : 'bg-surface-container text-on-surface'
                    }`}
                    onClick={() => setSupportMode('call')}
                  >
                    <span className="material-symbols-outlined text-[20px]">call</span>
                    <span>Audio Callback</span>
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-label-md text-label-md text-primary font-semibold">Best Time Window</label>
                <select className="w-full bg-surface-container-lowest text-on-surface px-3 py-2.5 rounded-xl font-body-sm text-body-sm outline-none border border-surface-container-high">
                  <option>During lunch break (12:30 PM - 1:15 PM)</option>
                  <option>Right after dismissal (3:45 PM - 4:30 PM)</option>
                  <option>Immediate crisis urgent callback</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary text-on-primary font-title-md text-title-md font-bold shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Confirm Private Session</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Warden Network Modal */}
      {showWardenModal && (
        <div className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-md bg-surface rounded-t-3xl sm:rounded-2xl p-space-lg shadow-2xl flex flex-col gap-space-md animate-in fade-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <span className="font-title-md text-title-md text-primary font-bold">Student Safety Warden</span>
              </div>
              <button 
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                onClick={() => setShowWardenModal(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-title-md text-title-md text-primary font-bold">Make Your Route Safer</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Peer wardens participate in group bus-stop walking circles and flag dark spots along Anna Nagar & Guindy transit zones.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                <span>Certified first-responder workshop by TN Fire & Rescue</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                <span>Civic community certificate of volunteer service</span>
              </div>
            </div>
            <form onSubmit={handleWardenSubmit}>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-secondary text-on-secondary font-title-md text-title-md font-bold shadow-md hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                <span>Register as Route Warden</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
