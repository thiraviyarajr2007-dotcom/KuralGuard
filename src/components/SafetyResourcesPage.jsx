import React from 'react';
import { SAFETY_RESOURCES } from '../data/mockData';
import { t } from '../lang';

export function SafetyResourcesPage({ lang = 'en' }) {
  return (
    <div className="flex flex-col gap-space-lg pt-16 px-gutter-mobile pb-28">
      
      {/* Top Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-semibold">
          <div className="w-4 h-4 rounded bg-surface-container-high flex items-center justify-center p-0.5">
            <img
              src="/kuralguard-logo.png"
              alt="KuralGuard shield and community safety logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span>Verified National & Regional Helplines</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold tracking-tight">
          {t(lang, 'resources.title')}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Immediate contacts for students, campus residents, and community members facing critical hazards or emergency situations.
        </p>
      </div>

      {/* Resource Categories */}
      <div className="flex flex-col gap-space-sm">
        {SAFETY_RESOURCES.map((category, catIdx) => (
          <div key={catIdx} className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[24px] text-secondary">{category.icon}</span>
              <h2 className="font-title-md text-title-md text-primary font-bold">{category.name}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {category.contacts.map((contact, idx) => (
                <div
                  key={idx}
                  className="bg-surface-container-low p-3 rounded-lg flex items-start gap-3 hover:bg-surface-container transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">{contact.type === 'phone' ? 'phone' : contact.type === 'email' ? 'email' : 'language'}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-label-md text-label-md text-primary font-bold">{contact.name}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{contact.description}</p>
                    {contact.number && (
                      <a
                        href={`tel:${contact.number}`}
                        className="font-label-sm text-label-sm text-secondary hover:underline mt-1 block"
                      >
                        {contact.number}
                      </a>
                    )}
                    {contact.email && (
                      <a
                        href={`mailto:${contact.email}`}
                        className="font-label-sm text-label-sm text-secondary hover:underline mt-1 block"
                      >
                        {contact.email}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Notice */}
      <div className="bg-error-container/30 rounded-xl p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-[24px] text-error flex-shrink-0">warning</span>
        <div>
          <h3 className="font-title-md text-title-md text-error font-bold">Emergency Notice</h3>
          <p className="font-body-sm text-body-sm text-on-error-container mt-1">
            For immediate danger, call emergency services first (112 in India, 911 in US). These resources are for non-emergency civic coordination and support.
          </p>
        </div>
      </div>

    </div>
  );
}
