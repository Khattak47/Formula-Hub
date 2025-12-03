import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { ArrowRightLeft } from 'lucide-react';

const CONVERSIONS = {
  Length: {
    meters: 1,
    centimeters: 100,
    inches: 39.3701,
    yards: 1.09361,
    feet: 3.28084
  },
  Weight: {
    kilograms: 1,
    grams: 1000,
    pounds: 2.20462,
    ounces: 35.274
  },
  Area: {
    sq_meters: 1,
    sq_yards: 1.19599,
    sq_feet: 10.7639
  },
  Force: {
    newtons: 1,
    kilonewtons: 0.001,
    pound_force: 0.22481,
    kilogram_force: 0.10197,
    gram_force: 101.972
  }
};

const UNIT_SYMBOLS: Record<string, string> = {
  // Length
  meters: 'm',
  centimeters: 'cm',
  inches: 'in',
  yards: 'yd',
  feet: 'ft',
  // Weight
  kilograms: 'kg',
  grams: 'g',
  pounds: 'lb',
  ounces: 'oz',
  // Area
  sq_meters: 'm²',
  sq_yards: 'yd²',
  sq_feet: 'ft²',
  // Force
  newtons: 'N',
  kilonewtons: 'kN',
  pound_force: 'lbf',
  kilogram_force: 'kgf',
  gram_force: 'gf'
};

type Category = keyof typeof CONVERSIONS;

export const UnitConversion = () => {
  const [category, setCategory] = useState<Category>('Length');
  const [fromUnit, setFromUnit] = useState<string>('meters');
  const [toUnit, setToUnit] = useState<string>('inches');
  const [value, setValue] = useState<string>('1');

  const getUnits = (cat: Category) => Object.keys(CONVERSIONS[cat]);

  const result = (() => {
    const val = parseFloat(value);
    if (!val) return '---';
    
    const factors = CONVERSIONS[category] as Record<string, number>;
    // Base unit is always value 1 (e.g. meters)
    // Convert input to base: input / factor
    // Convert base to output: base * outFactor
    
    const baseValue = val / factors[fromUnit];
    const finalValue = baseValue * factors[toUnit];
    
    return finalValue.toFixed(4);
  })();

  const handleCategoryChange = (c: Category) => {
    setCategory(c);
    const units = Object.keys(CONVERSIONS[c]);
    setFromUnit(units[0]);
    setToUnit(units[1]);
    setValue('1');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Unit Converter</h2>
        <p className="text-slate-500 dark:text-slate-400">Quickly convert common textile and engineering measurements.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-wrap gap-2 w-fit">
        {(Object.keys(CONVERSIONS) as Category[]).map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              category === cat 
                ? 'bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-400' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <Card className="max-w-3xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 w-full space-y-4">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">From</label>
              <Input 
                label="" 
                type="number" 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
              />
              <select 
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
              >
                {getUnits(category).map(u => (
                  <option key={u} value={u}>{u.replace('_', ' ')}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center pt-6 text-slate-400 dark:text-slate-500">
              <ArrowRightLeft className="hidden md:block" />
              <ArrowRightLeft className="md:hidden rotate-90" />
            </div>

            <div className="flex-1 w-full space-y-4">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">To</label>
              <div className="w-full px-3 py-2.5 bg-brand-50 dark:bg-brand-900/20 border border-brand-100 dark:border-brand-900/30 rounded-lg text-brand-900 dark:text-brand-100 font-bold text-lg flex justify-between items-center">
                <span>{result}</span>
                <span className="text-sm font-normal text-brand-600 dark:text-brand-400 ml-2">{UNIT_SYMBOLS[toUnit]}</span>
              </div>
              <select 
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 text-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 outline-none"
              >
                {getUnits(category).map(u => (
                  <option key={u} value={u}>{u.replace('_', ' ')}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};