import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { ChevronDown, ArrowRight } from 'lucide-react';

interface Measurement {
  before: string;
  after: string;
}

interface ShrinkageState {
  length: Measurement;
  width: Measurement;
  border1: Measurement;
  border2: Measurement;
  end1: Measurement;
  end2: Measurement;
  weight: string;
  gsm: string;
}

export const Shrinkage = () => {
  const [unit, setUnit] = useState<string>('cm');
  const [data, setData] = useState<ShrinkageState>({
    length: { before: '', after: '' },
    width: { before: '', after: '' },
    border1: { before: '', after: '' },
    border2: { before: '', after: '' },
    end1: { before: '', after: '' },
    end2: { before: '', after: '' },
    weight: '',
    gsm: '',
  });

  // Auto-calculate GSM
  useEffect(() => {
    const l = parseFloat(data.length.before);
    const w = parseFloat(data.width.before);
    const weight = parseFloat(data.weight);
    
    if (!isNaN(l) && !isNaN(w) && !isNaN(weight) && l > 0 && w > 0) {
      let calculatedGsm = 0;
      
      if (unit === 'cm') {
        // Formula: (Weight_g * 10000) / (Length_cm * Width_cm)
        calculatedGsm = (weight * 10000) / (l * w);
      } else {
        // Formula: (Weight_g * 1550) / (Length_inch * Width_inch)
        // 1 m² ≈ 1550 in²
        calculatedGsm = (weight * 1550) / (l * w);
      }
      
      setData(prev => ({ ...prev, gsm: calculatedGsm.toFixed(1) }));
    }
  }, [data.length.before, data.width.before, data.weight, unit]);

  const updateMeasurement = (key: keyof ShrinkageState, field: 'before' | 'after', value: string) => {
    setData(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] as Measurement),
        [field]: value
      }
    }));
  };

  const updateSingle = (key: 'weight' | 'gsm', value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  // Helper to calculate shrinkage %
  // Formula: ((After - Before) / Before) * 100
  const calcShrinkage = (m: Measurement): number | null => {
    const b = parseFloat(m.before);
    const a = parseFloat(m.after);
    if (!m.before || !m.after || isNaN(b) || isNaN(a) || b === 0) return null;
    return ((a - b) / b) * 100;
  };

  // Calculations
  const lengthS = calcShrinkage(data.length);
  const widthS = calcShrinkage(data.width);
  const border1S = calcShrinkage(data.border1);
  const border2S = calcShrinkage(data.border2);
  const end1S = calcShrinkage(data.end1);
  const end2S = calcShrinkage(data.end2);

  // Differentials
  // User Requested: "Differential mai Width vs Border hoga"
  // Border Differential = |Width Shrinkage - Border Shrinkage| (Absolute value, no negative sign)
  // End Differential = |Width Shrinkage - End Shrinkage|
  const diffBorder1 = widthS !== null && border1S !== null ? Math.abs(widthS - border1S).toFixed(2) : '-';
  const diffBorder2 = widthS !== null && border2S !== null ? Math.abs(widthS - border2S).toFixed(2) : '-';
  const diffEnd1 = widthS !== null && end1S !== null ? Math.abs(widthS - end1S).toFixed(2) : '-';
  const diffEnd2 = widthS !== null && end2S !== null ? Math.abs(widthS - end2S).toFixed(2) : '-';

  const formatResult = (val: number | null) => {
    if (val === null) return '-';
    return val.toFixed(2) + '%';
  };

  // Color Logic
  // Reversed Logic:
  // Length: <= -7.1 Red (Too much shrinkage), > -7.0 Green (Acceptable)
  const getLengthColor = (val: number | null) => {
    if (val === null) return 'text-slate-400 dark:text-slate-500';
    // Logic: If shrinkage is e.g. -8% (value <= -7.1), it is bad (Red).
    // If shrinkage is -2% (value > -7.0), it is good (Green).
    return val <= -7.1 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400';
  };

  // Others (Width, Border, End): <= -5.1 Red (Too much shrinkage), > -5.0 Green (Acceptable)
  const getOtherColor = (val: number | null) => {
    if (val === null) return 'text-slate-400 dark:text-slate-500';
    return val <= -5.1 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400';
  };

  // Differential Color Logic
  // 2.0 or less is Green, else Red
  // Since values are absolute now, we just check <= 2.0
  const getDiffColor = (valStr: string) => {
    if (valStr === '-') return 'text-slate-800 dark:text-slate-200';
    const val = parseFloat(valStr);
    if (isNaN(val)) return 'text-slate-800 dark:text-slate-200';
    return val <= 2.0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400';
  };

  const renderRow = (label: string, key: keyof ShrinkageState, result: number | null, colorFn: (v: number | null) => string) => (
    <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
      <div className="col-span-3 text-sm font-medium text-slate-700 dark:text-slate-300">{label}</div>
      <div className="col-span-3">
        <input
          type="number"
          placeholder="0"
          className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
          value={(data[key] as Measurement).before}
          onChange={(e) => updateMeasurement(key, 'before', e.target.value)}
        />
      </div>
      <div className="col-span-3">
        <input
          type="number"
          placeholder="0"
          className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
          value={(data[key] as Measurement).after}
          onChange={(e) => updateMeasurement(key, 'after', e.target.value)}
        />
      </div>
      <div className="col-span-3 text-right">
        <span className={`font-bold text-sm ${colorFn(result)}`}>
          {formatResult(result)}
        </span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Shrinkage & Differential</h2>
          <p className="text-slate-500 dark:text-slate-400">Calculate dimensional change and border and end hem differentials.</p>
        </div>
        
        {/* Unit Selector */}
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Unit:</span>
            <div className="relative">
              <select 
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="appearance-none bg-transparent font-bold text-brand-600 dark:text-brand-400 pr-8 focus:outline-none cursor-pointer text-sm"
              >
                  <option value="cm" className="dark:bg-slate-800">cm</option>
                  <option value="inch" className="dark:bg-slate-800">inch</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-brand-600 dark:text-brand-400">
                <ChevronDown size={14} strokeWidth={3} />
              </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
        {/* Main Inputs */}
        <Card className="lg:col-span-2">
            <div className="grid grid-cols-12 gap-2 sm:gap-4 px-6 py-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <div className="col-span-3">Component</div>
                <div className="col-span-3">Before</div>
                <div className="col-span-3">After</div>
                <div className="col-span-3 text-right">Change %</div>
            </div>
            <CardContent className="space-y-1">
                {renderRow('Length', 'length', lengthS, getLengthColor)}
                {renderRow('Width', 'width', widthS, getOtherColor)}
                
                <div className="my-2 border-t border-slate-100 dark:border-slate-800"></div>
                
                {renderRow('Border 1', 'border1', border1S, getOtherColor)}
                {renderRow('Border 2', 'border2', border2S, getOtherColor)}
                
                <div className="my-2 border-t border-slate-100 dark:border-slate-800"></div>

                {renderRow('End Hem 1', 'end1', end1S, getOtherColor)}
                {renderRow('End Hem 2', 'end2', end2S, getOtherColor)}

                <div className="my-2 border-t border-slate-100 dark:border-slate-800"></div>

                {/* Weight Row */}
                 <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center py-2 border-b border-slate-100 dark:border-slate-800">
                    <div className="col-span-3 text-sm font-medium text-slate-700 dark:text-slate-300">Weight</div>
                    <div className="col-span-3 relative">
                        <input
                        type="number"
                        placeholder="0"
                        className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                        value={data.weight}
                        onChange={(e) => updateSingle('weight', e.target.value)}
                        />
                    </div>
                    <div className="col-span-6 text-xs text-slate-400 dark:text-slate-500 pl-2">
                        Sample Weight (g)
                    </div>
                </div>

                {/* GSM Row */}
                 <div className="grid grid-cols-12 gap-2 sm:gap-4 items-center py-2">
                    <div className="col-span-3 text-sm font-medium text-slate-700 dark:text-slate-300">GSM</div>
                    <div className="col-span-3 relative">
                        <input
                        type="number"
                        readOnly
                        placeholder="Auto"
                        className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed focus:outline-none"
                        value={data.gsm}
                        />
                    </div>
                    <div className="col-span-6 text-xs text-slate-400 dark:text-slate-500 pl-2">
                        Auto-calculated
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Differentials / Results */}
        <Card className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800/50 h-full">
            <CardHeader title="Differentials" description="Difference between Body and Trim shrinkage." />
            <CardContent className="space-y-6">
                
                {/* Border Differentials */}
                <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Width vs Border</h4>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Border 1 Diff</span>
                        <span className={`text-lg font-bold ${getDiffColor(diffBorder1)}`}>{diffBorder1 !== '-' ? `${diffBorder1}%` : '-'}</span>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Border 2 Diff</span>
                        <span className={`text-lg font-bold ${getDiffColor(diffBorder2)}`}>{diffBorder2 !== '-' ? `${diffBorder2}%` : '-'}</span>
                    </div>
                </div>

                {/* End Differentials */}
                <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Width vs End Hem</h4>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">End Hem 1 Diff</span>
                        <span className={`text-lg font-bold ${getDiffColor(diffEnd1)}`}>{diffEnd1 !== '-' ? `${diffEnd1}%` : '-'}</span>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">End Hem 2 Diff</span>
                        <span className={`text-lg font-bold ${getDiffColor(diffEnd2)}`}>{diffEnd2 !== '-' ? `${diffEnd2}%` : '-'}</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Formulas</h4>
                    <div className="space-y-2">
                        <div className="text-xs flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                            <span className="text-slate-500 dark:text-slate-400">Shrinkage %</span>
                            <code className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300 font-mono text-[10px] sm:text-xs text-center">
                                ((After - Before) / Before) × 100
                            </code>
                        </div>
                        <div className="text-xs flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                            <span className="text-slate-500 dark:text-slate-400">Differential</span>
                            <code className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300 font-mono text-[10px] sm:text-xs text-center">
                                Width % - Trim %
                            </code>
                        </div>
                         <div className="text-xs flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                            <span className="text-slate-500 dark:text-slate-400">GSM</span>
                            <code className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300 font-mono text-[10px] sm:text-xs text-center">
                                {unit === 'cm' ? '(Weight × 10000) / (L × W)' : '(Weight × 1550) / (L × W)'}
                            </code>
                        </div>
                    </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Note:</span> High differentials ({'>'}2.0) can cause waviness or bowing in the finished product.
                    </p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};