import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, ResultBox } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { ChevronDown } from 'lucide-react';

const PLY_OPTIONS = ['Single', 'Double', 'Triple', 'Quadruple', 'Quintuple'];

export const YarnCount = () => {
  const [length, setLength] = useState('');
  const [threads, setThreads] = useState('1');
  const [weight, setWeight] = useState('');
  const [ply, setPly] = useState('Single');
  const [tpi, setTpi] = useState('');
  
  const [results, setResults] = useState({ count: '', tm: '' });

  useEffect(() => {
    const l_cm = parseFloat(length);
    const t = parseFloat(threads);
    const w = parseFloat(weight);
    const twist = parseFloat(tpi);

    if (!l_cm || !w || !t || isNaN(l_cm) || isNaN(w) || isNaN(t) || w === 0) {
      setResults({ count: '0.00', tm: '0.00' });
      return;
    }

    // Formula provided: (length in cm x No. of threads x 0.0059) / weight in gram
    let countVal = (l_cm * t * 0.0059) / w;

    // Apply Ply Multiplier
    // Single = 1, Double = 2, Triple = 3, etc.
    const plyIndex = PLY_OPTIONS.indexOf(ply);
    const multiplier = plyIndex !== -1 ? plyIndex + 1 : 1;
    
    countVal = countVal * multiplier;

    // TM (Twist Multiplier)
    // TM = TPI / sqrt(Count)
    let tmVal = 0;
    if (twist && !isNaN(twist) && countVal > 0) {
      tmVal = twist / Math.sqrt(countVal);
    }

    setResults({
      count: countVal.toFixed(2),
      tm: tmVal > 0 ? tmVal.toFixed(2) : '0.00'
    });

  }, [length, threads, weight, tpi, ply]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Yarn Count Analysis</h2>
        <p className="text-slate-500 dark:text-slate-400">Calculate Count (Ne) and Twist Multiplier (TM).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fadeIn">
        <Card>
          <CardHeader title="Yarn Parameters" />
          <CardContent className="space-y-5">
            {/* Length */}
            <Input 
              label="Length of Yarn" 
              placeholder="e.g. 100" 
              type="number" 
              unit="cm"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />

            {/* No. of Thread */}
            <Input 
              label="No. of Thread" 
              placeholder="e.g. 1" 
              type="number" 
              value={threads}
              onChange={(e) => setThreads(e.target.value)}
            />

            {/* Weight */}
            <Input 
              label="Weight of Yarn" 
              placeholder="e.g. 2.0" 
              type="number" 
              unit="g"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            {/* Ply Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Ply</label>
              <div className="relative">
                <select
                  value={ply}
                  onChange={(e) => setPly(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer pr-10"
                >
                  {PLY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* TPI */}
            <Input 
              label="TPI (Twist Per Inch)" 
              placeholder="e.g. 15" 
              type="number" 
              value={tpi}
              onChange={(e) => setTpi(e.target.value)}
            />

          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-indigo-50/50 dark:from-slate-900 dark:to-indigo-900/10 h-full flex flex-col">
          <CardHeader title="Calculated Results" />
          <CardContent className="flex-1 flex flex-col items-center justify-center py-8 space-y-6">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
               <ResultBox 
                  label="Count (Ne)" 
                  value={results.count} 
                  unit="s" 
               />
               <ResultBox 
                  label="TM" 
                  value={results.tm} 
               />
            </div>

            <div className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center w-full space-y-4">
              <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">Count Formula</span>
                  <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 text-xs font-mono border border-slate-200 dark:border-slate-700 shadow-sm">
                    (Length cm × Threads × 0.0059) / Weight g
                  </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                  <span className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500 tracking-wider">TM Formula</span>
                  <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg text-slate-700 dark:text-slate-300 text-xs font-mono border border-slate-200 dark:border-slate-700 shadow-sm">
                    TPI / √Count
                  </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};