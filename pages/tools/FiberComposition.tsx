import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, ResultBox } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { ChevronDown, FlaskConical, ArrowRight } from 'lucide-react';

const FIBERS = [
  'Cotton',
  'Polyester',
  'Viscose',
  'Modal',
  'Lyocell',
  'Nylon',
  'Acrylic',
  'Wool',
  'Silk',
  'Spandex',
  'Linen',
  'Bamboo'
];

const COLORS = ['#0ea5e9', '#f59e0b']; // Brand Blue & Amber

export const FiberComposition = () => {
  // State
  const [dissolvedFiber, setDissolvedFiber] = useState('Cotton');
  const [residueFiber, setResidueFiber] = useState('Polyester');
  const [beforeWeight, setBeforeWeight] = useState('');
  const [afterWeight, setAfterWeight] = useState('');

  // Calculations
  const calculateComposition = () => {
    const w1 = parseFloat(beforeWeight);
    const w2 = parseFloat(afterWeight);

    if (!w1 || !w2 || isNaN(w1) || isNaN(w2) || w1 === 0) {
      return { 
        dissolvedPerc: 0, 
        residuePerc: 0, 
        dissolvedWeight: 0, 
        isValid: false 
      };
    }

    if (w2 > w1) {
       return { 
        dissolvedPerc: 0, 
        residuePerc: 0, 
        dissolvedWeight: 0, 
        isValid: false,
        error: "Final weight cannot be greater than initial weight" 
      };
    }

    // Logic: 
    // W1 = Initial Sample
    // W2 = Residue (After dissolving fiber 1)
    // Loss = W1 - W2 (Weight of Fiber 1)
    
    const loss = w1 - w2;
    const dissolvedPerc = (loss / w1) * 100;
    const residuePerc = (w2 / w1) * 100;

    return {
      dissolvedPerc: parseFloat(dissolvedPerc.toFixed(2)),
      residuePerc: parseFloat(residuePerc.toFixed(2)),
      dissolvedWeight: parseFloat(loss.toFixed(3)),
      isValid: true
    };
  };

  const result = calculateComposition();

  const chartData = [
    { name: dissolvedFiber, value: result.dissolvedPerc },
    { name: residueFiber, value: result.residuePerc }
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Fiber Composition Analysis</h2>
        <p className="text-slate-500 dark:text-slate-400">Calculate blend percentages using the chemical dissolution method.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <Card>
          <CardHeader title="Test Parameters" description="Enter lab measurements." />
          <CardContent className="space-y-6">
            
            {/* Fiber Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Dissolved Fiber</label>
                <div className="relative">
                  <select
                    value={dissolvedFiber}
                    onChange={(e) => setDissolvedFiber(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
                  >
                    {FIBERS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={16} />
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">Component removed chemically</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Residue Fiber</label>
                <div className="relative">
                  <select
                    value={residueFiber}
                    onChange={(e) => setResidueFiber(e.target.value)}
                    className="w-full appearance-none px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer"
                  >
                    {FIBERS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={16} />
                </div>
                 <p className="text-[10px] text-slate-400 dark:text-slate-500">Component remaining</p>
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-800 my-4"></div>

            {/* Weight Inputs */}
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <div className="flex-1">
                   <Input 
                      label="Before Weight (Total)" 
                      placeholder="0.000" 
                      type="number"
                      unit="g"
                      value={beforeWeight}
                      onChange={(e) => setBeforeWeight(e.target.value)}
                   />
                 </div>
                 <ArrowRight className="text-slate-300 dark:text-slate-600 mt-6" />
                 <div className="flex-1">
                    <Input 
                      label="After Weight (Residue)" 
                      placeholder="0.000" 
                      type="number"
                      unit="g"
                      value={afterWeight}
                      onChange={(e) => setAfterWeight(e.target.value)}
                      error={result.error}
                   />
                 </div>
               </div>
            </div>

            {/* Visual Aid */}
            <div className="bg-brand-50/50 dark:bg-brand-900/20 p-4 rounded-xl border border-brand-100 dark:border-brand-900/30 flex items-center gap-3 text-sm text-brand-800 dark:text-brand-300">
               <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm text-brand-600 dark:text-brand-400">
                 <FlaskConical size={20} />
               </div>
               <div>
                 <span className="font-semibold block">Calculation Logic:</span>
                 <span className="text-brand-600/80 dark:text-brand-400/80 text-xs">
                   (Before - After) = {dissolvedFiber} Weight. <br/>
                   (After) = {residueFiber} Weight.
                 </span>
               </div>
            </div>

          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="h-full bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 flex flex-col">
          <CardHeader title="Composition Results" />
          <CardContent className="flex-1 flex flex-col">
            
            {result.isValid ? (
              <>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <ResultBox 
                    label={dissolvedFiber} 
                    value={result.dissolvedPerc} 
                    unit="%"
                    secondaryValue={`Weight: ${result.dissolvedWeight}g`}
                  />
                  <ResultBox 
                    label={residueFiber} 
                    value={result.residuePerc} 
                    unit="%"
                    secondaryValue={`Weight: ${afterWeight}g`}
                  />
                </div>

                <div className="flex-1 min-h-[250px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#f8fafc' }} 
                        itemStyle={{ color: '#f8fafc', fontWeight: 600 }}
                      />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Center Text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none pb-8">
                     <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">100%</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 m-4">
                 <FlaskConical size={32} className="mb-3 opacity-50" />
                 <p className="text-sm font-medium">Enter weights to generate analysis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};