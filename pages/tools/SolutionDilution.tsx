import React, { useState } from 'react';
import { Card, CardContent, CardHeader, ResultBox } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { ChevronDown, FlaskConical } from 'lucide-react';

export const SolutionDilution = () => {
  // Tab state
  const [activeTab, setActiveTab] = useState<'solution' | 'dilution'>('solution');

  // Solution State (New Fields)
  const [chemDosage, setChemDosage] = useState('');
  const [targetVolume, setTargetVolume] = useState('');
  const [volUnit, setVolUnit] = useState('L');

  // Dilution State
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');
  const [v2, setV2] = useState('');

  const calcSolution = () => {
    const dosage = parseFloat(chemDosage);
    const vol = parseFloat(targetVolume);

    if (!dosage || !vol || isNaN(dosage) || isNaN(vol)) {
      return { reqChem: '0.00', instructions: 'Enter dosage and volume to see instructions.' };
    }

    // Convert volume to Liters for calculation (Dosage is g/L)
    let volInLiters = vol;
    if (volUnit === 'ml') volInLiters = vol / 1000;
    if (volUnit === 'gal') volInLiters = vol * 3.78541;

    // Required Chemical (g) = Dosage (g/L) * Volume (L)
    const reqChem = dosage * volInLiters;

    return {
      reqChem: reqChem.toFixed(2),
      instructions: `Dissolve ${reqChem.toFixed(2)}g of chemical in some water, then add water to reach a final volume of ${vol} ${volUnit}.`
    };
  };

  const calcDilution = () => {
    // C1V1 = C2V2 => V1 = (C2 * V2) / C1
    const conc1 = parseFloat(c1); // Chemical Concentration
    const conc2 = parseFloat(c2); // Target Concentration
    const vol2 = parseFloat(v2);  // Target Volume

    if (!conc1 || !conc2 || !vol2 || conc1 === 0) {
        return { 
            reqChem: '0.00', 
            reqWater: '0.00', 
            instructions: 'Enter concentrations and volume to see instructions.'
        };
    }
    
    if (conc2 >= conc1) {
        return { 
            reqChem: 'Error', 
            reqWater: 'Error', 
            error: 'Target conc > Chemical conc',
            instructions: 'Target concentration cannot be higher than chemical concentration.'
        };
    }
    
    // V1 = (C2 * V2) / C1
    const v1 = (conc2 * vol2) / conc1;
    const water = vol2 - v1;
    
    return {
        reqChem: v1.toFixed(2),
        reqWater: water.toFixed(2),
        instructions: `Take ${v1.toFixed(2)}ml of chemical and add ${water.toFixed(2)}ml of water to make ${vol2}ml of solution.`
    };
  };

  const dilutionResult = calcDilution();
  const { reqChem, instructions } = calcSolution();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Solution Calculator</h2>
        <p className="text-slate-500 dark:text-slate-400">Prepare solutions and calculate dilutions.</p>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-800">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('solution')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'solution'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            Solution Preparation
          </button>
          <button
            onClick={() => setActiveTab('dilution')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'dilution'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
          >
            Dilution
          </button>
        </nav>
      </div>

      {activeTab === 'solution' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          <Card>
            <CardHeader title="Recipe Parameters" description="Enter concentration and target volume." />
            <CardContent className="space-y-6">
              <Input 
                label="Chemical Dosage (Concentration)" 
                placeholder="e.g. 50" 
                type="number" 
                unit="g/L"
                value={chemDosage}
                onChange={(e) => setChemDosage(e.target.value)}
              />
              
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Required Solution</label>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <input 
                            type="number"
                            placeholder="e.g. 10"
                            className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                            value={targetVolume}
                            onChange={(e) => setTargetVolume(e.target.value)}
                        />
                    </div>
                    <div className="w-32 relative">
                        <select
                            value={volUnit}
                            onChange={(e) => setVolUnit(e.target.value)}
                            className="w-full appearance-none px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all cursor-pointer font-medium"
                        >
                            <option value="L">Liters</option>
                            <option value="ml">ml</option>
                            <option value="gal">Gallons</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 text-slate-400 pointer-events-none" size={16} />
                    </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-900 dark:to-purple-900/10 flex flex-col">
            <CardHeader title="Result" />
            <CardContent className="flex-1 flex flex-col items-center justify-center py-6 space-y-6">
              <ResultBox label="Required Chemical" value={reqChem} unit="g" />
              
              <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm w-full max-w-sm">
                 <div className="flex items-start gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg shrink-0 mt-0.5">
                        <FlaskConical size={18} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Preparation</p>
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {instructions}
                        </p>
                    </div>
                 </div>
              </div>

               <div className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs">
                <p className="mb-2">Formula:</p>
                <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300 text-xs">
                  Chemical (g) = Dosage (g/L) × Volume (L)
                </code>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          <Card>
            <CardHeader title="Parameters" description="Stock concentration and target." />
            <CardContent className="space-y-4">
              <Input 
                label="Chemical Concentration" 
                placeholder="e.g. 100" 
                type="number" 
                unit="%"
                value={c1}
                onChange={(e) => setC1(e.target.value)}
              />
              <Input 
                label="Target Concentration" 
                placeholder="e.g. 10" 
                type="number" 
                unit="%"
                value={c2}
                onChange={(e) => setC2(e.target.value)}
              />
              <Input 
                label="Target Volume" 
                placeholder="e.g. 1000" 
                type="number" 
                unit="ml"
                value={v2}
                onChange={(e) => setV2(e.target.value)}
              />
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-white to-purple-50/50 dark:from-slate-900 dark:to-purple-900/10">
            <CardHeader title="Recipe" />
            <CardContent className="flex flex-col items-center justify-center py-8">
               <div className="grid grid-cols-2 gap-4 w-full mb-6">
                 <ResultBox 
                    label="Required Chemical" 
                    value={dilutionResult.reqChem} 
                    unit="ml" 
                    secondaryValue={dilutionResult.error}
                 />
                 <ResultBox 
                    label="Required Water" 
                    value={dilutionResult.reqWater} 
                    unit="ml" 
                 />
               </div>
               
               <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm w-full max-w-sm mb-6">
                  <div className="flex items-start gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 rounded-lg shrink-0 mt-0.5">
                          <FlaskConical size={18} />
                      </div>
                      <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Preparation</p>
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                              {dilutionResult.instructions}
                          </p>
                      </div>
                  </div>
               </div>

               <div className="mt-2 text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs">
                <p className="mb-2">Formula:</p>
                <div className="space-y-1">
                    <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300 text-xs block">
                      V₁ = (C₂ × V₂) / C₁
                    </code>
                     <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-700 dark:text-slate-300 text-xs block">
                      Water = V₂ - V₁
                    </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};