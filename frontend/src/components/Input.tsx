import type { InputHTMLAttributes } from 'react';

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${className}`}
      {...props}
    />
  );
}
