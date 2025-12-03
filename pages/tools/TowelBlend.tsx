import React, { useState } from 'react';
import { Card, CardContent, CardHeader, ResultBox } from '../../components/ui/Card';
import { ChevronDown } from 'lucide-react';

interface RowDef {
  id: string;
  label: string;
}

const RATIO_ROWS: RowDef[] = [
  { id: 'pile', label: 'Pile' },
  { id: 'ground', label: 'Ground' },
  { id: 'weft', label: 'Weft' },
  { id: 'fancy', label: 'Fancy' },
  { id: 'endHem', label: 'End Hem' },
];

const WEIGHT_ROWS: RowDef[] = [
  { id: 'fancy1', label: 'Fancy 1' },
  { id: 'fancy2', label: 'Fancy 2' },
  { id: 'endHem1', label: 'End Hem 1' },
  { id: 'endHem2', label: 'End Hem 2' },
  { id: 'body', label: 'Body' },
];

interface RowData {
  input: string; // Ratio or Weight
  cotton: string;
}

interface BlendCalculatorProps {
  title: string;
  description: string;
  rows: RowDef[];
  inputLabel: string;
  themeColor: 'amber' | 'blue';
}

const BlendCalculator: React.FC<BlendCalculatorProps> = ({ 
  title, 
  description, 
  rows, 
  inputLabel,
  themeColor 
}) => {
  const [data, setData] = useState<Record<string, RowData>>(
    rows.reduce((acc, curr) => ({ ...acc, [curr.id]: { input: '', cotton: '' } }), {})
  );

  const updateField = (id: string, field: keyof RowData, value: string) => {
    setData(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const calculateBlend = () => {
    let totalInput = 0;
    let totalCottonParts = 0;

    Object.values(data).forEach((row: RowData) => {
      const inp = parseFloat(row.input);
      const c = parseFloat(row.cotton);
      
      if (!isNaN(inp) && inp > 0) {
        totalInput += inp;
        if (!isNaN(c)) {
          totalCottonParts += inp * (c / 100);
        }
      }
    });

    if (totalInput === 0) return { cotton: '0.00', poly: '0.00', total: '0' };

    const overallCotton = (totalCottonParts / totalInput) * 100;
    
    return {
      cotton: overallCotton.toFixed(2),
      poly: (100 - overallCotton).toFixed(2),
      total: totalInput.toFixed(2)
    };
  };

  const result = calculateBlend();
  const accentColor = themeColor === 'amber' ? 'text-amber-600' : 'text-blue-600';
  const barColor = themeColor === 'amber' ? 'bg-amber-500' : 'bg-blue-500';
  const headerBg = themeColor === 'amber' 
    ? 'bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-900 dark:to-amber-900/10' 
    : 'bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-900 dark:to-blue-900/10';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
      <Card className="lg:col-span-2">
        <CardHeader title={title} description={description} />
        <CardContent>
          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-800">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Component</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">{inputLabel}</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Cotton %</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">Poly %</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-200 dark:divide-slate-800">
                {rows.map((row) => {
                  const cottonVal = parseFloat(data[row.id]?.cotton);
                  const polyVal = !isNaN(cottonVal) ? (100 - cottonVal).toFixed(1) : '-';
                  
                  return (
                    <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-slate-100">
                        {row.label}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                          placeholder="0"
                          value={data[row.id]?.input || ''}
                          onChange={(e) => updateField(row.id, 'input', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <input
                          type="number"
                          className="w-full px-3 py-1.5 text-sm border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none transition-all"
                          placeholder="0"
                          value={data[row.id]?.cotton || ''}
                          onChange={(e) => updateField(row.id, 'cotton', e.target.value)}
                        />
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                        {polyVal}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-800 font-medium">
                <tr>
                  <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-300">Total {inputLabel}</td>
                  <td className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100 font-bold">{result.total}</td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className={`${headerBg} h-full`}>
        <CardHeader title="Composition Result" />
        <CardContent className="flex flex-col items-center justify-center py-8 space-y-6">
          <ResultBox 
            label="Cotton" 
            value={result.cotton} 
            unit="%" 
          />
          
          <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
          
          <ResultBox 
            label="Polyester" 
            value={result.poly} 
            unit="%" 
          />

          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-4 mt-4 overflow-hidden flex shadow-inner">
            <div 
              className={`${themeColor === 'amber' ? 'bg-amber-600' : 'bg-blue-600'} h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold`} 
              style={{ width: `${parseFloat(result.cotton)}%` }}
            >
              {parseFloat(result.cotton) > 15 && 'C'}
            </div>
            <div 
              className={`${themeColor === 'amber' ? 'bg-orange-400' : 'bg-sky-400'} h-full transition-all duration-500 flex items-center justify-center text-[10px] text-white font-bold`} 
              style={{ width: `${parseFloat(result.poly)}%` }}
            >
              {parseFloat(result.poly) > 15 && 'P'}
            </div>
          </div>
          <div className="flex justify-between w-full text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Cotton</span>
            <span>Polyester</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export const TowelBlend = () => {
  const [mode, setMode] = useState<'ratio' | 'weight'>('ratio');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Overall Towel Blend</h2>
          <p className="text-slate-500 dark:text-slate-400">Calculate composition based on {mode}.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:border-brand-200 dark:hover:border-brand-800 hover:shadow-md group">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Blend by:</span>
            <div className="relative">
              <select 
                  value={mode}
                  onChange={(e) => setMode(e.target.value as 'ratio' | 'weight')}
                  className="appearance-none bg-transparent font-bold text-brand-600 dark:text-brand-400 pr-8 focus:outline-none cursor-pointer text-sm"
              >
                  <option value="ratio" className="dark:bg-slate-800">Ratio</option>
                  <option value="weight" className="dark:bg-slate-800">Weight</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-brand-600 dark:text-brand-400">
                <ChevronDown size={14} strokeWidth={3} />
              </div>
            </div>
        </div>
      </div>

      <div className="animate-fadeIn">
        {mode === 'ratio' ? (
            <BlendCalculator 
                title="Blend by Ratio" 
                description="Calculate using yarn ratios (Pile, Ground, Weft, etc.)"
                rows={RATIO_ROWS}
                inputLabel="Ratio"
                themeColor="amber"
            />
        ) : (
            <BlendCalculator 
                title="Blend by Weight" 
                description="Calculate using component weights (Fancy, End Hem, Body)"
                rows={WEIGHT_ROWS}
                inputLabel="Weight (g)"
                themeColor="blue"
            />
        )}
      </div>
    </div>
  );
};