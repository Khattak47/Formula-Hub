import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Calculator, 
  Scale, 
  Minimize2, 
  Scissors, 
  Ruler, 
  Menu, 
  X, 
  ArrowRight, 
  FlaskConical,
  Percent,
  Layers,
  Info,
  Scroll,
  Moon,
  Sun
} from 'lucide-react';
import { Welcome } from './pages/Welcome';
import { Shrinkage } from './pages/tools/Shrinkage';
import { GSM } from './pages/tools/GSM';
import { PieceWeight } from './pages/tools/PieceWeight';
import { SolutionDilution } from './pages/tools/SolutionDilution';
import { LintLoss } from './pages/tools/LintLoss';
import { YarnCount } from './pages/tools/YarnCount';
import { FiberComposition } from './pages/tools/FiberComposition';
import { UnitConversion } from './pages/tools/UnitConversion';
import { TowelBlend } from './pages/tools/TowelBlend';
import { About } from './pages/About';

// Navigation configuration
const TOOLS = [
  { path: '/shrinkage', name: 'Shrinkage', icon: Minimize2, color: 'text-rose-500' },
  { path: '/gsm', name: 'GSM', icon: Scale, color: 'text-emerald-500' },
  { path: '/piece-weight', name: 'Piece Weight', icon: Layers, color: 'text-blue-500' },
  { path: '/towel-blend', name: 'Towel Blend', icon: Scroll, color: 'text-amber-600' },
  { path: '/solution', name: 'Solution & Dilution', icon: FlaskConical, color: 'text-purple-500' },
  { path: '/lint-loss', name: 'Lint Loss', icon: Scissors, color: 'text-orange-500' },
  { path: '/yarn-count', name: 'Yarn Count', icon: Calculator, color: 'text-indigo-500' },
  { path: '/fiber', name: 'Fiber Composition', icon: Percent, color: 'text-pink-500' },
  { path: '/units', name: 'Unit Conversion', icon: Ruler, color: 'text-cyan-500' },
];

const SidebarItem = ({ path, name, icon: Icon, active, onClick }: any) => (
  <Link
    to={path}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
      active 
        ? 'bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400 shadow-sm border border-brand-100 dark:border-brand-900' 
        : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100 hover:shadow-sm'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
    {name}
  </Link>
);

const DashboardLayout = ({ children }: { children?: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden transition-colors duration-200">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col`}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-slate-800 dark:text-slate-100">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
              <Calculator size={20} />
            </div>
            Formula Hub
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="ml-auto lg:hidden text-slate-500 dark:text-slate-400"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4 mt-2">
            Calculators
          </div>
          {TOOLS.map((tool) => (
            <SidebarItem
              key={tool.path}
              {...tool}
              active={location.pathname === tool.path}
              onClick={() => setIsSidebarOpen(false)}
            />
          ))}

          <div className="my-4 border-t border-slate-200 dark:border-slate-800"></div>
          
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4">
            Company
          </div>
          <SidebarItem 
            path="/about" 
            name="About Us" 
            icon={Info} 
            active={location.pathname === '/about'}
            onClick={() => setIsSidebarOpen(false)} 
          />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-4 lg:px-8 justify-between shadow-sm z-10 transition-colors duration-200">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            <Menu size={24} />
          </button>
          
          <h1 className="text-lg font-semibold text-slate-800 dark:text-slate-100 hidden lg:block">
            {TOOLS.find(t => t.path === location.pathname)?.name || (location.pathname === '/about' ? 'About Us' : 'Dashboard')}
          </h1>

          <div className="flex items-center gap-4">
            <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">v1.0.0</span>
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-medium text-sm">
              FH
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto bg-slate-50/50 dark:bg-black/20 p-4 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/*" element={
          <DashboardLayout>
            <Routes>
              <Route path="shrinkage" element={<Shrinkage />} />
              <Route path="gsm" element={<GSM />} />
              <Route path="piece-weight" element={<PieceWeight />} />
              <Route path="towel-blend" element={<TowelBlend />} />
              <Route path="solution" element={<SolutionDilution />} />
              <Route path="lint-loss" element={<LintLoss />} />
              <Route path="yarn-count" element={<YarnCount />} />
              <Route path="fiber" element={<FiberComposition />} />
              <Route path="units" element={<UnitConversion />} />
              <Route path="about" element={<About />} />
              <Route path="*" element={<Navigate to="/shrinkage" replace />} />
            </Routes>
          </DashboardLayout>
        } />
      </Routes>
    </HashRouter>
  );
}