import React from 'react';
import { Sparkles, Brain, Cpu, BookOpen, Layers } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 text-slate-800 dark:text-slate-200" id="about-page">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-850 dark:text-slate-50 tracking-tight">
          Scientific Foundation & Methodology
        </h1>
        <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">
          Understanding the tech-stack, computational engines, and AI schemas running behind the scenes.
        </p>
      </div>

      {/* Grid columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Core pillar 1 */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col gap-4">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 rounded-xl w-fit">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              1. Multimodal AI Extraction
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
              Scientific literature is often trapped in flat PDF papers, scan printouts, or raw CSV spreadsheets.
              Quantum Research Explorer houses a clean, structured parsing bridge that processes flat file uploads, OCRs raw coordinate points, and extracts standard compound JSON blueprints.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-2xs leading-relaxed text-slate-450 dark:text-slate-500 font-mono">
            <span className="font-bold text-slate-700 dark:text-slate-300">Integration Boundary:</span>
            <br />
            Our extraction controller maps parameters directly to OCR parser microservices, ready to accept custom vision APIs (like GPT-4 Vision or Gemini 1.5 Pro multimodal models).
          </div>
        </div>

        {/* Core pillar 2 */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm flex flex-col gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 rounded-xl w-fit">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              2. Density Functional Theory (DFT)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
              DFT is a computational quantum mechanical modeling method used to investigate the electronic structure of many-body systems.
              Instead of solving the complex multi-particle Schrödinger equation, DFT approximates the system based on electron density maps.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-2xs leading-relaxed text-slate-450 dark:text-slate-500 font-mono">
            <span className="font-bold text-slate-700 dark:text-slate-300">Functional & Basis Sets:</span>
            <br />
            - **B3LYP**: A hybrid functional containing Hartree-Fock exchange.
            <br />
            - **6-31G(d)**: Standard polarization basis mapping.
          </div>
        </div>
      </div>

      {/* Explaining HOMO LUMO and Molecular Orbitals */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col gap-4">
        <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100 flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-500" />
          <span>Understanding HOMO-LUMO Energy Levels</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-slate-750 dark:text-slate-300">HOMO (Highest Occupied Molecular Orbital)</h4>
            <p>
              The HOMO represents the outermost orbital containing electrons. It acts as an electron donor. High energy HOMOs suggest chemical structures are highly nucleophilic and reactive towards electron acceptors.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="font-bold text-slate-750 dark:text-slate-300">LUMO (Lowest Unoccupied Molecular Orbital)</h4>
            <p>
              The LUMO represents the innermost empty orbital. It acts as an electron acceptor. Low energy LUMOs imply structures are highly electrophilic and easily reduced.
            </p>
          </div>
        </div>

        {/* Alert note block */}
        <div className="p-4 rounded-xl border border-teal-500/10 bg-teal-500/5 dark:bg-teal-950/20 text-xs sm:text-sm flex gap-3 text-slate-600 dark:text-slate-350">
          <BookOpen className="w-6 h-6 text-teal-500 shrink-0" />
          <div>
            <span className="font-bold text-teal-650 dark:text-teal-400">HOMO-LUMO Band Gap:</span> The energy difference between HOMO and LUMO levels is a critical descriptor for predicting a compound's thermodynamic stability, optical absorbance threshold, and chemical hardness. Larger gaps indicate high chemical stability and lower reactivity.
          </div>
        </div>
      </div>
    </div>
  );
};
