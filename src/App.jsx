import React, { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { LandingPage } from './components/LandingPage';
import { ReportIssuePage } from './components/ReportIssuePage';
import { AnalysisPage } from './components/AnalysisPage';
import { GeneratedReportPage } from './components/GeneratedReportPage';
import { CommunityDashboard } from './components/CommunityDashboard';
import { SafetyResourcesPage } from './components/SafetyResourcesPage';
import { ToastProvider, useToast } from './components/Toast';
import { INITIAL_COMMUNITY_REPORTS, DEMO_REPORT } from './data/mockData';
import { analyzeReport } from './services/analysisService';
import { sanitizeText, loadReports, saveReports, resetReports } from './services/reportService';
import { LANGUAGES, t } from './lang';

const INITIAL_FORM_STATE = {
  category: '',
  location: '',
  description: '',
  urgency: 'Medium',
  imagePreview: null,
  imageName: '',
  isAnonymous: true,
  language: 'en',
};

const VALID_PAGES = new Set(['landing', 'report', 'analysis', 'generated-report', 'dashboard', 'resources', 'not-found']);
const HASH_ROUTES = {
  '#/': 'landing',
  '#/landing': 'landing',
  '#/report': 'report',
  '#/analysis': 'analysis',
  '#/generated-report': 'generated-report',
  '#/dashboard': 'dashboard',
  '#/resources': 'resources',
  '#/not-found': 'not-found',
};
const SESSION_KEY = 'kuralguard.session.v1';

function pageFromLocation() {
  const hash = window.location.hash || '';
  if (hash) {
    const clean = hash.replace(/^#\/?/, '').split('?')[0];
    if (!clean) return 'landing';
    return VALID_PAGES.has(clean) ? clean : 'not-found';
  }
  const pathname = (window.location.pathname || '').replace(/^\/|\/$/g, '');
  if (pathname) {
    const segment = pathname.split('/')[0];
    if (VALID_PAGES.has(segment)) return segment;
  }
  return null;
}

function hashForPage(page) {
  if (page === 'landing') return '#/';
  return `#/${page}`;
}

function readSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

function validPage(page) {
  return VALID_PAGES.has(page) ? page : 'landing';
}

function NotFoundPage({ lang, onHome, onReport, onResources }) {
  return (
    <div className="max-w-2xl mx-auto py-16 sm:py-24 text-center space-y-6">
      <div className="mx-auto w-16 h-16 rounded-2xl bg-surface-container-high border border-outline-variant flex items-center justify-center">
        <span className="material-symbols-outlined text-[32px] text-tertiary-fixed-dim">warning</span>
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
          {lang === 'ta' ? 'பக்கம் கிடைக்கவில்லை' : 'Page not found'}
        </h1>
        <p className="text-on-surface-variant text-sm sm:text-base">
          {lang === 'ta'
            ? 'நீங்கள் கோரிய பாதை இந்த டெமோவில் இல்லை. பாதுகாப்பான வழியில் தொடருங்கள்.'
            : 'The route you requested is not available in this demo. Continue through a safe path below.'}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onHome}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-on-primary bg-primary hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">home</span>
          <span>{t(lang, 'nav.home')}</span>
        </button>
        <button
          type="button"
          onClick={onReport}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-primary bg-surface-container border border-surface-container-high hover:bg-surface-container-highest transition-colors"
        >
          <span>{t(lang, 'nav.reportIssue')}</span>
        </button>
        <button
          type="button"
          onClick={onResources}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-on-surface bg-surface-container-low border border-surface-container hover:bg-surface-container transition-colors"
        >
          <span>{t(lang, 'docket.resources')}</span>
        </button>
      </div>
    </div>
  );
}

function MainApp() {
  const { showToast } = useToast();
  const [activePage, setActivePage] = useState(() => {
    const locPage = pageFromLocation();
    if (locPage) return locPage;
    const saved = readSession();
    return validPage(saved?.activePage || 'landing');
  });
  const [pageHistory, setPageHistory] = useState(() => [validPage(pageFromLocation() || readSession()?.activePage || 'landing')]);
  const [reports, setReports] = useState(() => loadReports(INITIAL_COMMUNITY_REPORTS));
  const [formData, setFormData] = useState(() => {
    const saved = readSession();
    return saved?.formData && typeof saved.formData === 'object' ? { ...INITIAL_FORM_STATE, ...saved.formData } : INITIAL_FORM_STATE;
  });
  const [currentReport, setCurrentReport] = useState(() => readSession()?.currentReport || null);
  const [lang, setLang] = useState(() => (readSession()?.lang === 'ta' ? 'ta' : 'en'));
  const [analysisError, setAnalysisError] = useState(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ activePage, formData, currentReport, reports, lang }));
    } catch {
      // Storage can be unavailable in private mode; the demo still works in memory.
    }
  }, [activePage, formData, currentReport, reports, lang]);

  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  useEffect(() => {
    const syncRoute = () => {
      const route = pageFromLocation();
      if (!route) return;
      setActivePage(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', syncRoute);
    window.addEventListener('popstate', syncRoute);
    return () => {
      window.removeEventListener('hashchange', syncRoute);
      window.removeEventListener('popstate', syncRoute);
    };
  }, []);

  const navigateTo = (pageId) => {
    const next = validPage(pageId);
    setPageHistory((prev) => [...prev, next]);
    setActivePage(next);
    try {
      const hash = hashForPage(next);
      if (window.location.hash !== hash) {
        window.location.hash = hash;
      }
    } catch {
      // Hash routing is progressive enhancement only.
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoBack = () => {
    if (activePage === 'generated-report') {
      navigateTo('analysis');
      return;
    }
    if (activePage === 'analysis') {
      navigateTo('report');
      return;
    }
    if (activePage === 'not-found') {
      navigateTo('landing');
      return;
    }
    if (pageHistory.length > 1) {
      const nextHistory = [...pageHistory];
      nextHistory.pop();
      const previous = validPage(nextHistory[nextHistory.length - 1] || 'landing');
      setPageHistory(nextHistory);
      setActivePage(previous);
      try {
        window.location.hash = hashForPage(previous);
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('landing');
    }
  };

  const buildReportFromForm = (form) => {
    const randomRef = `KG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const location = sanitizeText(form.location, 160);
    const description = sanitizeText(form.description, 1200);
    const analysis = analyzeReport({
      category: form.category,
      location,
      description,
      urgency: form.urgency,
    });
    const now = new Date();
    return {
      id: `KG-REPORT-${Date.now()}`,
      referenceId: randomRef,
      title: `${analysis.detectedCategory} Concern: ${location}`,
      category: analysis.detectedCategory,
      location,
      urgency: form.urgency,
      riskLevel: analysis.riskLevel,
      confidence: analysis.confidence,
      reason: analysis.reason,
      detectedCategory: analysis.detectedCategory,
      evidenceFactors: analysis.evidenceFactors,
      affectedCommunity: analysis.affectedCommunity,
      communityImprovements: analysis.communityImprovements,
      recommendedIntervention: analysis.recommendedIntervention,
      recommendedRecipientCategory: analysis.recommendedRecipientCategory,
      isDemoAnalysis: analysis.isDemoAnalysis,
      demoStatus: 'Demo data',
      language: form.language,
      isAnonymous: form.isAnonymous,
      reporterName: form.isAnonymous ? 'Anonymous Student Citizen' : 'Registered Resident',
      createdAt: now.toISOString(),
      status: 'Submitted',
      description,
      imagePreview: form.imagePreview,
      imageUrl: form.imagePreview,
      summary: analysis.summary,
      immediateSafetyAdvice: analysis.immediateSafetyAdvice,
      recommendedAction: analysis.recommendedAction,
      history: [
        { step: 'Draft', timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Logged' },
        { step: 'Submitted', timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), note: 'Demo AI-assisted analysis completed' },
      ],
    };
  };

  const handleStartReport = () => {
    setFormData(INITIAL_FORM_STATE);
    setAnalysisError(null);
    navigateTo('report');
  };

  const handleLoadDemo = () => {
    const heroForm = {
      category: 'Road Safety',
      location: 'Bharathi School Gate, Gandhi Road Junction, Ward 14',
      description: 'Vehicles speeding past school gate during morning & evening dispersal. There is no zebra crossing or caution signage, and blind corner makes crossing hazardous for students.',
      urgency: 'High',
      imagePreview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvxrlYn-KaEJj0uRBHzTsoXrsgGorCLQg_njLzYj3eL6C4nnED5cjvImkqqldWZoXrtH0AFe9E_sL57afwsQxjO-qfPKdThetxcVKnbLv9wsIaKb9GDO2eEU3VaQR_FAqXDgJ6VDytzoVsXm8AXXeU47Ce-kYv-vA6FJjLmx62joo9GKBdRHzymU9Ee3Y_oqbZgLOMejAnKixAxWfCqEA-AgIdzygZTwAs7oDF7lUQ',
      imageName: 'IMG_crossing_hazard_01.jpg',
      isAnonymous: true,
      language: 'ta',
    };
    setFormData(heroForm);
    setAnalysisError(null);
    setCurrentReport(DEMO_REPORT);
    navigateTo('analysis');
    showToast('Loaded Bharathi School crossing demo scenario!', 'success');
  };

  const handleResetDemo = () => {
    setReports(resetReports(INITIAL_COMMUNITY_REPORTS));
    setCurrentReport(null);
    setFormData(INITIAL_FORM_STATE);
    setAnalysisError(null);
    navigateTo('landing');
    showToast('Demo data reset to the original sample reports.', 'info');
  };

  const handlePrefillSample = () => {
    setFormData({
      category: 'Road Safety',
      location: "Near St. Anthony's Gate & Gandhi Road Junction, Ward 14",
      description: 'Vehicles speeding past school gate during morning & evening dispersal. There is no zebra crossing or caution signage, and blind corner makes crossing hazardous for students.',
      urgency: 'High',
      imagePreview: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvxrlYn-KaEJj0uRBHzTsoXrsgGorCLQg_njLzYj3eL6C4nnED5cjvImkqqldWZoXrtH0AFe9E_sL57afwsQxjO-qfPKdThetxcVKnbLv9wsIaKb9GDO2eEU3VaQR_FAqXDgJ6VDytzoVsXm8AXXeU47Ce-kYv-vA6FJjLmx62joo9GKBdRHzymU9Ee3Y_oqbZgLOMejAnKixAxWfCqEA-AgIdzygZTwAs7oDF7lUQ',
      imageName: 'IMG_crossing_hazard_01.jpg',
      isAnonymous: true,
      language: 'en',
    });
    showToast('Pre-filled Bharathi School crossing scenario!', 'info');
  };

  const handleProceedToAnalysis = () => {
    setAnalysisError(null);
    try {
      const newReport = buildReportFromForm(formData);
      setCurrentReport(newReport);
      navigateTo('analysis');
    } catch (error) {
      setAnalysisError('Demo AI-assisted analysis failed while preparing the safety brief. Please try again or go back and adjust the report details.');
      setCurrentReport(null);
      navigateTo('analysis');
      showToast('Analysis failed. Please retry.', 'error');
    }
  };

  const handleContinueToReport = () => {
    if (currentReport) {
      setReports((prev) => {
        const exists = prev.some((report) => report.id === currentReport.id);
        return exists ? prev : [currentReport, ...prev];
      });
    }
    navigateTo('generated-report');
  };

  const handleSubmitToCommunity = (newStatus) => {
    if (!currentReport) return;
    setCurrentReport((prev) => (prev ? { ...prev, status: newStatus } : prev));
    setReports((prev) => {
      const exists = prev.some((report) => report.id === currentReport.id);
      if (!exists) return [{ ...currentReport, status: newStatus }, ...prev];
      return prev.map((report) => (report.id === currentReport.id ? { ...report, status: newStatus } : report));
    });
  };

  const handleToggleResolve = (reportId, newStatus) => {
    setReports((prev) =>
      prev.map((report) => {
        if (report.id !== reportId) return report;
        return {
          ...report,
          status: newStatus,
          history: [
            ...(report.history || []),
            {
              step: newStatus,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              note: newStatus === 'Resolved' ? 'Civic repair verified' : 'Reopened for inspection',
            },
          ],
        };
      })
    );
    if (currentReport && currentReport.id === reportId) {
      setCurrentReport((prev) => ({ ...prev, status: newStatus }));
    }
  };

  const canGoBack = activePage !== 'landing';

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      <Navbar
        activePage={activePage}
        setActivePage={navigateTo}
        onLoadDemo={handleLoadDemo}
        canGoBack={canGoBack}
        onGoBack={handleGoBack}
        lang={lang}
        onLangChange={setLang}
      />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 md:pb-12">
        {activePage === 'landing' && (
          <LandingPage
            lang={lang}
            onLangChange={setLang}
            onStartReport={handleStartReport}
            onLoadDemo={handleLoadDemo}
            onExploreDashboard={() => navigateTo('dashboard')}
            onGoToResources={() => navigateTo('resources')}
          />
        )}

        {activePage === 'report' && (
          <ReportIssuePage
            lang={lang}
            formData={formData}
            setFormData={setFormData}
            onProceedToAnalysis={handleProceedToAnalysis}
            onPrefillSample={handlePrefillSample}
          />
        )}

        {activePage === 'analysis' && (
          <AnalysisPage
            lang={lang}
            formData={formData}
            analysisData={currentReport || DEMO_REPORT}
            analysisError={analysisError}
            onRetryAnalysis={handleProceedToAnalysis}
            onContinueToReport={handleContinueToReport}
            onBackToEdit={() => navigateTo('report')}
          />
        )}

        {activePage === 'generated-report' && (
          <GeneratedReportPage
            lang={lang}
            report={currentReport || DEMO_REPORT}
            onBackToAnalysis={() => navigateTo('analysis')}
            onSubmitToCommunity={handleSubmitToCommunity}
            onGoToDashboard={() => navigateTo('dashboard')}
            onGoToResources={() => navigateTo('resources')}
          />
        )}

        {activePage === 'dashboard' && (
          <CommunityDashboard
            lang={lang}
            reports={reports}
            onToggleResolve={handleToggleResolve}
            onStartNewReport={handleStartReport}
            onResetDemo={handleResetDemo}
            onViewReportDetails={(report) => {
              setCurrentReport(report);
              navigateTo('generated-report');
            }}
          />
        )}

        {activePage === 'resources' && <SafetyResourcesPage lang={lang} />}

        {activePage === 'not-found' && (
          <NotFoundPage
            lang={lang}
            onHome={() => navigateTo('landing')}
            onReport={() => navigateTo('report')}
            onResources={() => navigateTo('resources')}
          />
        )}
      </main>

      <footer className="border-t border-surface-container bg-surface-container-lowest/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-on-surface-variant">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-surface-container-high flex items-center justify-center p-0.5">
              <img
                src="/kuralguard-logo.png"
                alt="KuralGuard shield and community safety logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span>Civic MVP · Demonstration data only</span>
          </div>
          <span>For immediate danger, contact local emergency services first.</span>
        </div>
      </footer>

      <BottomNav activePage={activePage} setActivePage={navigateTo} lang={lang} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <MainApp />
      </ToastProvider>
    </ErrorBoundary>
  );
}
