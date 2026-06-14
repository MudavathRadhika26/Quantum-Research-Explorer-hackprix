import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MoleculeSearch } from '../components/MoleculeSearch';
import { MoleculeCard } from '../components/MoleculeCard';
import { PropertyChart } from '../components/PropertyChart';
import { Molecule } from '../types';
import { AlertCircle } from 'lucide-react';

export const Explorer: React.FC = () => {
  const { molecules, isLoadingMolecules } = useApp();
  const [filteredMolecules, setFilteredMolecules] = useState<Molecule[]>([]);

  const handleFilterChange = (filtered: Molecule[]) => {
    setFilteredMolecules(filtered);
  };

  return (
    <div className="flex flex-col gap-8" id="explorer-page">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-850 dark:text-slate-50 tracking-tight">
          Quantum Chemistry Explorer
        </h1>
        <p className="text-sm text-slate-550 dark:text-slate-400 mt-1 max-w-2xl">
          Search the compound repository and apply filter parameters like molecular mass and orbital gap energy.
          Perform comparative analysis or run quantum DFT optimizations.
        </p>
      </div>

      {/* Search and Filters */}
      <MoleculeSearch molecules={molecules} onFilterChange={handleFilterChange} />

      {/* Split grid for comparative charts & card grids */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Molecule list grid (Left) */}
        <div className="xl:col-span-8 order-2 xl:order-1 flex flex-col gap-6">
          {isLoadingMolecules ? (
            <div className="w-full flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-800 border-t-teal-500 animate-spin"></div>
              <p className="mt-4 text-xs font-semibold text-slate-500">Loading molecule database...</p>
            </div>
          ) : filteredMolecules.length === 0 ? (
            <div className="w-full p-12 border border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 text-center flex flex-col items-center">
              <AlertCircle className="w-8 h-8 text-rose-500 mb-3" />
              <h4 className="text-sm font-bold text-slate-805 dark:text-slate-250">No Compounds Found</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Try loosening your filter constraints or modifying your search term queries.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredMolecules.map((molecule) => (
                <MoleculeCard key={molecule.id} molecule={molecule} />
              ))}
            </div>
          )}
        </div>

        {/* Live property chart (Right) */}
        <div className="xl:col-span-4 order-1 xl:order-2 xl:sticky xl:top-24">
          <PropertyChart molecules={filteredMolecules} />
        </div>
      </div>
    </div>
  );
};
