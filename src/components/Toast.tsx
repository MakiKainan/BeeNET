import React, { useEffect } from 'react';
import { Toast } from '../types';

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

const ICONS: Record<Toast['type'], string> = {
  success: 'check_circle',
  info: 'info',
  error: 'error',
};

const STYLES: Record<Toast['type'], string> = {
  success: 'border-emerald-200 text-emerald-800',
  info: 'border-[#d8e2ff] text-[#0059bb]',
  error: 'border-red-200 text-red-700',
};

const ICON_STYLES: Record<Toast['type'], string> = {
  success: 'text-emerald-500',
  info: 'text-[#0059bb]',
  error: 'text-red-500',
};

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-2xl shadow-lg bg-white border max-w-sm animate-fade-in ${STYLES[toast.type]}`}>
      <span className={`material-symbols-outlined text-[20px] mt-0.5 shrink-0 ${ICON_STYLES[toast.type]}`}>
        {ICONS[toast.type]}
      </span>
      <p className="text-sm font-semibold flex-1 leading-snug">{toast.message}</p>
      <button
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 opacity-40 hover:opacity-100 transition-opacity cursor-pointer ml-1"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>
  );
}
