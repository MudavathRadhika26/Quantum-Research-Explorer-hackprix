import React from 'react';
import { useApp } from '../context/AppContext';
import { SimulationPanel } from '../components/SimulationPanel';
import { ArrowLeft, Beaker, FileText, Activity } from 'lucide-react';

export const MoleculeDetail: React.FC = () => {
  const { molecules, selectedMoleculeId, setPage } = useApp();

  const molecule = molecules.find((m) => m.id === selectedMoleculeId);

  if (!molecule) {
    return (
      <div className="p-8 text-center" id="molecule-detail-notfound">
        <p className="text-slate-500">No molecule selected.</p>
        <button
          onClick={() => setPage('explorer')}
          className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-xl text-sm font-semibold hover:bg-teal-650 transition-colors"
        >
          Return to Explorer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8" id="molecule-detail-page">
      {/* Top back actions bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPage('explorer')}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-500 dark:text-slate-400 transition-all active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-2xs font-bold font-mono text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
            {molecule.formula}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-850 dark:text-slate-50 tracking-tight mt-1">
            {molecule.name} Details
          </h1>
        </div>
      </div>

      {/* Core Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Molecule Overview (Left Column) */}
        <div className="xl:col-span-4 flex flex-col gap-6 xl:sticky xl:top-24">
          {/* Structure Preview Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col items-center">
            <div className="w-48 h-48 flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-2xl">
              <div 
                className="w-40 h-40 text-slate-800 dark:text-slate-100"
                dangerouslySetInnerHTML={{ __html: molecule.svgStructure }}
              />
            </div>
            <h3 className="mt-4 text-lg font-bold text-slate-850 dark:text-slate-100">
              2D Chemical Geometry
            </h3>
            <p className="text-xs text-slate-450 dark:text-slate-500 font-mono text-center mt-1">
              SMILES: {molecule.smiles}
            </p>
          </div>

          {/* Properties Details Card */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-455 font-mono border-b border-slate-100 dark:border-slate-800/80 pb-2.5">
              Molecular Physical Data
            </h3>
            
            <div className="flex flex-col gap-3.5 text-xs sm:text-sm">
              <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800/30 pb-2">
                <span className="text-slate-400 font-medium">IUPAC Name</span>
                <span className="text-slate-700 dark:text-slate-300 font-semibold italic text-right truncate max-w-[180px]">
                  {molecule.iupacName}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800/30 pb-2">
                <span className="text-slate-400 font-medium">Molecular Weight</span>
                <span className="text-slate-750 dark:text-slate-350 font-bold font-mono">
                  {molecule.molecularWeight.toFixed(3)} g/mol
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800/30 pb-2">
                <span className="text-slate-400 font-medium">HOMO-LUMO Gap</span>
                <span className="text-slate-750 dark:text-slate-350 font-bold font-mono text-teal-600 dark:text-teal-400">
                  {molecule.homoLumoGap.toFixed(2)} eV
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800/30 pb-2">
                <span className="text-slate-400 font-medium">Dipole Moment</span>
                <span className="text-slate-750 dark:text-slate-350 font-bold font-mono">
                  {molecule.dipoleMoment.toFixed(2)} Debye
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800/30 pb-2">
                <span className="text-slate-400 font-medium">Melting Point</span>
                <span className="text-slate-750 dark:text-slate-350 font-medium">
                  {molecule.meltingPoint}
                </span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-slate-400 font-medium">Boiling Point</span>
                <span className="text-slate-750 dark:text-slate-350 font-medium">
                  {molecule.boilingPoint}
                </span>
              </div>
            </div>
          </div>

          {/* Scientific Abstract */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col gap-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-455 font-mono flex items-center gap-2">
              <FileText className="w-4 h-4 text-teal-500" />
              <span>Chemical Abstract</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
              {molecule.description}
            </p>
          </div>
        </div>

        {/* Simulation Dashboard (Right Column) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          <SimulationPanel molecule={molecule} />
        </div>
      </div>
    </div>
  );
};
