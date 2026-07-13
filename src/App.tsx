/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp, ScreenType } from './context/AppContext';
import { PhoneFrame } from './components/PhoneFrame';
import { BerandaScreen } from './screens/BerandaScreen';
import { JadwalScreen } from './screens/JadwalScreen';
import { TugasScreen } from './screens/TugasScreen';
import { PengingatScreen } from './screens/PengingatScreen';
import { PengaturanScreen } from './screens/PengaturanScreen';
import { MataPelajaranScreen } from './screens/MataPelajaranScreen';
import { CalendarView } from './components/CalendarView';
import { DashboardView } from './components/DashboardView';
import {
  Home,
  CalendarDays,
  ClipboardList,
  Bell,
  Settings,
  ArrowLeft,
  ChevronLeft,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Content switcher based on active navigation screen state
const ScreenSwitcher: React.FC = () => {
  const { currentScreen } = useApp();

  switch (currentScreen) {
    case 'beranda':
      return <BerandaScreen />;
    case 'jadwal':
      return <JadwalScreen />;
    case 'tugas':
      return <TugasScreen />;
    case 'pengingat':
      return <PengingatScreen />;
    case 'pengaturan':
      return <PengaturanScreen />;
    case 'mapel':
      return <MataPelajaranScreen />;
    case 'kalender':
      return <CalendarView />;
    case 'dashboard':
      return <DashboardView />;
    default:
      return <BerandaScreen />;
  }
};

const AppContent: React.FC = () => {
  const { currentScreen, navigateTo, goBack, tasks } = useApp();

  // Highlight bottom navigation items
  const isTabActive = (tab: ScreenType) => {
    // If the active screen is a subscreen of beranda, highlight beranda
    if (tab === 'beranda') {
      return ['beranda', 'kalender', 'dashboard', 'mapel'].includes(currentScreen);
    }
    return currentScreen === tab;
  };

  // Red badge representing active pending task counts
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  // Check if we are inside a sub-navigation page (e.g., Kalender, Mapel, Stats)
  const isSubScreen = ['kalender', 'dashboard', 'mapel'].includes(currentScreen);

  // Return formatted page title for back navigation bar
  const getSubScreenTitle = () => {
    switch (currentScreen) {
      case 'kalender':
        return 'Kalender Akademik';
      case 'dashboard':
        return 'Statistik Belajar';
      case 'mapel':
        return 'Mata Pelajaran';
      default:
        return 'SMA Schedule';
    }
  };

  return (
    <PhoneFrame>
      {/* GLOBAL BACK NAVIGATION HEADER FOR SUB-PAGES */}
      <AnimatePresence>
        {isSubScreen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/80 h-12 px-4 flex items-center gap-2 select-none z-30 text-left"
          >
            <button
              onClick={goBack}
              id="back-header-button"
              className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
              title="Kembali"
            >
              <ChevronLeft size={22} className="stroke-[2.5]" />
            </button>
            <span className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              {getSubScreenTitle()}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE DISPLAY WINDOW */}
      <div className="flex-1 flex flex-col relative">
        <ScreenSwitcher />
      </div>

      {/* PERSISTENT BOTTOM NAVIGATION BAR */}
      <div 
        id="bottom-navigation-bar"
        className="sticky bottom-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-around px-2 select-none z-30 shadow-lg"
      >
        {/* TAB 1: BERANDA */}
        <button
          onClick={() => navigateTo('beranda')}
          id="nav-tab-beranda"
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
            isTabActive('beranda')
              ? 'text-blue-600 dark:text-blue-400 font-extrabold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}
        >
          <Home size={20} className={isTabActive('beranda') ? 'scale-110 transition-transform' : ''} />
          <span className="text-[9px] uppercase tracking-wider font-extrabold">Beranda</span>
        </button>

        {/* TAB 2: JADWAL */}
        <button
          onClick={() => navigateTo('jadwal')}
          id="nav-tab-jadwal"
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
            isTabActive('jadwal')
              ? 'text-blue-600 dark:text-blue-400 font-extrabold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}
        >
          <CalendarDays size={20} className={isTabActive('jadwal') ? 'scale-110 transition-transform' : ''} />
          <span className="text-[9px] uppercase tracking-wider font-extrabold">Jadwal</span>
        </button>

        {/* TAB 3: TUGAS */}
        <button
          onClick={() => navigateTo('tugas')}
          id="nav-tab-tugas"
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-2xl transition-all cursor-pointer relative ${
            isTabActive('tugas')
              ? 'text-blue-600 dark:text-blue-400 font-extrabold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}
        >
          <ClipboardList size={20} className={isTabActive('tugas') ? 'scale-110 transition-transform' : ''} />
          <span className="text-[9px] uppercase tracking-wider font-extrabold">Tugas</span>
          
          {/* Badge count of pending tasks */}
          {pendingTasksCount > 0 && (
            <span className="absolute top-1 right-3 px-1.5 py-0.5 text-[8.5px] font-black bg-rose-500 text-white rounded-full min-w-4 h-4 flex items-center justify-center shadow-xs border border-white dark:border-slate-900">
              {pendingTasksCount}
            </span>
          )}
        </button>

        {/* TAB 4: PENGINGAT */}
        <button
          onClick={() => navigateTo('pengingat')}
          id="nav-tab-pengingat"
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
            isTabActive('pengingat')
              ? 'text-blue-600 dark:text-blue-400 font-extrabold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}
        >
          <Bell size={20} className={isTabActive('pengingat') ? 'scale-110 transition-transform' : ''} />
          <span className="text-[9px] uppercase tracking-wider font-extrabold">Pengingat</span>
        </button>

        {/* TAB 5: PENGATURAN */}
        <button
          onClick={() => navigateTo('pengaturan')}
          id="nav-tab-pengaturan"
          className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-2xl transition-all cursor-pointer ${
            isTabActive('pengaturan')
              ? 'text-blue-600 dark:text-blue-400 font-extrabold'
              : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
          }`}
        >
          <Settings size={20} className={isTabActive('pengaturan') ? 'scale-110 transition-transform' : ''} />
          <span className="text-[9px] uppercase tracking-wider font-extrabold">Siswa</span>
        </button>
      </div>
    </PhoneFrame>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
