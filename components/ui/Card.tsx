import React from 'react';

export const Card = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <div className={`bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ title, description }: { title: string, description?: string }) => (
  <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
    {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
  </div>
);

export const CardContent = ({ children, className = '' }: { children?: React.ReactNode, className?: string }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const ResultBox = ({ label, value, unit, secondaryValue }: { label: string, value: string | number, unit?: string, secondaryValue?: string }) => (
  <div className="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-6 border border-brand-100 dark:border-brand-900/50 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
    <span className="text-sm font-medium text-brand-600 dark:text-brand-400 uppercase tracking-wide mb-2">{label}</span>
    <div className="flex items-baseline gap-1">
      <span className="text-4xl font-bold text-brand-900 dark:text-brand-100 tracking-tight">{value}</span>
      {unit && <span className="text-lg font-medium text-brand-700 dark:text-brand-300">{unit}</span>}
    </div>
    {secondaryValue && (
      <span className="mt-2 text-sm text-brand-600/80 dark:text-brand-400/80 font-medium">{secondaryValue}</span>
    )}
  </div>
);