import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, Activity, Layers, Zap, Moon, Sun } from 'lucide-react';

export const Welcome = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
      });
    
      useEffect(() => {
        if (isDarkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      }, [isDarkMode]);

  return (
    <div className="h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors duration-200">
      {/* Navbar */}
      <nav className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl text-slate-900 dark:text-slate-100">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <Calculator size={20} />
            </div>
            Formula Hub
          </div>
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/about" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                About Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Decorative Blobs */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob pointer-events-none"></div>
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-cyan-200 dark:bg-cyan-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>
        <div className="absolute -bottom-32 left-1/3 w-72 h-72 bg-brand-200 dark:bg-brand-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000 pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100 dark:border-brand-800 text-brand-700 dark:text-brand-300 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm">
            <Zap size={12} className="fill-brand-500 text-brand-500" />
            Professional Textile Tools
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500 dark:from-brand-400 dark:to-cyan-400">Calculations</span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            The ultimate suite for textile engineers and production managers. 
            Calculate GSM, Shrinkage, Yarn Count and more with precision and ease.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/shrinkage" 
              className="inline-flex items-center justify-center px-8 py-3 text-base font-bold text-white bg-brand-600 rounded-xl hover:bg-brand-700 transition-all duration-200 shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 transform hover:-translate-y-1"
            >
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto text-left relative z-10 w-full px-4">
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-5 rounded-2xl border border-white dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
              <Activity size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Real-time Logic</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs">Instant calculations as you type. No page reloads needed.</p>
          </div>
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-5 rounded-2xl border border-white dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
              <Layers size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Comprehensive Suite</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs">From fabric GSM to chemical dilutions, we cover it all.</p>
          </div>
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm p-5 rounded-2xl border border-white dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-3">
              <Zap size={20} />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Production Ready</h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs">Designed for efficiency on the factory floor or in the lab.</p>
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 shrink-0">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 dark:text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Formula Hub. All rights reserved.
        </div>
      </footer>
    </div>
  );
};