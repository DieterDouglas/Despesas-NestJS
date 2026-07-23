import type { ReactNode } from 'react';
import { Card } from './Card';

export function AuthLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">{title}</h1>
        {children}
      </Card>
    </div>
  );
}
