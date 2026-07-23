import type { ButtonHTMLAttributes } from 'react';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
}

const variantClasses: Record<ButtonVariant, string> = {
  [ButtonVariant.Primary]: 'bg-blue-600 text-white hover:bg-blue-700',
  [ButtonVariant.Secondary]: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  [ButtonVariant.Danger]: 'bg-red-600 text-white hover:bg-red-700',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = ButtonVariant.Primary, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...props}
    />
  );
}
