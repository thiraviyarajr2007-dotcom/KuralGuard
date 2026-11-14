const STORAGE_KEY = 'kuralguard.reports.v1';

export function sanitizeText(value = '', maxLength = 2000) {
  return String(value)
    .replace(/<[^>]*>/g, ' ')
    .replace(/[\u0000-\u001F\u007F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

export function loadReports(fallback = []) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function saveReports(reports) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch {
    // localStorage may be unavailable; the app still works in memory.
  }
}

export function resetReports(fallback = []) {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  saveReports(fallback);
  return fallback;
}

export function upsertReport(reports, report) {
  const exists = reports.some((item) => item.id === report.id);
  return exists ? reports.map((item) => (item.id === report.id ? { ...item, ...report } : item)) : [report, ...reports];
}
