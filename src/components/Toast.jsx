import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 3500) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast: addToast }}>
      {children}
      <div 
        aria-live="polite" 
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto flex items-center justify-between gap-3 px-4 py-3 rounded-lg shadow-xl border text-sm font-medium transition-all transform translate-y-0 ${
              toast.type === 'error'
                ? 'bg-surface-container-lowest border-error text-on-error-container'
                : toast.type === 'warning'
                ? 'bg-surface-container-lowest border-amber-500 text-amber-800'
                : 'bg-surface-container-lowest border-secondary text-on-secondary-container'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'error' && <span className="material-symbols-outlined text-[20px] text-error shrink-0">error</span>}
              {toast.type === 'warning' && <span className="material-symbols-outlined text-[20px] text-amber-600 shrink-0">warning</span>}
              {toast.type === 'success' && <span className="material-symbols-outlined text-[20px] text-secondary shrink-0">check_circle</span>}
              {toast.type === 'info' && <span className="material-symbols-outlined text-[20px] text-secondary shrink-0">info</span>}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="p-1 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    return { showToast: (msg) => console.log('Toast:', msg) };
  }
  return context;
}
