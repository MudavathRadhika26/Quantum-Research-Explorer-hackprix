import React from 'react';
import { Molecule } from '../types';
import { useApp } from '../context/AppContext';
import { X, Play, ArrowRightLeft } from 'lucide-react';

interface ComparisonTableProps {
  molecules: Molecule[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ molecules }) => {
  const { removeFromComparison, viewMoleculeDetails, clearComparison } = useApp();

  if (molecules.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-12 border border-dashed border-slate-250 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm text-center">
        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-full text-slate-400 mb-3">
          <ArrowRightLeft className="w-8 h-8" />
        </div>
        <h4 className="text-base font-bold text-slate-800 dark:text-slate-250">No Molecules Selected</h4>
        <p className="text-xs text-slate-500 max-w-xs mt-1">
          Select compounds from the Explorer grid using the "+ Compare" buttons to inspect their physical characteristics side-by-side.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4" id="comparison-table-wrapper">
      {/* Header with clear action */}
      <div className="flex justify-between items-center px-1">
        <p className="text-xs font-semibold text-slate-500">
          Comparing <span className="text-teal-650 dark:text-teal-400 font-bold">{molecules.length}</span> compounds
        </p>
        <button
          onClick={clearComparison}
          className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-wider"
        >
          Clear All
        </button>
      </div>

      {/* Responsive Grid Table layout */}
      <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
        <table className="w-full border-collapse text-left min-w-[600px]">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800">
              <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider w-1/5">Property</th>
              {molecules.map((mol) => (
                <th key={mol.id} className="p-4 text-sm font-bold text-slate-800 dark:text-slate-150 relative">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">{mol.name}</span>
                    <button
                      onClick={() => removeFromComparison(mol.id)}
                      className="p-1 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-650 dark:hover:text-slate-300 transition-colors"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
            {/* Visual structure row */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">Structure</td>
              {molecules.map((mol) => (
                <td key={mol.id} className="p-4 bg-slate-50/40 dark:bg-slate-950/20">
                  <div className="w-20 h-20 flex items-center justify-center">
                    <div 
                      className="w-16 h-16 text-slate-800 dark:text-slate-100"
                      dangerouslySetInnerHTML={{ __html:  mol.svgStructure }}
                    />
                  </div>
                </td>
              ))}
            </tr>

            {/* Formula */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">Chemical Formula</td>
              {molecules.map((mol) => (
                <td key={mol.id} className="p-4 font-mono font-bold text-teal-600 dark:text-teal-400">
                  {mol.formula}
                </td>
              ))}
            </tr>

            {/* IUPAC */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">IUPAC Name</td>
              {molecules.map((mol) => (
                <td key={mol.id} className="p-4 text-slate-700 dark:text-slate-300 italic">
                  {mol.iupacName}
                </td>
              ))}
            </tr>

            {/* Molecular Weight */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">Molecular Weight</td>
              {molecules.map((mol) => (
                <td key={mol.id} className="p-4 font-mono font-medium">
                  {mol.molecularWeight.toFixed(3)} g/mol
                </td>
              ))}
            </tr>

            {/* HOMO LUMO */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">HOMO-LUMO Energy Gap</td>
              {molecules.map((mol) => (
                <td key={mol.id} className="p-4 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                  {mol.homoLumoGap.toFixed(2)} eV
                </td>
              ))}
            </tr>

            {/* Dipole Moment */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">Dipole Moment</td>
              {molecules.map((mol) => (
                <td key={mol.id} className="p-4 font-mono">
                  {mol.dipoleMoment.toFixed(2)} Debye
                </td>
              ))}
            </tr>

            {/* Melting Point */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">Melting Point</td>
              {molecules.map((mol) => (
                <td key={mol.id} className="p-4">
                  {mol.meltingPoint}
                </td>
              ))}
            </tr>

            {/* Boiling Point */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">Boiling Point</td>
              {molecules.map((mol) => (
                <td key={mol.id} className="p-4">
                  {mol.boilingPoint}
                </td>
              ))}
            </tr>

            {/* SMILES */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">SMILES String</td>
              {molecules.map((mol) => (
                <td key={mol.id} className="p-4 font-mono text-2xs truncate max-w-[120px]" title={mol.smiles}>
                  {mol.smiles}
                </td>
              ))}
            </tr>

            {/* Simulation trigger */}
            <tr>
              <td className="p-4 font-semibold text-slate-500 dark:text-slate-400">Actions</td>
              {molecules.map((mol) => (
                <td key={mol.id} className="p-4">
                  <button
                    onClick={() => viewMoleculeDetails(mol.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-teal-600 dark:text-teal-400 rounded-lg text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-150 active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-teal-500/10" />
                    <span>Run DFT</span>
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
