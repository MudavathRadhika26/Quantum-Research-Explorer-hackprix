import React from 'react';
import { useApp } from '../context/AppContext';
import { ComparisonTable } from '../components/ComparisonTable';
import { PropertyChart } from '../components/PropertyChart';
import { AlertCircle } from 'lucide-react';

export const Comparison: React.FC = () => {
  const { molecules, compareIds, setPage } = useApp();

  const comparedMolecules = molecules.filter((m) => compareIds.includes(m.id));

  return (
    <div className="flex flex-col gap-8" id="comparison-page">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-850 dark:text-slate-50 tracking-tight">
          Compound Comparative Ledger
        </h1>
        <p className="text-sm text-slate-550 dark:text-slate-400 mt-1 max-w-2xl">
          Side-by-side molecular analysis ledger. Select up to 4 elements from the Explorer to compare physical parameters, orbital configurations, and properties.
        </p>
      </div>

      {comparedMolecules.length === 0 ? (
        <div className="p-12 border border-dashed border-slate-350 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-center flex flex-col items-center">
          <AlertCircle className="w-8 h-8 text-rose-500 mb-3" />
          <h4 className="text-sm font-bold text-slate-805 dark:text-slate-250">No Molecules Selected</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Head over to the Explorer grid and check the comparative toggles on molecules to visualize them here.
          </p>
          <button
            onClick={() => setPage('explorer')}
            className="mt-6 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md"
          >
            Go to Explorer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main comparison table (Left) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <ComparisonTable molecules={comparedMolecules} />
          </div>

          {/* Interactive Comparison charts (Right) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <PropertyChart molecules={comparedMolecules} />
          </div>
        </div>
      )}
    </div>
  );
};
