import React, { useState } from 'react';
import { Card, CardContent, CardHeader, ResultBox } from '../../components/ui/Card';
import { ChevronDown } from 'lucide-react';

const UNITS = [
  { value: 'mm', label: 'Millimeters (mm)', factor: 1000 },
  { value: 'cm', label: 'Centimeters (cm)', factor: 100 },
  { value: 'm', label: 'Meters (m)', factor: 1 },
  { value: 'in', label: 'Inches (in)', factor: 39.3701 },
  { value: 'ft', label: 'Feet (ft)', factor: 3.28084 },
  { value: 'yd', label: 'Yards (yd)', factor: 1.09361 },
];

export const GSM = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('cm');

  const calculateGSM = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const wt = parseFloat(weight);

    if (!l || !w || !wt || isNaN(l) || isNaN(w) || isNaN(wt)) return '0';

    const selectedUnit = UNITS.find(u => u.value === unit);
    const factor = selectedUnit ? selectedUnit.factor : 100;

    // Convert dimensions to meters
    // dimension_in_meters = dimension / factor
    const lengthM = l / factor;
    const widthM = w / factor;

    // Area in m²
    const areaM2 = lengthM * widthM;

    if (areaM2 === 0) return '0';

    // GSM = Weight (g) / Area (m²)
    return (wt / areaM2).toFixed(1);
  };

  const gsmValue = calculateGSM();
  const ozValue = (parseFloat(gsmValue) * 0.0294935).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">GSM</h2>
        <p className="text-slate-500 dark:text-slate-400">Calculate Grams per Square Meter based on sample dimensions and weight.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Sample Dimensions" />
          <CardContent className="space-y-5">
             {/* Length */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-slate-700 dark:text-slate-300">Length</label>
              <div className="col-span-9">
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
            </div>

            {/* Width */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-slate-700 dark:text-slate-300">Width</label>
              <div className="col-span-9">
                 <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
            </div>

            {/* Weight */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-slate-700 dark:text-slate-300">Weight</label>
              <div className="col-span-9 relative">
                 <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all pr-8"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <span className="absolute right-3 top-2.5 text-slate-400 dark:text-slate-500 text-sm font-medium">g</span>
              </div>
            </div>

            {/* Unit Dropdown */}
            <div className="grid grid-cols-12 gap-4 items-center pt-2">
              <label className="col-span-3 text-sm font-medium text-slate-700 dark:text-slate-300">Unit</label>
              <div className="col-span-9 relative">
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full appearance-none px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer pr-10"
                >
                  {UNITS.map((u) => (
                    <option key={u.value} value={u.value}>
                      {u.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500 dark:text-slate-400">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
            
          </CardContent>
        </Card>

        <Card className="h-full bg-gradient-to-br from-white to-emerald-50/50 dark:from-slate-900 dark:to-emerald-900/10">
          <CardHeader title="Result Analysis" />
          <CardContent className="flex flex-col items-center justify-center py-8">
            <ResultBox 
              label="Calculated GSM" 
              value={gsmValue} 
              unit="g/m²" 
              secondaryValue={`${ozValue} oz/yd²`}
            />
             <div className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs">
              <p className="mb-2">Formula:</p>
              <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300 text-xs">
                Weight (g) / (Length × Width) m²
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};