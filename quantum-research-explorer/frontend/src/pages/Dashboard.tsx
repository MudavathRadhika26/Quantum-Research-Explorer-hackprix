import React from 'react';
import { useApp } from '../context/AppContext';
import { Database, FileText, ArrowRightLeft, Sparkles, Plus, Play } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { molecules, extractions, compareIds, setPage, viewMoleculeDetails } = useApp();

  // Find a featured molecule to showcase (e.g. Benzene or Caffeine)
  const featuredMolecule = molecules.find(m => m.id === 'caffeine') || molecules[0];

  return (
    <div className="flex flex-col gap-8" id="dashboard-page">
      {/* Hero Welcome banner */}
      <div className="glass p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 text-xs font-bold w-fit mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DFT & OCR Full-Stack Core v1.0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-850 dark:text-slate-50 tracking-tight leading-tight">
            Quantum Research Explorer
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            Accelerate chemical discovery by merging multimodal AI document ingestion with local quantum chemistry modeling. Scan publications and model energy states instantly.
          </p>
        </div>
        
        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <button
            onClick={() => setPage('upload')}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-650 text-white font-bold text-sm shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Upload File</span>
          </button>
          <button
            onClick={() => setPage('explorer')}
            className="flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-905 dark:bg-slate-800 hover:bg-slate-850 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold text-sm shadow-md active:scale-95 transition-all"
          >
            <span>Explore Molecules</span>
          </button>
        </div>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat 1 */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/40 text-teal-550 dark:text-teal-400 rounded-xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xs font-bold text-slate-400 uppercase tracking-wider leading-none">Molecules Seeded</p>
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1 font-mono">
              {molecules.length}
            </h3>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xs font-bold text-slate-400 uppercase tracking-wider leading-none">AI Ingest History</p>
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1 font-mono">
              {extractions.length}
            </h3>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 dark:text-emerald-400 rounded-xl">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xs font-bold text-slate-400 uppercase tracking-wider leading-none">Active Comparison</p>
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1 font-mono">
              {compareIds.length} / 4
            </h3>
          </div>
        </div>
      </div>

      {/* Featured Molecule & Recent Extractions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Featured Molecule Card (Left) */}
        {featuredMolecule && (
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-lg uppercase tracking-wide">
                  Showcase compound
                </span>
                <span className="font-mono text-slate-405 dark:text-slate-500 text-xs font-bold">{featuredMolecule.formula}</span>
              </div>
              
              <h3 className="text-xl font-extrabold text-slate-850 dark:text-slate-100 mt-4">
                {featuredMolecule.name}
              </h3>
              <p className="text-2xs text-slate-450 dark:text-slate-500 font-mono mt-0.5">{featuredMolecule.iupacName}</p>
              
              <p className="mt-3.5 text-xs sm:text-sm text-slate-500 dark:text-slate-405 leading-relaxed line-clamp-4">
                {featuredMolecule.description}
              </p>
            </div>

            <div className="mt-6 border-t border-slate-100 dark:border-slate-800 pt-5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">HOMO-LUMO Gap</span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400 text-sm">{featuredMolecule.homoLumoGap} eV</span>
              </div>
              
              <button
                onClick={() => viewMoleculeDetails(featuredMolecule.id)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Simulate</span>
              </button>
            </div>
          </div>
        )}

        {/* Recent Extractions History List (Right) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3.5">
            <div>
              <h3 className="text-base font-bold text-slate-850 dark:text-slate-100">
                Recent AI Cleanup Logs
              </h3>
              <p className="text-xs text-slate-450 dark:text-slate-500">History of extracted chemical documents.</p>
            </div>
            <button
              onClick={() => setPage('upload')}
              className="text-xs font-bold text-teal-600 dark:text-teal-450 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-3 mt-4 overflow-y-auto max-h-[260px]">
            {extractions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400 text-center">
                <FileText className="w-8 h-8 stroke-1 text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-xs italic">No items in file cleanup queue.</p>
              </div>
            ) : (
              extractions.slice(0, 3).map((ext) => {
                const parsed = JSON.parse(ext.extractedJson);
                return (
                  <div 
                    key={ext.id}
                    className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800 text-slate-400">
                        <FileText className="w-4 h-4 text-teal-550 dark:text-teal-450" />
                      </div>
                      <div className="truncate">
                        <h4 className="text-xs font-bold text-slate-750 dark:text-slate-300 truncate font-mono">
                          {ext.filename}
                        </h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          Extracted: <span className="font-semibold text-slate-600 dark:text-slate-400">{parsed.molecule || 'Unknown'}</span> ({parsed.formula || 'N/A'})
                        </p>
                      </div>
                    </div>
                    
                    <span className="text-2xs font-mono font-semibold text-slate-400 whitespace-nowrap">
                      {new Date(ext.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
