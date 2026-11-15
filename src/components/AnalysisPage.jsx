import React, { useState, useEffect } from 'react';
import { t } from '../lang';

export function AnalysisPage({ 
  lang = 'en',
  formData, 
  analysisData, 
  analysisError,
  onRetryAnalysis,
  onContinueToReport, 
  onBackToEdit 
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    setLoadingStep(0);

    const step1 = setTimeout(() => setLoadingStep(1), 350);
    const step2 = setTimeout(() => setLoadingStep(2), 700);
    const step3 = setTimeout(() => setLoadingStep(3), 1050);
    const done = setTimeout(() => setIsLoading(false), 1400);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(done);
    };
  }, [formData]);

  const riskLevel = analysisData?.riskLevel || formData.urgency || 'Moderate';

  const getRiskBadge = (level) => {
    if (level === 'High') {
      return {
        bg: 'bg-error-container',
        text: 'text-on-error-container',
        border: 'border-error',
        label: 'HIGH RISK',
        icon: 'warning'
      };
    }
    if (level === 'Moderate' || level === 'Medium') {
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-300',
        label: 'MEDIUM RISK',
        icon: 'warning'
      };
    }
    return {
      bg: 'bg-teal-50',
      text: 'text-teal-800',
      border: 'border-teal-300',
      label: 'LOW RISK',
      icon: 'check_circle'
    };
  };

  const badge = getRiskBadge(riskLevel);

  return (
    <div className="flex flex-col gap-space-lg pt-16 px-gutter-mobile pb-28">
      
      {/* Step Indicator Header */}
      <div className="bg-surface-container-lowest shadow-sm">
        <div className="flex items-center justify-between gap-space-xs mb-2">
          {/* Step 1 */}
          <button 
            onClick={onBackToEdit}
            className="flex items-center gap-1.5 text-secondary hover:text-secondary-container transition-colors"
          >
            <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-sm">
              ✓
            </span>
            <span className="font-label-md text-label-md text-secondary font-bold">Describe</span>
          </button>
          <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>

          {/* Step 2 */}
          <div className="flex items-center gap-1.5 text-secondary font-bold">
            <span className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-sm">
              2
            </span>
            <span className="font-label-md text-label-md text-secondary font-bold">Analyze</span>
          </div>
          <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>

          {/* Step 3 */}
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <span className="w-6 h-6 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center font-label-sm text-label-sm font-semibold">
              3
            </span>
            <span className="font-label-md text-label-md text-on-surface-variant font-medium">Act</span>
          </div>
        </div>
        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-secondary rounded-full w-2/3 transition-all duration-300"></div>
        </div>
      </div>

      {/* Loading State */}
      {analysisError ? (
        <div className="bg-surface-container-lowest rounded-xl p-8 sm:p-10 space-y-5">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[24px] text-tertiary-fixed-dim flex-shrink-0 mt-0.5">error</span>
            <div className="space-y-1">
              <h2 className="font-title-md text-title-md text-primary font-bold">Analysis Failed</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{analysisError}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onBackToEdit}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-on-surface bg-surface-container hover:bg-surface-container-high border border-surface-container-high transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Edit</span>
            </button>
            <button
              type="button"
              onClick={onRetryAnalysis}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-on-primary bg-primary hover:bg-primary-container transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-[18px]">refresh</span>
              <span>Retry Analysis</span>
            </button>
          </div>
        </div>
      ) : isLoading ? (
        <div className="bg-surface-container-lowest rounded-xl p-8 sm:p-12 space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center p-1.5">
              <img
                src="/kuralguard-logo.png"
                alt="KuralGuard shield and community safety logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-2 flex-1">
              <div className="h-5 bg-surface-container-high rounded w-1/3 animate-pulse"></div>
              <div className="h-3 bg-surface-container rounded w-1/2 animate-pulse"></div>
            </div>
          </div>

          <div className="bg-surface-container-low border border-surface-container-high rounded-xl p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface">
              <span className="material-symbols-outlined text-[16px] text-secondary animate-spin">sync</span>
              <span>Analyzing civic safety indicators:</span>
            </div>
            <div className="space-y-1.5 text-xs text-on-surface-variant pl-6">
              <div className={loadingStep >= 1 ? 'text-secondary font-medium' : 'opacity-40'}>
                ✓ Cross-referencing hazard velocity & environmental factors...
              </div>
              <div className={loadingStep >= 2 ? 'text-secondary font-medium' : 'opacity-40'}>
                ✓ Formulating immediate de-escalation protocols...
              </div>
              <div className={loadingStep >= 3 ? 'text-secondary font-medium' : 'opacity-40'}>
                ✓ Synthesizing municipal dispatch recommendations...
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-24 bg-surface-container rounded-xl animate-pulse"></div>
            <div className="h-32 bg-surface-container rounded-xl animate-pulse"></div>
            <div className="h-20 bg-surface-container rounded-xl animate-pulse"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Interactive Top Banner & Disclaimer */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-secondary-container" style={{ fontVariationSettings: '"FILL" 1' }}>
                  bolt
                </span>
                <span className="font-label-sm text-label-sm tracking-wide">Demo AI-assisted analysis</span>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Model v2.4 Live</span>
              </div>
            </div>

            <h1 className="font-headline-sm text-headline-sm text-primary font-bold">
              Safety Assessment & Hazard Triage
            </h1>

            <div className="bg-surface-container-low p-space-sm rounded-xl flex items-start gap-space-xs shadow-sm">
              <span className="material-symbols-outlined text-[18px] text-outline flex-shrink-0 mt-0.5">info</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug">
                <strong className="font-semibold text-primary">AI Estimation Disclaimer: </strong>
                This is an AI-assisted demo estimate and should not replace verified emergency services or professional civic judgment.
              </p>
            </div>
          </div>

          {/* Main Intelligence Core Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col gap-space-md relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>

            {/* Category & High Risk Header */}
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex items-center gap-space-xs">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                  <span className="material-symbols-outlined text-[24px]">traffic</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Detected Hazard</span>
                  <span className="font-title-md text-title-md text-on-surface font-bold truncate">{analysisData?.detectedCategory || formData.category || 'General Safety'}</span>
                </div>
              </div>
              <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full ${badge.bg} ${badge.text} font-label-md text-label-md flex-shrink-0 shadow-sm animate-pulse`}>
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: '"FILL" 1' }}>{badge.icon}</span>
                <span>{badge.label}</span>
              </div>
            </div>

            {/* Confidence Gauge */}
            <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-space-xs">
              <div className="flex items-center justify-between font-label-sm text-label-sm">
                <span className="text-on-surface font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                  Confidence Estimate: {typeof analysisData?.confidence === 'number' ? Math.round(analysisData.confidence * 100) : 94}%
                </span>
                <span className="text-on-surface-variant">Evidence Verified</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full rounded-full bg-secondary-container transition-all duration-700" style={{ width: typeof analysisData?.confidence === 'number' ? `${analysisData.confidence * 100}%` : '94%' }}></div>
              </div>
            </div>
          </div>

          {/* Section: What We Detected */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-1.5 text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-secondary">radar</span>
              <h2 className="font-headline-sm text-headline-sm font-bold">What we detected</h2>
            </div>
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm text-on-surface font-body-md text-body-md leading-relaxed">
              {analysisData?.summary || `Identified ${formData.category} hazard near ${formData.location || 'the specified location'}. Physical conditions present an elevated risk of injury or disruption to commuters.`}
            </div>
          </div>

          {/* Section: Why This Risk Level */}
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-on-surface">
                <span className="material-symbols-outlined text-[20px] text-secondary">analytics</span>
                <h2 className="font-headline-sm text-headline-sm font-bold">Why This Risk Level</h2>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">{(analysisData?.evidenceFactors || []).length} Contributing Factors</span>
            </div>
            <div className="grid grid-cols-1 gap-space-xs">
              {(analysisData?.evidenceFactors || []).map((factor, idx) => (
                <div key={idx} className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex items-start gap-space-sm">
                  <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">report_problem</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-md text-label-md text-on-surface font-bold">{factor}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Affected Community */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-1.5 text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-secondary">groups</span>
              <h2 className="font-headline-sm text-headline-sm font-bold">Affected Community</h2>
            </div>
            <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between gap-space-md">
              <div className="flex flex-col min-w-0">
                <span className="font-body-md text-body-md text-on-surface font-medium leading-normal">
                  {analysisData?.affectedCommunity || 'Local community members'}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center px-3 py-2 rounded-xl bg-surface-container-low flex-shrink-0 text-center">
                <span className="font-headline-md text-headline-md text-primary font-extrabold leading-none">~450</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Daily Crossings</span>
              </div>
            </div>
          </div>

          {/* Section: What To Do Now */}
          <div className="flex flex-col gap-space-sm">
            <div className="bg-primary text-on-primary rounded-xl p-space-md shadow-lg flex flex-col gap-space-sm relative overflow-hidden">
              <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-[110px] text-on-primary/10 select-none pointer-events-none">
                shield_with_heart
              </span>
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                  <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: '"FILL" 1' }}>security</span>
                  Immediate Action
                </div>
                <span className="text-on-primary-container font-label-sm text-label-sm">அடுத்த பாதுகாப்பான செயல்</span>
              </div>
              <h3 className="font-title-md text-title-md font-bold leading-tight">
                Safe Crossing Protocol Active
              </h3>
              <div className="bg-primary-container p-space-sm rounded-lg flex items-start gap-space-xs">
                <span className="material-symbols-outlined text-secondary-container text-[22px] flex-shrink-0">navigation</span>
                <p className="font-body-md text-body-md text-surface-container-high leading-snug">
                  <strong className="text-on-primary">Avoid crossing alone.</strong> Use the traffic-warden assisted junction <span className="text-secondary-fixed-dim underline underline-offset-2">120m north</span> near Main Gate. Cross only in monitored cohorts. In an immediate danger or acute transit hazard, dial 112 for Police Rapid Response or 108 for Emergency Medical Assistance.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Recommended Community Action */}
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-on-surface">
                <span className="material-symbols-outlined text-[20px] text-secondary">handshake</span>
                <h2 className="font-headline-sm text-headline-sm font-bold">Recommended Community Action</h2>
              </div>
            </div>
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Collaborative steps scheduled for submission to the Ward Councillor and Road Safety Cell:
              </p>
              <div className="flex flex-col gap-space-xs">
                {(analysisData?.communityImprovements || []).map((improvement, idx) => (
                  <label key={idx} className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors">
                    <div className="w-5 h-5 rounded-md bg-primary text-on-primary flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                      <span className="material-symbols-outlined text-[15px]">check</span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-label-md text-on-surface font-bold">{improvement}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation & Primary Action Buttons */}
          <div className="flex flex-col gap-space-sm">
            <button
              onClick={onContinueToReport}
              aria-label="Create Safety Brief"
              className="w-full py-3.5 px-space-md rounded-xl bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center gap-space-xs shadow-lg active:scale-[0.99] transition-transform"
            >
              <span>Create Safety Brief</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <button
              onClick={onBackToEdit}
              className="w-full py-2.5 text-center font-label-md text-label-md text-secondary hover:text-primary transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to Edit</span>
            </button>
          </div>

        </>
      )}

    </div>
  );
}
