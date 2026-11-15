import React, { useState, useMemo } from 'react';
import { t } from '../lang';

export function CommunityDashboard({ 
  lang = 'en',
  reports, 
  onToggleResolve, 
  onStartNewReport, 
  onResetDemo,
  onViewReportDetails 
}) {
  const [filter, setFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectReport, setInspectReport] = useState(null);

  const filteredReports = useMemo(() => {
    let result = reports.filter(report => {
      // 1. Text Search Query
      const matchesSearch = !searchQuery || 
        report.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.category?.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // 2. Status or Category Filter
      let matchesFilter = true;
      if (filter === 'all') {
        matchesFilter = true;
      } else if (filter === 'resolved') {
        matchesFilter = report.status === 'Resolved';
      } else if (filter === 'pending') {
        matchesFilter = report.status !== 'Resolved';
      } else if (filter === 'road safety') {
        matchesFilter = report.category === 'Road Safety' || report.category?.toLowerCase().includes('road');
      } else if (filter === 'public lighting') {
        matchesFilter = report.category === 'Public Lighting' || report.category?.toLowerCase().includes('light');
      } else if (filter === 'flooding') {
        matchesFilter = report.category === 'Flooding' || report.category?.toLowerCase().includes('flood');
      } else if (filter === "women's safety") {
        matchesFilter = report.category?.includes("Women") || report.category?.toLowerCase().includes('women');
      } else if (filter === 'sanitation') {
        matchesFilter = report.category === 'Waste and Sanitation' || report.category?.toLowerCase().includes('waste') || report.category?.toLowerCase().includes('sanitation');
      } else {
        matchesFilter = report.category?.toLowerCase() === filter.toLowerCase();
      }
      if (!matchesFilter) return false;

      // 3. Severity Filter
      if (severityFilter === 'high') {
        return report.riskLevel === 'High' || report.urgency === 'High';
      } else if (severityFilter === 'med') {
        return report.riskLevel === 'Medium' || report.urgency === 'Medium' || report.riskLevel === 'Moderate';
      } else if (severityFilter === 'low') {
        return report.riskLevel === 'Low' || report.urgency === 'Low';
      }

      return true;
    });

    if (sortBy === 'urgency') {
      const urgencyScore = { High: 3, Medium: 2, Moderate: 2, Low: 1 };
      result.sort((a, b) => (urgencyScore[b.riskLevel || b.urgency] || 0) - (urgencyScore[a.riskLevel || a.urgency] || 0));
    }
    return result;
  }, [reports, filter, searchQuery, severityFilter, sortBy]);

  const stats = useMemo(() => ({
    total: reports.length,
    highRisk: reports.filter(r => r.riskLevel === 'High' || r.urgency === 'High').length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
    topCategory: reports.length > 0 ? reports[0].category : 'N/A',
  }), [reports]);

  return (
    <div className="flex flex-col gap-space-md pt-16 px-gutter-mobile pb-28">
      
      {/* Header Banner Section */}
      <div className="flex flex-col space-y-space-xs pt-space-sm">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-fixed text-label-sm font-label-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
            Ward 14 • SafeZones Watch
          </div>
          <span className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">sync</span>
            Live Feed
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-extrabold">
          Community Safety Priority
        </h1>
        <div className="text-xs font-bold text-secondary uppercase tracking-wider">
          Community Safety Registry
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Live community reports and civic action queue for Ward 14 & school zones.
        </p>
      </div>

      {/* Metric Summary Bento Grid */}
      <div className="grid grid-cols-2 gap-space-sm">
        {/* Card 1: Total Reports */}
        <div className="bg-white bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between space-y-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Total Reports</span>
            <div className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[16px]">folder_open</span>
            </div>
          </div>
          <div>
            <div className="text-4xl font-headline-md text-headline-md text-primary font-bold">{stats.total}</div>
            <div className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-semibold">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +{Math.floor(stats.total * 0.1)} this week
            </div>
          </div>
        </div>

        {/* Card 2: High Risk */}
        <div className="bg-white bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between space-y-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">High-Risk Issues</span>
            <div className="w-7 h-7 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">crisis_alert</span>
            </div>
          </div>
          <div>
            <div className="text-4xl font-headline-md text-headline-md text-error font-bold">{stats.highRisk}</div>
            <span className="inline-block px-2 py-0.5 rounded-full bg-error-container/60 text-on-error-container text-label-sm font-label-sm font-bold">
              Urgent Action
            </span>
          </div>
        </div>

        {/* Card 3: Resolved */}
        <div className="bg-white bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between space-y-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Resolved Reports</span>
            <div className="w-7 h-7 rounded-full bg-secondary-container/40 text-on-secondary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
            </div>
          </div>
          <div>
            <div className="text-4xl font-headline-md text-headline-md text-secondary font-bold">{stats.resolved}</div>
            <span className="inline-block px-2 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-container text-label-sm font-label-sm font-bold">
              {Math.round((stats.resolved / stats.total) * 100)}% cleared
            </span>
          </div>
        </div>

        {/* Card 4: Most Common */}
        <div className="bg-white bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex flex-col justify-between space-y-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Category Breakdown</span>
            <div className="w-7 h-7 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">traffic</span>
            </div>
          </div>
          <div>
            <div className="font-headline-sm text-headline-sm text-primary font-bold truncate">{stats.topCategory}</div>
            <div className="font-label-sm text-label-sm text-on-tertiary-container font-semibold">
              {Math.round((reports.filter(r => r.category === stats.topCategory).length / stats.total) * 100)}% of concerns
            </div>
          </div>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="space-y-space-xs">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports by title, keyword, location, or school name..."
            className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline text-body-sm font-body-sm rounded-xl py-3 pl-10 pr-4 shadow-sm focus:outline-none focus:bg-surface-container-low transition-all"
          />
        </div>

        {/* Category Horizontal Scroll Chips */}
        <div className="flex items-center gap-space-xs overflow-x-auto py-1.5 no-scrollbar -mx-gutter-mobile px-gutter-mobile">
          <button
            onClick={() => setFilter('all')}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-full font-label-md text-label-md shadow-xs ${
              filter === 'all' ? 'bg-surface-container-high text-on-surface' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            All
          </button>
          {['Road Safety', 'Public Lighting', 'Flooding', "Women's Safety", 'Sanitation'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat.toLowerCase())}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full font-label-md text-label-md shadow-xs ${
                filter === cat.toLowerCase() ? 'bg-primary text-on-primary shadow-sm flex items-center gap-1.5' : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat}
              {filter === cat.toLowerCase() && <span className="w-2 h-2 rounded-full bg-secondary-container"></span>}
            </button>
          ))}
        </div>

        {/* Severity & Sorting Filter Row */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSeverityFilter(prev => prev === 'high' ? 'all' : 'high')}
              className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 transition-all ${
                severityFilter === 'high'
                  ? 'bg-error text-on-error shadow-xs ring-2 ring-error'
                  : 'bg-error-container text-on-error-container hover:opacity-90'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
              High Risk
            </button>
            <button
              type="button"
              onClick={() => setSeverityFilter(prev => prev === 'med' ? 'all' : 'med')}
              className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                severityFilter === 'med'
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Med
            </button>
            <button
              type="button"
              onClick={() => setSeverityFilter(prev => prev === 'low' ? 'all' : 'low')}
              className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                severityFilter === 'low'
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Low
            </button>
          </div>
          <button
            type="button"
            onClick={() => setSortBy(prev => prev === 'urgency' ? 'newest' : 'urgency')}
            className="flex items-center gap-1 text-on-surface-variant hover:text-primary font-label-sm text-label-sm transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-secondary">swap_vert</span>
            <span className="truncate">{sortBy === 'urgency' ? 'Priority Order (Urgency)' : 'Urgency & Proximity'}</span>
          </button>
        </div>
      </div>

      {/* Priority Queue Incident Cards Section */}
      <div className="space-y-space-md pt-space-xs">
        <div className="flex items-center justify-between">
          <span className="font-title-md text-title-md text-primary font-bold">Active Priority Incidents</span>
          <span className="font-label-sm text-label-sm text-secondary font-semibold">{filteredReports.length} Showing</span>
        </div>

        {filteredReports.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-8 text-center flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-1">inbox</span>
            <p className="font-title-md text-title-md text-primary font-bold">No reports match your filters</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Try resetting filters or searching with a different term.</p>
            <button
              type="button"
              onClick={() => {
                setFilter('all');
                setSeverityFilter('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md font-bold transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredReports.map((report, idx) => (
            <div
              key={report.id}
              className="relative bg-surface-container-lowest rounded-2xl p-space-md shadow-sm overflow-hidden cursor-pointer hover:bg-surface-container transition-colors"
              onClick={() => onViewReportDetails(report)}
            >
              {/* Left indicator bar */}
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                report.riskLevel === 'High' ? 'bg-error' : report.riskLevel === 'Medium' ? 'bg-amber-500' : 'bg-secondary'
              }`}></div>
              <div className="flex flex-col space-y-space-sm pl-1">
                
                {/* Badge row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {report.riskLevel === 'High' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                        HIGH RISK
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                      {report.category}
                    </span>
                    {report.status === 'Resolved' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-container/40 text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                        RESOLVED
                      </span>
                    )}
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">{idx + 1}m ago</span>
                </div>

                {/* Title */}
                <h2 className="font-title-md text-title-md text-primary font-bold leading-snug">
                  {report.title}
                </h2>

                {/* Info meta pills */}
                <div className="bg-surface-container-low rounded-xl p-space-sm space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary flex-shrink-0 mt-0.5">location_on</span>
                    <div className="text-body-sm font-body-sm text-on-surface">
                      <span className="font-semibold text-primary">Location:</span> {report.location}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-[18px] text-secondary flex-shrink-0 mt-0.5">notification_important</span>
                    <div className="text-body-sm font-body-sm text-on-surface">
                      <span className="font-semibold text-primary">Status:</span> {report.status}
                    </div>
                  </div>
                </div>

                {/* Stepper / Status track */}
                <div className="flex items-center gap-2 pt-1">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                    report.status === 'Draft' ? 'bg-surface-container text-on-surface-variant' : 'bg-secondary text-on-secondary'
                  }`}>
                    <span className="material-symbols-outlined text-[12px]">{report.status === 'Draft' ? 'radio_button_unchecked' : 'check'}</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Draft</span>
                  <div className="h-0.5 flex-1 bg-surface-container"></div>
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                    report.status === 'Submitted' ? 'bg-surface-container text-on-surface-variant' : 'bg-secondary text-on-secondary'
                  }`}>
                    <span className="material-symbols-outlined text-[12px]">{report.status === 'Submitted' ? 'radio_button_unchecked' : 'check'}</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Submitted</span>
                  <div className="h-0.5 flex-1 bg-surface-container"></div>
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                    report.status === 'Verified' ? 'bg-surface-container text-on-surface-variant' : 'bg-secondary text-on-secondary'
                  }`}>
                    <span className="material-symbols-outlined text-[12px]">{report.status === 'Verified' ? 'radio_button_unchecked' : 'check'}</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Verified</span>
                  <div className="h-0.5 flex-1 bg-surface-container"></div>
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full ${
                    report.status === 'Resolved' ? 'bg-surface-container text-on-surface-variant' : 'bg-secondary text-on-secondary'
                  }`}>
                    <span className="material-symbols-outlined text-[12px]">{report.status === 'Resolved' ? 'radio_button_unchecked' : 'check'}</span>
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Resolved</span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewReportDetails(report);
                    }}
                    className="flex-1 py-2 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">description</span>
                    <span>View Brief</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleResolve(report.id, report.status === 'Resolved' ? 'Submitted' : 'Resolved');
                    }}
                    className={`flex-1 py-2 rounded-lg font-label-md text-label-md transition-colors ${
                      report.status === 'Resolved'
                        ? 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        : 'bg-secondary text-on-secondary hover:opacity-90'
                    }`}
                  >
                    {report.status === 'Resolved' ? 'Reopen' : 'Mark Resolved'}
                  </button>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Report Button */}
      <button
        onClick={onStartNewReport}
        className="w-full min-h-[52px] rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs shadow-md active:scale-[0.99] transition-transform"
      >
        <span className="material-symbols-outlined text-[20px]">add_circle</span>
        <span>Report New Issue</span>
      </button>

      {/* Reset Demo Button */}
      <button
        onClick={onResetDemo}
        className="w-full py-2.5 text-center font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center gap-1"
      >
        <span className="material-symbols-outlined text-[18px]">refresh</span>
        <span>Reset Demo Data</span>
      </button>

      {/* Detail Modal */}
      {inspectReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/50 backdrop-blur-sm">
          <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-surface-container pb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-surface-container-high flex items-center justify-center p-0.5">
                  <img
                    src="/kuralguard-logo.png"
                    alt="KuralGuard shield and community safety logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-mono text-sm font-bold text-slate-600">
                  {inspectReport.referenceId || inspectReport.id}
                </span>
              </div>
              <button
                onClick={() => setInspectReport(null)}
                className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-title-md text-title-md text-primary font-bold">{inspectReport.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{inspectReport.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Category</span>
                  <p className="font-label-lg text-label-lg text-primary">{inspectReport.category}</p>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Risk Level</span>
                  <p className="font-label-lg text-label-lg text-primary">{inspectReport.riskLevel}</p>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Location</span>
                  <p className="font-label-lg text-label-lg text-primary">{inspectReport.location}</p>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Status</span>
                  <p className="font-label-lg text-label-lg text-primary">{inspectReport.status}</p>
                </div>
              </div>

              {(inspectReport.evidenceFactors?.length || inspectReport.immediateSafetyAdvice) && (
                <div className="bg-surface-container-low p-4 rounded-xl">
                  <h4 className="font-label-md text-label-md text-primary font-bold mb-2">AI Analysis</h4>
                  {inspectReport.evidenceFactors && (
                    <ul className="list-disc pl-4 space-y-1 font-body-sm text-body-sm text-on-surface">
                      {inspectReport.evidenceFactors.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {inspectReport.immediateSafetyAdvice && (
                    <div className="mt-3">
                      <h5 className="font-label-sm text-label-sm text-primary font-semibold mb-1">Safety Advice:</h5>
                      <ul className="list-disc pl-4 space-y-1 font-body-sm text-body-sm text-on-surface">
                        {inspectReport.immediateSafetyAdvice.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setInspectReport(null)}
              className="w-full py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
