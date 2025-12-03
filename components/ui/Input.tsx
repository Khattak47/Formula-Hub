import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  unit?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, unit, className, ...props }) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="relative">
        <input
          className={`
            w-full px-3 py-2.5 rounded-lg border 
            bg-white dark:bg-slate-900 
            text-slate-900 dark:text-slate-100 
            placeholder-slate-400 dark:placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
            disabled:bg-slate-50 disabled:text-slate-500 dark:disabled:bg-slate-800 dark:disabled:text-slate-500
            transition-all duration-200
            ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : 'border-slate-300 dark:border-slate-700'}
            ${unit ? 'pr-12' : ''}
          `}
          {...props}
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{unit}</span>
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs text-rose-500 mt-0.5">{error}</p>
      )}
    </div>
  );
};