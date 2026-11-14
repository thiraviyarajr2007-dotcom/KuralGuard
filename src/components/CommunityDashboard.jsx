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
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectReport, setInspectReport] = useState(null);

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesFilter = filter === 'all' || 
        (filter === 'resolved' && report.status === 'Resolved') ||
        (filter === 'pending' && report.status !== 'Resolved');
      const matchesSearch = !searchQuery || 
        report.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.location?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [reports, filter, searchQuery]);

  const stats = useMemo(() => ({
    total: reports.length,
    highRisk: reports.filter(r => r.riskLevel === 'High' || r.urgency === 'High').length,
    resolved: reports.filter(r => r.status === 'Resolved').length,
  }), [reports]);

  return (
    <div className="flex flex-col gap-space-lg pt-16 px-gutter-mobile pb-28">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold tracking-tight">
            Community Safety Priority Dashboard
          </h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Track civic action status across all reported hazards
          </p>
        </div>
        <button
          onClick={onResetDemo}
          className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-surface-container-lowest p-3 rounded-xl shadow-xs flex flex-col">
          <span className="font-headline-sm text-headline-sm font-extrabold text-primary">{stats.total}</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">Total Reports</span>
        </div>
        <div className="bg-error-container/40 p-3 rounded-xl shadow-xs flex flex-col">
          <span className="font-headline-sm text-headline-sm font-extrabold text-error">{stats.highRisk}</span>
          <span className="font-label-sm text-label-sm text-on-error-container font-semibold">High Priority</span>
        </div>
        <div className="bg-secondary-fixed/30 p-3 rounded-xl shadow-xs flex flex-col">
          <span className="font-headline-sm text-headline-sm font-extrabold text-secondary">{stats.resolved}</span>
          <span className="font-label-sm text-label-sm text-on-secondary-fixed-variant font-semibold">Resolved</span>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 flex items-center gap-2 bg-surface-container-lowest rounded-lg px-3 py-2">
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports..."
            className="flex-1 bg-transparent text-on-surface font-body-md text-body-md focus:outline-none placeholder:text-outline"
          />
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-2 rounded-lg font-label-sm text-label-sm transition-colors ${
              filter === 'all' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-2 rounded-lg font-label-sm text-label-sm transition-colors ${
              filter === 'pending' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-3 py-2 rounded-lg font-label-sm text-label-sm transition-colors ${
              filter === 'resolved' ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="flex flex-col gap-2">
        {filteredReports.length === 0 ? (
          <div className="bg-surface-container-lowest rounded-xl p-8 text-center">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-2">inbox</span>
            <p className="font-body-md text-body-md text-on-surface-variant">No reports found</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-3 cursor-pointer hover:bg-surface-container transition-colors"
              onClick={() => onViewReportDetails(report)}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
                      {report.category}
                    </span>
                    {report.riskLevel === 'High' && (
                      <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm">
                        High Risk
                      </span>
                    )}
                  </div>
                  <h3 className="font-title-md text-title-md text-primary font-bold">{report.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">{report.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{report.status}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleResolve(report.id, report.status === 'Resolved' ? 'Submitted' : 'Resolved');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors"
                  >
                    {report.status === 'Resolved' ? 'Reopen' : 'Resolve'}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span>{report.location}</span>
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
