import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-slate-200/70 p-6 sm:p-7 ${className}`}>
      {children}
    </div>
  );
}
