import React, { useState } from 'react';
import { Card, CardContent, CardHeader, ResultBox } from '../../components/ui/Card';
import { ChevronDown } from 'lucide-react';

const UNITS = [
  { value: 'cm', label: 'Centimeters (cm)', factor: 100 },
  { value: 'in', label: 'Inches (in)', factor: 39.3701 },
  { value: 'm', label: 'Meters (m)', factor: 1 },
  { value: 'mm', label: 'Millimeters (mm)', factor: 1000 },
  { value: 'yd', label: 'Yards (yd)', factor: 1.09361 },
];

export const PieceWeight = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [gsm, setGsm] = useState('');
  const [unit, setUnit] = useState('cm');

  const calculateWeight = () => {
    const l = parseFloat(length);
    const w = parseFloat(width);
    const g = parseFloat(gsm);

    if (!l || !w || !g || isNaN(l) || isNaN(w) || isNaN(g)) return { g: '0.0', kg: '0.00', lbs: '0.00' };

    const selectedUnit = UNITS.find(u => u.value === unit);
    const factor = selectedUnit ? selectedUnit.factor : 100;

    // Convert Dimensions to meters
    const lengthM = l / factor;
    const widthM = w / factor;

    // Area in m²
    const areaM2 = lengthM * widthM;

    // Total Weight in Grams = Area(m²) * GSM
    const weightG = areaM2 * g;

    return {
      g: weightG.toFixed(1),
      kg: (weightG / 1000).toFixed(2),
      lbs: (weightG * 0.00220462).toFixed(2)
    };
  };

  const getFormulaText = () => {
    switch(unit) {
      case 'cm': return '(Length × Width × GSM) / 10000';
      case 'in': return '(Length × Width × GSM) / 1550';
      case 'mm': return '(Length × Width × GSM) / 1,000,000';
      case 'm':  return 'Length × Width × GSM';
      case 'yd': return '(Length × Width × GSM) / 1.196';
      default:   return '(Length / F) × (Width / F) × GSM';
    }
  };

  const result = calculateWeight();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Piece Weight</h2>
        <p className="text-slate-500 dark:text-slate-400">Calculate fabric weight based on dimensions and GSM.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Specifications" />
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

            {/* GSM */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <label className="col-span-3 text-sm font-medium text-slate-700 dark:text-slate-300">GSM</label>
              <div className="col-span-9 relative">
                 <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all pr-12"
                  value={gsm}
                  onChange={(e) => setGsm(e.target.value)}
                />
                <span className="absolute right-3 top-2.5 text-slate-400 dark:text-slate-500 text-sm font-medium">g/m²</span>
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

        <Card className="h-full bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-900 dark:to-blue-900/10">
          <CardHeader title="Result Analysis" />
          <CardContent className="flex flex-col items-center justify-center py-8">
            <ResultBox 
              label="Total Weight" 
              value={result.g} 
              unit="g" 
              secondaryValue={`${result.kg} kg`}
            />
             <div className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs">
              <p className="mb-2">Formula:</p>
              <code className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded text-slate-700 dark:text-slate-300 text-xs font-mono block">
                {getFormulaText()}
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};