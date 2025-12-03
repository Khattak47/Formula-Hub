import React from 'react';
import { Card, CardContent } from '../components/ui/Card';
import { Github, Globe, Phone, Mail, Code, CheckCircle2 } from 'lucide-react';

export const About = () => {
  return (
    <div className="max-w-6xl mx-auto flex flex-col justify-center min-h-[80vh] lg:min-h-0 gap-6">
      
      {/* Compact Header */}
      <div className="text-center space-y-2 mb-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">About Formula Hub</h1>
        <p className="text-slate-600 dark:text-slate-400">Empowering textile professionals with precision tools.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Mission & Why Us (Span 7) */}
        <Card className="lg:col-span-7 h-full flex flex-col justify-center">
          <CardContent className="p-8 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Our Mission</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Formula Hub was created to streamline the daily calculations faced by textile engineers, 
                lab technicians, and production managers. We believe that accuracy in calculation leads to 
                excellence in production.
              </p>
            </div>
            
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4">Why Use Formula Hub?</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600 dark:text-slate-300 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-brand-500 shrink-0 mt-0.5" />
                  <span><strong>Accuracy:</strong> Verified formulas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-brand-500 shrink-0 mt-0.5" />
                  <span><strong>Speed:</strong> Instant processing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-brand-500 shrink-0 mt-0.5" />
                  <span><strong>Accessibility:</strong> Mobile ready.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={18} className="text-brand-500 shrink-0 mt-0.5" />
                  <span><strong>Reliability:</strong> Production tested.</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Features & Developer (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Feature Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 mb-3">
                <Globe size={18} />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Web Based</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">No installation needed.</p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 mb-3">
                <Github size={18} />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm">Open Source</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Transparent code base.</p>
            </div>
          </div>

          {/* Developer Card - Compact */}
          <Card className="flex-1 border-brand-100 dark:border-brand-900/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-brand-500 to-cyan-500"></div>
            <CardContent className="p-6 h-full flex flex-col justify-center">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-brand-50 dark:bg-brand-900/20 rounded-full flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0 border border-brand-100 dark:border-brand-800">
                        <Code size={28} strokeWidth={1.5} />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Aizaz Ahmed Khattak</h3>
                        <p className="text-brand-600 dark:text-brand-400 font-medium text-sm">Full Stack Developer</p>
                    </div>
                </div>
                
                <div className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-400 pl-2">
                    <a href="tel:+923011509095" className="flex items-center gap-3 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                        <Phone size={16} />
                        <span>+92 301 1509095</span>
                    </a>
                    <a href="mailto:aizazahmedkhattak@gmail.com" className="flex items-center gap-3 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                        <Mail size={16} />
                        <span>aizazahmedkhattak@gmail.com</span>
                    </a>
                </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};