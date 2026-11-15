import React, { useState } from 'react';
import { useToast } from './Toast';
import { t } from '../lang';

export function GeneratedReportPage({ 
  lang = 'en',
  report, 
  onBackToAnalysis, 
  onSubmitToCommunity,
  onGoToDashboard,
  onGoToResources
}) {
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(report?.status || 'Submitted');

  const riskLevel = report?.riskLevel || report?.urgency || 'Moderate';

  const getRiskBadge = (level) => {
    if (level === 'High') {
      return {
        bg: 'bg-error-container',
        text: 'text-on-error-container',
        label: 'HIGH RISK',
        icon: 'warning'
      };
    }
    if (level === 'Moderate' || level === 'Medium') {
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        label: 'MEDIUM RISK',
        icon: 'warning'
      };
    }
    return {
      bg: 'bg-teal-50',
      text: 'text-teal-800',
      label: 'LOW RISK',
      icon: 'check_circle'
    };
  };

  const badge = getRiskBadge(riskLevel);

  const generateFormattedText = () => {
    return `==========================================================
KURALGUARD COMMUNITY SAFETY BRIEF (DEMO)
Reference ID: ${report?.referenceId || 'KG-2026-8841'}
Timestamp: ${new Date(report?.createdAt || Date.now()).toLocaleString()}
Status: ${currentStatus.toUpperCase()}
==========================================================

[ISSUE TITLE]
${report?.title || 'Civic Safety Concern'}

[CLASSIFICATION]
Category: ${report?.category || 'General Safety'}
Assessed Risk Level: ${riskLevel.toUpperCase()}
Reporter: ${report?.isAnonymous ? 'Anonymous Student Citizen (Protected)' : (report?.reporterName || 'Registered Student')}
Location / Coordinates: ${report?.location || 'Unspecified'}

[SITUATION SUMMARY]
${report?.summary || report?.description}

[FULL FIELD OBSERVATION]
${report?.description || 'N/A'}

[DEMO AI-ASSISTED ANALYSIS]
Evidence factors: ${(report?.evidenceFactors || []).join('; ') || 'N/A'}
Affected community: ${report?.affectedCommunity || 'N/A'}
Recommended intervention: ${report?.recommendedIntervention || report?.recommendedAction || 'N/A'}
Community improvements: ${(report?.communityImprovements || []).join('; ') || 'N/A'}
Confidence: ${typeof report?.confidence === 'number' ? `${Math.round(report.confidence * 100)}%` : 'N/A'}
Demo status: ${report?.demoStatus || 'Demo data'}

[IMMEDIATE FIELD SAFETY GUIDANCE]
${(report?.immediateSafetyAdvice || []).map((step, idx) => `${idx + 1}. ${step}`).join('\n')}

[RECOMMENDED CIVIC / MUNICIPAL ACTION]
${report?.recommendedAction || 'Escalation to designated Ward Officer'}

==========================================================
Generated via KuralGuard demo — simulated status only.
No report was submitted to any authority.
==========================================================`;
  };

  const handleCopyReport = async () => {
    try {
      const text = generateFormattedText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast('Civic docket copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      showToast('Failed to copy. Please select and copy manually.', 'error');
    }
  };

  const handleDownloadReport = () => {
    try {
      const text = generateFormattedText();
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `KuralGuard_Docket_${report?.referenceId || 'Report'}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('Docket downloaded successfully (.txt)', 'success');
    } catch (e) {
      showToast('Error preparing download file.', 'error');
    }
  };

  const handleShareReport = async () => {
    const shareData = {
      title: `KuralGuard Safety Docket: ${report?.title}`,
      text: `Civic Alert [${riskLevel} Risk] at ${report?.location}. Reference ID: ${report?.referenceId || 'KG-2026-8841'}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        showToast('Shared successfully!', 'success');
      } catch (err) {
        // User aborted share or not supported
      }
    } else {
      await navigator.clipboard.writeText(`${window.location.origin}?docket=${report?.referenceId || 'KG-2026-8841'}`);
      showToast('Shareable docket link copied to clipboard!', 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const timelineSteps = ['Draft', 'Submitted', 'Verified', 'Resolved'];
  const currentStepIndex = timelineSteps.indexOf(currentStatus);

  const handleAdvanceStatus = (newStatus) => {
    setCurrentStatus(newStatus);
    if (onSubmitToCommunity) {
      onSubmitToCommunity(newStatus);
    }
    showToast(`Docket status updated to "${newStatus}"`, 'success');
  };

  return (
    <div className="flex flex-col gap-space-lg pt-16 px-gutter-mobile pb-28">
      
      {/* Progress Stepper Header (Describe → Analyze → Act) */}
      <div className="bg-surface-container-lowest shadow-sm rounded-xl p-3">
        <div className="flex items-center justify-between gap-space-xs mb-2">
          {/* Step 1 */}
          <div className="flex items-center gap-1.5 text-secondary">
            <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-sm">
              ✓
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-primary font-bold">Describe</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant leading-none">விவரம்</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>

          {/* Step 2 */}
          <div className="flex items-center gap-1.5 text-secondary">
            <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-sm">
              ✓
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-primary font-bold">Analyze</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant leading-none">பகுப்பாய்வு</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[16px] text-outline-variant">chevron_right</span>

          {/* Step 3 */}
          <div className="flex items-center gap-1.5 text-primary">
            <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold shadow-sm ring-2 ring-primary-fixed">
              3
            </div>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-primary font-bold">Act</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant leading-none">நடவடிக்கை</span>
            </div>
          </div>
        </div>
        {/* Progress Meter (100%) */}
        <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
          <div className="h-full bg-secondary rounded-full w-full transition-all duration-300"></div>
        </div>
      </div>

      {/* Title & Delight Header */}
      <div className="flex flex-col gap-space-xs text-left">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-label-md font-label-md">
          <span className="material-symbols-outlined text-[16px] text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
            verified
          </span>
          <span>Civic Dispatch Ready</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold tracking-tight">
          Your Community Safety Brief is Ready
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Generated for Ward 14 Road Safety Committee & School Community
        </p>
      </div>

      {/* Status Lifecycle Stepper */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            Civic Escalation Lifecycle
          </span>
          <span className="font-label-sm text-[10px] text-on-surface-variant font-semibold">
            Status: {currentStatus}
          </span>
        </div>
        <div className="flex items-center justify-between text-center relative">
          <div className="absolute left-6 right-6 top-3.5 h-[2px] bg-surface-container -z-0"></div>
          
          {timelineSteps.map((step, idx) => {
            const isPast = currentStepIndex > idx;
            const isCurrent = currentStepIndex === idx;

            return (
              <div key={step} className="flex flex-col items-center gap-1 relative z-10 flex-1">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-xs ${
                  isPast
                    ? 'bg-secondary text-on-secondary'
                    : isCurrent
                    ? 'bg-primary text-on-primary shadow-md ring-4 ring-primary-fixed'
                    : 'bg-surface-container text-outline'
                }`}>
                  {isPast ? (
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  ) : isCurrent ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim"></span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-outline"></span>
                  )}
                </div>
                <span className={`font-label-sm text-label-sm ${
                  isCurrent ? 'text-primary font-bold' : isPast ? 'text-on-surface-variant' : 'text-outline'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Civic Document Card */}
      <article className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-md flex flex-col gap-space-md relative overflow-hidden">
        
        {/* Document Security Header */}
        <div className="flex items-start justify-between gap-space-sm pb-space-sm bg-surface-container-low -mx-space-md -mt-space-md p-space-md">
          <div className="flex items-center gap-space-sm min-w-0">
            <img
              src="/kuralguard-logo.png"
              alt="KuralGuard Official Seal"
              className="w-12 h-12 object-contain rounded-lg flex-shrink-0 bg-surface-container-lowest p-1 shadow-sm"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[14px]">policy</span>
                <span className="tracking-wider uppercase">Doc Ref #{report?.referenceId || 'KG-2025-0842'}</span>
              </div>
              <span className="font-label-md text-label-md text-primary font-semibold truncate">
                Authorized Civic Record • Public Document
              </span>
            </div>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container-high text-primary flex-shrink-0">
            Tamper-Evident
          </span>
        </div>

        {/* Document Main Title */}
        <div className="flex flex-col gap-1">
          <h2 className="font-title-md text-title-md text-primary tracking-tight font-bold">
            COMMUNITY SAFETY BRIEF: {report?.title || 'HAZARDOUS SCHOOL CROSSING'}
          </h2>
          <p className="font-label-md text-label-md text-on-surface-variant font-medium">
            சமூக பாதுகாப்பு அறிக்கை: பள்ளி வழிப்பாதை அபாயம்
          </p>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 gap-space-sm p-space-sm rounded-lg bg-surface-container-low text-left">
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Category / பிரிவு</span>
            <span className="font-label-lg text-label-lg text-primary truncate">{report?.category || 'Road Safety'}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Risk Level / நிலை</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
              <span className="font-label-lg text-label-lg text-error font-bold">{badge.label}</span>
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Location / இடம்</span>
            <span className="font-label-lg text-label-lg text-primary truncate">{report?.location || 'Unspecified'}</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Timestamp / நேரம்</span>
            <span className="font-label-lg text-label-lg text-primary truncate">
              {new Date(report?.createdAt || Date.now()).toLocaleString()}
            </span>
          </div>
          <div className="col-span-2 flex flex-col min-w-0 pt-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Source / தகவல் அளித்தவர்</span>
            <span className="font-label-lg text-label-lg text-primary flex items-center gap-1 truncate">
              <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
              {report?.isAnonymous ? 'Anonymous Student Community Member (Verified Submission)' : 'Registered Student'}
            </span>
          </div>
        </div>

        {/* Section 1: Summary & Observed Evidence */}
        <div className="flex flex-col gap-1.5 text-left">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[18px] text-secondary">fact_check</span>
            <h3 className="font-label-lg text-label-lg font-bold uppercase tracking-wider">1. Summary & Observed Evidence</h3>
          </div>
          <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-2 font-body-sm text-body-sm text-on-surface">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-error flex-shrink-0 mt-0.5">warning</span>
              <span>{report?.summary || report?.description || 'Designated high-density primary school perimeter with zero active speed calming systems.'}</span>
            </div>
          </div>
        </div>

        {/* Section 2: Affected Community */}
        <div className="flex flex-col gap-1.5 text-left">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[18px] text-secondary">groups</span>
            <h3 className="font-label-lg text-label-lg font-bold uppercase tracking-wider">2. Affected Community Demographics</h3>
          </div>
          <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary font-bold">450+ Daily</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Primary students, staff, and senior pedestrian escorts at immediate risk.</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-[20px]">school</span>
            </div>
          </div>
        </div>

        {/* Section 3: Immediate Safety Protocol */}
        <div className="flex flex-col gap-1.5 text-left">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">shield</span>
            <h3 className="font-label-lg text-label-lg font-bold uppercase tracking-wider">3. Immediate Safety Protocol</h3>
          </div>
          <div className="p-space-sm rounded-lg bg-tertiary-fixed/30 text-on-tertiary-fixed flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[20px] text-tertiary-container flex-shrink-0 mt-0.5">crisis_alert</span>
            <p className="font-body-sm text-body-sm font-medium">
              {(report?.immediateSafetyAdvice || []).join(' ')}
            </p>
          </div>
        </div>

        {/* Section 4: Recommended Civic Interventions */}
        <div className="flex flex-col gap-1.5 text-left">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[18px] text-secondary">engineering</span>
            <h3 className="font-label-lg text-label-lg font-bold uppercase tracking-wider">4. Recommended Civic Interventions</h3>
          </div>
          <div className="p-space-sm rounded-lg bg-surface-container-low text-on-surface flex flex-col gap-2 font-body-sm text-body-sm">
            {(report?.communityImprovements || []).map((improvement, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-secondary flex-shrink-0">send</span>
                <span>{improvement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sign-off & Watermark Footer */}
        <div className="pt-space-sm flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">encrypted</span>
            <span>Cryptographically Timestamped</span>
          </div>
          <span className="font-mono text-[10px] text-outline">HASH: 8F9B..41C0</span>
        </div>

      </article>

      {/* Civic Action Bar / Utility Buttons */}
      <div className="flex flex-col gap-space-xs">
        <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-left">Civic Distribution Utilities</span>
        <div className="grid grid-cols-2 gap-space-sm">
          <button
            onClick={handleCopyReport}
            title="Copy entire formatted docket text"
            aria-label="Copy entire formatted docket text"
            className="min-h-[48px] px-space-sm py-2 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-all shadow-xs flex items-center justify-center gap-2 font-label-lg text-label-lg active:scale-95 text-left"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">
              {copied ? 'check_circle' : 'content_copy'}
            </span>
            <span>{copied ? 'Copied' : 'Copy Brief Text'}</span>
          </button>

          <button
            onClick={handleDownloadReport}
            title="Download text report"
            aria-label="Download text report"
            className="min-h-[48px] px-space-sm py-2 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-all shadow-xs flex items-center justify-center gap-2 font-label-lg text-label-lg active:scale-95 text-left"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">download</span>
            <span>Download PDF</span>
          </button>

          <button
            onClick={handleShareReport}
            title="Share report docket"
            aria-label="Share report docket"
            className="min-h-[48px] px-space-sm py-2 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-all shadow-xs flex items-center justify-center gap-2 font-label-lg text-label-lg active:scale-95 text-left"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">share</span>
            <span>Share via App</span>
          </button>

          <button
            onClick={handlePrint}
            title="Print entire civic docket"
            aria-label="Print entire civic docket"
            className="min-h-[48px] px-space-sm py-2 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-all shadow-xs flex items-center justify-center gap-2 font-label-lg text-label-lg active:scale-95 text-left"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">print</span>
            <span>Print Brief</span>
          </button>
        </div>
      </div>

      {/* Primary Navigation CTA */}
      <div className="flex flex-col gap-space-xs pt-space-xs pb-space-lg">
        <button
          onClick={onGoToDashboard}
          className="w-full min-h-[52px] rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-space-xs font-label-lg text-label-lg font-bold group active:scale-[0.99]"
        >
          <span>Open Community Dashboard to Track Status</span>
          <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
        </button>
        <p className="text-center font-label-sm text-label-sm text-on-surface-variant">
          Updates will be broadcast directly to verified Ward 14 residents and school safety wardens.
        </p>
      </div>

    </div>
  );
}
