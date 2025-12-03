import React, { useState } from 'react';
import { Card, CardContent, CardHeader, ResultBox } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Plus, Trash2, Droplets } from 'lucide-react';

export const LintLoss = () => {
  const [towelWeight, setTowelWeight] = useState('');
  const [lintWeights, setLintWeights] = useState<string[]>(['']); // Start with 1 wash

  const addWash = () => {
    if (lintWeights.length < 10) {
      setLintWeights([...lintWeights, '']);
    }
  };

  const removeWash = (index: number) => {
    const newWeights = [...lintWeights];
    newWeights.splice(index, 1);
    setLintWeights(newWeights);
  };

  const updateLintWeight = (index: number, value: string) => {
    const newWeights = [...lintWeights];
    newWeights[index] = value;
    setLintWeights(newWeights);
  };

  const calculateResults = () => {
    const initialWeight = parseFloat(towelWeight);
    if (!initialWeight || isNaN(initialWeight)) {
      return { totalLoss: '0.00', breakdown: [], totalLint: 0 };
    }

    let totalLint = 0;
    const breakdown = lintWeights.map((w, index) => {
      const weight = parseFloat(w);
      if (isNaN(weight) || weight <= 0) return { id: index + 1, weight: 0, percentage: '0.00' };
      
      totalLint += weight;
      const percentage = (weight / initialWeight) * 100;
      return {
        id: index + 1,
        weight: weight,
        percentage: percentage.toFixed(2)
      };
    });

    const totalLoss = (totalLint / initialWeight) * 100;

    return {
      totalLoss: totalLoss.toFixed(2),
      breakdown,
      totalLint: totalLint.toFixed(2)
    };
  };

  const { totalLoss, breakdown, totalLint } = calculateResults();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Lint Loss Calculator</h2>
        <p className="text-slate-500 dark:text-slate-400">Calculate lint loss percentage over multiple wash cycles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Weight Measurements" />
          <CardContent className="space-y-6">
            <div className="bg-brand-50/50 dark:bg-brand-900/20 p-4 rounded-xl border border-brand-100 dark:border-brand-900/30">
              <Input 
                label="Original Towel Weight" 
                placeholder="e.g. 500" 
                type="number" 
                unit="g"
                value={towelWeight}
                onChange={(e) => setTowelWeight(e.target.value)}
                className="font-medium"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide">Wash Cycles</label>
                <span className="text-xs text-slate-400 dark:text-slate-500">{lintWeights.length} / 10 Washes</span>
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {lintWeights.map((weight, index) => (
                  <div key={index} className="flex gap-2 items-end animate-fadeIn">
                    <div className="flex-1">
                      <Input 
                        label={index === 0 ? "1st Wash Lint Weight" : index === 1 ? "2nd Wash Lint Weight" : index === 2 ? "3rd Wash Lint Weight" : `${index + 1}th Wash Lint Weight`} 
                        placeholder="0" 
                        type="number"
                        unit="g"
                        value={weight}
                        onChange={(e) => updateLintWeight(index, e.target.value)}
                      />
                    </div>
                    {lintWeights.length > 1 && (
                      <button 
                        onClick={() => removeWash(index)}
                        className="mb-1 p-2.5 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-lg transition-colors"
                        title="Remove Wash"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {lintWeights.length < 10 && (
                <button 
                  onClick={addWash}
                  className="w-full py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-slate-400 hover:border-brand-300 dark:hover:border-brand-600 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all flex items-center justify-center gap-2 font-medium text-sm mt-2"
                >
                  <Plus size={16} /> Add Next Wash
                </button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="h-full bg-gradient-to-br from-white to-orange-50/30 dark:from-slate-900 dark:to-orange-900/10 flex flex-col">
          <CardHeader title="Loss Analysis" />
          <CardContent className="flex-1 flex flex-col">
            <div className="mb-8">
                <ResultBox 
                    label="Total Lint Loss" 
                    value={totalLoss} 
                    unit="%" 
                    secondaryValue={`Total Lint: ${totalLint}g`}
                />
            </div>

            <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 px-1">Wash Breakdown</h4>
                {breakdown.length > 0 && parseFloat(totalLoss) > 0 ? (
                    <div className="space-y-3">
                        {breakdown.map((item) => (
                            item.weight > 0 && (
                                <div key={item.id} className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 flex items-center justify-center text-xs font-bold">
                                            {item.id}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">Wash {item.id}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.weight}g lint collected</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{item.percentage}%</span>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                ) : (
                    <div className="h-32 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                        <Droplets size={24} className="mb-2 opacity-50" />
                        <span className="text-sm">Enter weights to see breakdown</span>
                    </div>
                )}
            </div>
            
            <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
                <p className="text-xs text-slate-400 dark:text-slate-500">
                    Formula: (Lint Weight / Original Weight) × 100
                </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};