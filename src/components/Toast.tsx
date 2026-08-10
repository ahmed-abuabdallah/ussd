import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
  codeSnippet?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const bgStyles = {
    success: 'bg-emerald-900/95 text-white border-emerald-500/50',
    error: 'bg-red-900/95 text-white border-red-500/50',
    info: 'bg-slate-900/95 text-white border-slate-700',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-md animate-slideDown pointer-events-auto">
      <div
        className={`p-4 rounded-2xl border shadow-2xl backdrop-blur-md flex items-start gap-3 ${
          bgStyles[toast.type]
        }`}
      >
        {icons[toast.type]}

        <div className="flex-1 min-w-0 space-y-1">
          <p className="font-extrabold text-sm">{toast.title}</p>
          {toast.message && (
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {toast.message}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
