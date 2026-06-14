import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Molecule } from '../types';

interface MoleculeSearchProps {
  molecules: Molecule[];
  onFilterChange: (filtered: Molecule[]) => void;
}

export const MoleculeSearch: React.FC<MoleculeSearchProps> = ({ molecules, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [maxWeight, setMaxWeight] = useState(250);
  const [maxGap, setMaxGap] = useState(12);
  const [sortBy, setSortBy] = useState<'name' | 'weight' | 'gap'>('name');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let result = [...molecules];

    // Search filter
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.formula.toLowerCase().includes(q) ||
          m.iupacName.toLowerCase().includes(q) ||
          m.smiles.toLowerCase().includes(q)
      );
    }

    // Slider filters
    result = result.filter(
      (m) => m.molecularWeight <= maxWeight && m.homoLumoGap <= maxGap
    );

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'weight') {
        return a.molecularWeight - b.molecularWeight;
      }
      if (sortBy === 'gap') {
        return a.homoLumoGap - b.homoLumoGap;
      }
      return 0;
    });

    onFilterChange(result);
  }, [searchTerm, maxWeight, maxGap, sortBy, molecules]);

  return (
    <div className="w-full flex flex-col gap-4" id="molecule-search-container">
      {/* Search Input bar */}
      <div className="flex gap-2 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, formula, IUPAC, or SMILES..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 focus:outline-none focus:ring-2 focus:ring-teal-500/30 transition-all font-sans text-sm"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl border transition-all text-sm font-semibold active:scale-95 ${
            showFilters || maxWeight < 250 || maxGap < 12
              ? 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/30'
              : 'bg-white/70 dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Filters</span>
        </button>
      </div>

      {/* Collapsible Sliders and Filters panel */}
      {showFilters && (
        <div className="glass p-5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-6 border border-slate-200 dark:border-slate-800/80 shadow-md">
          {/* Molecular Weight Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-550 dark:text-slate-400">
              <span>Max Molecular Weight</span>
              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{maxWeight} g/mol</span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              value={maxWeight}
              onChange={(e) => setMaxWeight(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
          </div>

          {/* HOMO LUMO Gap Slider */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-550 dark:text-slate-400">
              <span>Max HOMO-LUMO Gap</span>
              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">{maxGap.toFixed(1)} eV</span>
            </div>
            <input
              type="range"
              min="3"
              max="12"
              step="0.5"
              value={maxGap}
              onChange={(e) => setMaxGap(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center text-xs font-semibold text-slate-550 dark:text-slate-400 gap-1.5">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort Results By</span>
            </div>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full py-2 px-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            >
              <option value="name">Name (Alphabetical)</option>
              <option value="weight">Molecular Weight (Ascending)</option>
              <option value="gap">HOMO-LUMO Gap (Ascending)</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};
