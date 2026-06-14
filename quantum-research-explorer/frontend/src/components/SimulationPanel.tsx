import React, { useState, useEffect, useRef } from 'react';
import { Molecule, SimulationResult } from '../types';
import { Play, Terminal, RefreshCw, Cpu, Award } from 'lucide-react';

interface SimulationPanelProps {
  molecule: Molecule;
}

export const SimulationPanel: React.FC<SimulationPanelProps> = ({ molecule }) => {
  const [functional, setFunctional] = useState('B3LYP');
  const [basisSet, setBasisSet] = useState('6-31G(d)');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [activeCycleIndex, setActiveCycleIndex] = useState(-1);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset simulation states when active molecule changes
    setResult(null);
    setConsoleLogs([]);
    setActiveCycleIndex(-1);
  }, [molecule]);

  useEffect(() => {
    // Auto-scroll console logs
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleLogs]);

  const handleRunSimulation = async () => {
    setLoading(true);
    setResult(null);
    setConsoleLogs(['[system] Initializing quantum core simulator...', '[system] Accessing local calculation cache...']);
    setActiveCycleIndex(-1);

    try {
      const res = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moleculeId: molecule.id,
          functional,
          basisSet,
        }),
      });

      if (!res.ok) {
        throw new Error('Simulation calculation failed');
      }

      const simResult: SimulationResult = await res.json();
      
      // We will typewriter/stream these logs into the console
      let logIndex = 0;
      const interval = setInterval(() => {
        if (logIndex < simResult.logs.length) {
          const nextLine = simResult.logs[logIndex];
          setConsoleLogs((prev) => [...prev, nextLine]);
          
          // Detect SCF cycles in log and tick cycle indices for animations
          if (nextLine.trim().startsWith('1') || nextLine.trim().startsWith('2') || nextLine.trim().startsWith('3')) {
            const cycleVal = parseInt(nextLine.trim().split(/\s+/)[0]);
            if (!isNaN(cycleVal)) {
              setActiveCycleIndex(cycleVal);
            }
          }
          logIndex++;
        } else {
          clearInterval(interval);
          setResult(simResult);
          setLoading(false);
        }
      }, 100); // speed up log printing

    } catch (err: any) {
      console.error(err);
      setConsoleLogs((prev) => [...prev, `[ERROR] Calculation crashed: ${err.message}`]);
      setLoading(false);
    }
  };

  // Orbital Level Visual Render Data
  const orbitalNames = ['HOMO-2', 'HOMO-1', 'HOMO', 'LUMO', 'LUMO+1'];
  const orbitals = molecule.orbitalEnergies;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="simulation-panel-wrapper">
      {/* Parameter Settings & Log Console (Left) */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        {/* Settings Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3.5 mb-4">
            <Cpu className="w-5 h-5 text-teal-500" />
            <div>
              <h3 className="text-base font-bold text-slate-850 dark:text-slate-100">
                DFT Computational Parameters
              </h3>
              <p className="text-xs text-slate-500">Select model chemistry approximations.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Functional</label>
              <select
                value={functional}
                disabled={loading}
                onChange={(e) => setFunctional(e.target.value)}
                className="w-full py-2 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              >
                <option value="B3LYP">B3LYP (Hybrid GGA)</option>
                <option value="PBE0">PBE0 (Hybrid DFT)</option>
                <option value="M06-2X">M06-2X (Meta-GGA)</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Basis Set</label>
              <select
                value={basisSet}
                disabled={loading}
                onChange={(e) => setBasisSet(e.target.value)}
                className="w-full py-2 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              >
                <option value="6-31G(d)">6-31G(d) (Standard Polarization)</option>
                <option value="6-311+G(d,p)">6-311+G(d,p) (Diffuse Split)</option>
                <option value="cc-pVDZ">cc-pVDZ (Correlation Consistent)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleRunSimulation}
            disabled={loading}
            className="w-full mt-5 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-sm shadow-md active:scale-98 transition-all disabled:opacity-50"
            id="run-simulation-btn"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Self-Consistent Field Iterations...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Run DFT Geometry Optimization</span>
              </>
            )}
          </button>
        </div>

        {/* Console Box */}
        <div className="flex-1 flex flex-col rounded-2xl border border-slate-800 bg-slate-950 text-slate-250 p-4 shadow-xl min-h-[350px] max-h-[450px]">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-3 text-slate-400 font-mono text-xs">
            <Terminal className="w-4 h-4 text-teal-400" />
            <span>DFT_Simulation_Console.stdout</span>
            {loading && <span className="ml-auto w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>}
          </div>
          
          <div className="flex-1 overflow-auto font-mono text-2xs leading-relaxed text-slate-300">
            {consoleLogs.length === 0 ? (
              <p className="text-slate-650 italic">Console idle. Awaiting geometry compilation...</p>
            ) : (
              consoleLogs.map((log, index) => (
                <div 
                  key={index}
                  className={`${log.startsWith('[ERROR]') ? 'text-rose-500' : log.startsWith('[system]') ? 'text-indigo-400' : log.includes('SCF energy convergence') ? 'text-emerald-400 font-bold' : ''}`}
                >
                  {log}
                </div>
              ))
            )}
            <div ref={consoleEndRef} />
          </div>
        </div>
      </div>

      {/* Orbital Energy Visualizer & Summary (Right) */}
      <div className="lg:col-span-5 flex flex-col gap-5">
        {/* Orbital Energy diagram */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-850 dark:text-slate-100 flex items-center gap-2">
              Molecular Orbital Energy Diagram
            </h3>
            <p className="text-xs text-slate-500">HOMO/LUMO level analysis from optimization values.</p>
          </div>

          {/* SVG Diagram */}
          <div className="relative my-6 flex items-center justify-center bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 rounded-xl p-4 h-64">
            <svg viewBox="0 0 200 180" className="w-full h-full font-mono">
              {/* Energy Axis */}
              <line x1="30" y1="20" x2="30" y2="160" stroke="#94A3B8" strokeWidth="1.5" />
              <polygon points="27,20 30,13 33,20" fill="#94A3B8" />
              <text x="18" y="24" fill="#94A3B8" fontSize="8" transform="rotate(-90 18 24)">Energy (eV)</text>

              {/* Draw horizontal orbital bars */}
              {orbitals.map((energy, idx) => {
                // Calculate y coordinates scaled between 150 (HOMO-2, low) and 30 (LUMO+1, high)
                // Let's map energy ranges [-14 eV to +1 eV] to Y values [150 to 30]
                const minE = orbitals[0] - 1;
                const maxE = orbitals[4] + 1;
                const y = 155 - ((energy - minE) / (maxE - minE)) * 120;
                const isLumo = idx >= 3;
                const isHomo = idx === 2;
                
                return (
                  <g key={idx} className="transition-all duration-300">
                    {/* Energy label */}
                    <text x="35" y={y + 3} fill="#94A3B8" fontSize="8">{energy.toFixed(1)} eV</text>
                    
                    {/* Horizontal line */}
                    <line 
                      x1="80" 
                      y1={y} 
                      x2="150" 
                      y2={y} 
                      stroke={isLumo ? '#F43F5E' : isHomo ? '#14B8A6' : '#64748B'} 
                      strokeWidth={isHomo || idx === 3 ? '3.5' : '2'}
                      strokeDasharray={isLumo ? '4,3' : 'none'}
                    />
                    
                    {/* Orbit name tag */}
                    <text 
                      x="155" 
                      y={y + 3} 
                      fill={isLumo ? '#F43F5E' : isHomo ? '#14B8A6' : '#64748B'} 
                      fontSize="9" 
                      fontWeight={isHomo || idx === 3 ? 'bold' : 'normal'}
                    >
                      {orbitalNames[idx]}
                    </text>

                    {/* Draw electrons (arrows) for occupied orbitals (indices 0, 1, 2) */}
                    {!isLumo && (
                      <g fill={isHomo ? '#14B8A6' : '#64748B'}>
                        {/* Spin up arrow */}
                        <path d={`M 105,${y - 8} L 105,${y + 4} M 102,${y - 5} L 105,${y - 8} L 108,${y - 5}`} stroke={isHomo ? '#14B8A6' : '#64748B'} strokeWidth="1.5" strokeLinecap="round" />
                        {/* Spin down arrow */}
                        <path d={`M 125,${y - 4} L 125,${y + 8} M 122,${y + 5} L 125,${y + 8} L 128,${y + 5}`} stroke={isHomo ? '#14B8A6' : '#64748B'} strokeWidth="1.5" strokeLinecap="round" />
                      </g>
                    )}
                  </g>
                );
              })}

              {/* HOMO-LUMO Gap marker */}
              {(() => {
                const minE = orbitals[0] - 1;
                const maxE = orbitals[4] + 1;
                const yHomo = 155 - ((orbitals[2] - minE) / (maxE - minE)) * 120;
                const yLumo = 155 - ((orbitals[3] - minE) / (maxE - minE)) * 120;
                const yMid = (yHomo + yLumo) / 2;
                return (
                  <g>
                    <line x1="65" y1={yHomo} x2="65" y2={yLumo} stroke="#14B8A6" strokeWidth="1.2" strokeDasharray="2,2" />
                    <polygon points="62,yHomo 65,yHomo-5 68,yHomo" fill="#14B8A6" transform={`translate(0, ${yHomo - yHomo})`} />
                    <path d={`M 62,${yHomo} L 65,${yHomo + 5} L 68,${yHomo}`} fill="#14B8A6" />
                    <path d={`M 62,${yLumo} L 65,${yLumo - 5} L 68,${yLumo}`} fill="#F43F5E" />
                    <text x="72" y={yMid + 3} fill="#0D9488" fontSize="8" fontWeight="bold">
                      Gap: {molecule.homoLumoGap.toFixed(1)} eV
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Quick Summary of DFT Results */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-2.5">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Optimization Status</span>
              <span className={`px-2 py-0.5 rounded text-2xs uppercase tracking-wide font-bold ${
                result ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : loading ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-pulse' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                {result ? 'Converged' : loading ? 'Computing' : 'Awaiting'}
              </span>
            </div>
            
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Total Energy</span>
              <span className="font-mono text-slate-850 dark:text-slate-250 font-bold">
                {result ? `${result.finalEnergy.toFixed(6)} Hartree` : '--'}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold uppercase tracking-wider">Dipole Moment</span>
              <span className="font-mono text-slate-850 dark:text-slate-250 font-bold">
                {result ? `${result.dipoleMoment.toFixed(2)} Debye` : '--'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
