import React from 'react';
import { useApp, Page } from './context/AppContext';
import { Dashboard } from './pages/Dashboard';
import { UploadExtract } from './pages/UploadExtract';
import { Explorer } from './pages/Explorer';
import { MoleculeDetail } from './pages/MoleculeDetail';
import { Comparison } from './pages/Comparison';
import { About } from './pages/About';
import { ModeToggle } from './components/ModeToggle';
import { LayoutDashboard, FileText, Compass, ArrowRightLeft, HelpCircle } from 'lucide-react';

export const App: React.FC = () => {
  const { activePage, setPage, compareIds } = useApp();

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'upload':
        return <UploadExtract />;
      case 'explorer':
        return <Explorer />;
      case 'detail':
        return <MoleculeDetail />;
      case 'comparison':
        return <Comparison />;
      case 'about':
        return <About />;
      default:
        return <Dashboard />;
    }
  };

  const navItems = [
    { page: 'dashboard' as Page, label: 'Dashboard', icon: LayoutDashboard },
    { page: 'upload' as Page, label: 'Upload & Extract', icon: FileText },
    { page: 'explorer' as Page, label: 'Molecule Explorer', icon: Compass },
    { 
      page: 'comparison' as Page, 
      label: 'Compare', 
      icon: ArrowRightLeft,
      badge: compareIds.length > 0 ? compareIds.length : undefined 
    },
    { page: 'about' as Page, label: 'About Theory', icon: HelpCircle },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">
      
      {/* Top Main Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/85 dark:border-slate-900 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo brand */}
          <div 
            onClick={() => setPage('dashboard')} 
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="p-2 rounded-xl bg-teal-500 text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
              <span className="text-lg font-bold font-mono leading-none">⚛️</span>
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-850 dark:text-slate-50">
                Quantum
              </span>
              <span className="text-teal-600 dark:text-teal-400 font-bold text-sm sm:text-base ml-1">
                Explorer
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.page || (item.page === 'explorer' && activePage === 'detail');
              return (
                <button
                  key={item.page}
                  onClick={() => setPage(item.page)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-900 text-teal-600 dark:text-teal-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-900/40'
                  }`}
                  id={`nav-link-${item.page}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-teal-555 dark:bg-teal-500 text-white text-[9px] font-extrabold font-mono leading-none scale-90">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Theme switcher control */}
          <div className="flex items-center gap-3">
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main Page Area Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="animate-fade-in">
          {renderActivePage()}
        </div>
      </main>

      {/* Footer Details */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white/40 dark:bg-slate-950/40 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-450 dark:text-slate-500 text-xs">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Quantum Research Explorer. Open source license.</span>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setPage('about')} className="hover:text-slate-650 dark:hover:text-slate-350 transition-colors">Methodology</button>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-slate-650 dark:hover:text-slate-350 transition-colors">Documentation</a>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Navigation (Bottom) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-45 border-t border-slate-200 dark:border-slate-900 bg-white/90 dark:bg-slate-955/90 backdrop-blur-md px-2 py-1 flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.page || (item.page === 'explorer' && activePage === 'detail');
          return (
            <button
              key={item.page}
              onClick={() => setPage(item.page)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-lg text-3xs font-bold transition-all relative ${
                isActive
                  ? 'text-teal-600 dark:text-teal-400'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span className="scale-90">{item.label}</span>
              {item.badge && (
                <span className="absolute top-1 right-2.5 px-1 py-0.2 rounded-full bg-teal-500 text-white text-[8px] font-extrabold font-mono scale-75">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Spacer for mobile menu height */}
      <div className="md:hidden h-14" />
    </div>
  );
};
export default App;
