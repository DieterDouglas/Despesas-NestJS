import type { ButtonHTMLAttributes } from 'react';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
}

const variantClasses: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700',
  [ButtonVariant.Secondary]: 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
  [ButtonVariant.Danger]: 'bg-white text-red-600 border border-red-200 hover:bg-red-50',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = ButtonVariant.Primary, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
