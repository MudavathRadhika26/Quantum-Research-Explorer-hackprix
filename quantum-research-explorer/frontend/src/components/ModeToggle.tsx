import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ModeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md dark:shadow-none relative overflow-hidden group"
      aria-label="Toggle Theme Mode"
      id="mode-toggle-btn"
    >
      <div className="relative w-5 h-5">
        <span className={`absolute inset-0 transition-transform duration-500 ease-out ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
          <Sun className="w-5 h-5 text-amber-500 fill-amber-100 dark:fill-none" />
        </span>
        <span className={`absolute inset-0 transition-transform duration-500 ease-out ${theme === 'light' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
          <Moon className="w-5 h-5 text-indigo-400 fill-indigo-950/20 dark:fill-none" />
        </span>
      </div>
    </button>
  );
};
