import React from 'react';
import { Molecule } from '../types';
import { useApp } from '../context/AppContext';
import { BarChart3, Binary, ArrowRight } from 'lucide-react';

interface MoleculeCardProps {
  molecule: Molecule;
}

export const MoleculeCard: React.FC<MoleculeCardProps> = ({ molecule }) => {
  const { compareIds, addToComparison, removeFromComparison, viewMoleculeDetails } = useApp();
  
  const isCompared = compareIds.includes(molecule.id);

  const handleCompareToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromComparison(molecule.id);
    } else {
      addToComparison(molecule.id);
    }
  };

  return (
    <div 
      onClick={() => viewMoleculeDetails(molecule.id)}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl dark:hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      id={`molecule-card-${molecule.id}`}
    >
      {/* Visual Canvas Area */}
      <div className="relative p-6 bg-slate-50 dark:bg-slate-950/40 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 h-44 overflow-hidden">
        {/* Render inline SVG */}
        <div 
          className="w-32 h-32 text-slate-800 dark:text-slate-100 transition-transform duration-300 group-hover:scale-110"
          dangerouslySetInnerHTML={{ __html: molecule.svgStructure }}
        />
        
        {/* Molecule Formula tag */}
        <span className="absolute top-4 right-4 px-2 py-1 bg-slate-900/10 dark:bg-slate-100/10 rounded-md text-xs font-bold font-mono text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
          {molecule.formula}
        </span>
      </div>

      {/* Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {molecule.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-[180px]">
                {molecule.iupacName}
              </p>
            </div>
            {/* Compare checkbox */}
            <button
              onClick={handleCompareToggle}
              className={`px-2.5 py-1 text-2xs font-bold rounded-lg uppercase tracking-wider transition-all border ${
                isCompared
                  ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500'
                  : 'text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800 hover:text-slate-600 dark:hover:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              {isCompared ? 'Comparing' : '+ Compare'}
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mt-4 border-t border-slate-100 dark:border-slate-800/60 pt-4">
            <div className="flex items-center gap-2">
              <Binary className="w-4 h-4 text-slate-450 dark:text-slate-500" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold leading-none">Weight</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono mt-0.5">
                  {molecule.molecularWeight.toFixed(2)} g/mol
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-slate-450 dark:text-slate-500" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold leading-none">HOMO-LUMO</p>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-mono mt-0.5">
                  {molecule.homoLumoGap.toFixed(1)} eV
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-150 dark:border-slate-800/40 flex items-center justify-between text-xs font-bold text-teal-600 dark:text-teal-400">
          <span>Run Simulation</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};
