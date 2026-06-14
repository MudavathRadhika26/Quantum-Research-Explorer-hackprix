import React, { useState } from 'react';
import { Molecule } from '../types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface PropertyChartProps {
  molecules: Molecule[];
}

type PropertyKey = 'molecularWeight' | 'homoLumoGap' | 'dipoleMoment';

export const PropertyChart: React.FC<PropertyChartProps> = ({ molecules }) => {
  const [activeProperty, setActiveProperty] = useState<PropertyKey>('homoLumoGap');

  if (molecules.length === 0) {
    return (
      <div className="w-full flex items-center justify-center h-64 border border-dashed border-slate-350 dark:border-slate-800 rounded-2xl">
        <p className="text-sm text-slate-500">No molecules selected for visualization.</p>
      </div>
    );
  }

  const chartData = molecules.map((m) => ({
    name: m.name,
    formula: m.formula,
    value: m[activeProperty]
  }));

  const getPropertyInfo = () => {
    switch (activeProperty) {
      case 'molecularWeight':
        return { label: 'Molecular Weight', unit: 'g/mol', color: '#0f766e' };
      case 'homoLumoGap':
        return { label: 'HOMO-LUMO Energy Gap', unit: 'eV', color: '#14b8a6' };
      case 'dipoleMoment':
        return { label: 'Dipole Moment', unit: 'Debye', color: '#6366f1' };
    }
  };

  const info = getPropertyInfo();

  // Custom tooltips
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/90 text-white p-3 rounded-xl border border-slate-850 font-sans shadow-lg text-xs leading-relaxed">
          <p className="font-bold">{data.name} ({data.formula})</p>
          <p className="mt-1 font-mono text-teal-400">
            {info.label}: {data.value.toFixed(3)} {info.unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full flex flex-col gap-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm" id="property-chart-container">
      {/* Chart controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
        <div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-105">
            Property Distribution
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Visualizing molecular parameters comparatively.
          </p>
        </div>
        
        {/* Toggle buttons */}
        <div className="flex rounded-xl bg-slate-100 dark:bg-slate-950 p-1 self-stretch sm:self-auto">
          <button
            onClick={() => setActiveProperty('homoLumoGap')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeProperty === 'homoLumoGap'
                ? 'bg-white dark:bg-slate-850 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-450 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            HOMO-LUMO Gap
          </button>
          <button
            onClick={() => setActiveProperty('molecularWeight')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeProperty === 'molecularWeight'
                ? 'bg-white dark:bg-slate-850 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-450 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Weight
          </button>
          <button
            onClick={() => setActiveProperty('dipoleMoment')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeProperty === 'dipoleMoment'
                ? 'bg-white dark:bg-slate-850 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-450 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Dipole Moment
          </button>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
            <XAxis 
              dataKey="name" 
              stroke="rgba(148, 163, 184, 0.6)" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="rgba(148, 163, 184, 0.6)" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(20, 184, 166, 0.04)' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {chartData.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={activeProperty === 'dipoleMoment' ? '#6366f1' : '#14b8a6'} 
                  fillOpacity={0.85}
                  className="transition-all duration-300 hover:fill-opacity-100"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
