/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Wifi, Battery, Signal, Bell, X, Moon, Sun, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PhoneFrameProps {
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  const {
    theme,
    toggleTheme,
    notifications,
    dismissNotification,
    currentScreen,
    goBack,
  } = useApp();

  const [time, setTime] = useState('');

  // Update clock every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hrs}.${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center py-6 px-4 transition-colors duration-300">
      
      {/* Title & Theme controls at desktop level, styled minimally */}
      <div className="w-full max-w-sm mb-4 flex items-center justify-between px-2 hidden sm:flex">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold font-sans text-slate-800 dark:text-slate-100 tracking-tight">
            SMA Schedule
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
            Android Mobile Simulator
          </p>
        </div>
        
        {/* Desk controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            id="desktop-theme-toggle"
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-600 dark:text-slate-300 hover:scale-105 transition-transform"
            title="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>

      {/* Main Smartphone Shell Container */}
      <div 
        id="phone-shell"
        className="relative w-full max-w-[412px] h-[870px] sm:rounded-[50px] sm:border-[12px] sm:border-slate-900 bg-slate-50 dark:bg-slate-900 sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] dark:sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col font-sans transition-all duration-300 sm:ring-8 sm:ring-slate-800/10"
      >
        {/* Physical Power Button on Right side */}
        <div className="absolute right-[-15px] top-[140px] w-[3px] h-[60px] bg-slate-900 rounded-l hidden sm:block"></div>
        {/* Physical Volume Buttons on Left side */}
        <div className="absolute left-[-15px] top-[120px] w-[3px] h-[50px] bg-slate-900 rounded-r hidden sm:block"></div>
        <div className="absolute left-[-15px] top-[180px] w-[3px] h-[50px] bg-slate-900 rounded-r hidden sm:block"></div>

        {/* TOP STATUS BAR (Glassmorphism overlay) */}
        <div className="h-11 px-6 pt-2 bg-slate-50/70 dark:bg-slate-900/70 backdrop-blur-md flex items-center justify-between select-none z-40 text-slate-800 dark:text-slate-100 font-sans">
          
          {/* Time (Poppins/Inter style) */}
          <span className="text-[13.5px] font-semibold tracking-tight">{time}</span>
          
          {/* Dynamic Island / Notch */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-2.5 w-[110px] h-6 bg-black rounded-full flex items-center justify-center shadow-inner z-50">
            {/* Tiny camera lens reflection */}
            <div className="w-2.5 h-2.5 bg-slate-900 rounded-full ml-auto mr-3 border border-slate-800 flex items-center justify-center">
              <div className="w-1 h-1 bg-blue-950 rounded-full"></div>
            </div>
          </div>

          {/* Status Icons (Wifi, Signal, Battery) */}
          <div className="flex items-center gap-1.5">
            <Signal size={14} strokeWidth={2.5} className="text-slate-700 dark:text-slate-300" />
            <Wifi size={14} strokeWidth={2.5} className="text-slate-700 dark:text-slate-300" />
            <div className="flex items-center gap-1">
              <span className="text-[10.5px] font-bold">98%</span>
              <Battery size={16} strokeWidth={2.5} className="text-slate-700 dark:text-slate-300" />
            </div>
          </div>
        </div>

        {/* HEADS-UP / PUSH NOTIFICATION SIMULATION */}
        <div className="absolute top-12 left-0 right-0 px-4 z-50 pointer-events-none">
          <AnimatePresence>
            {notifications.map((notif) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: -40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="pointer-events-auto w-full mb-2 bg-white/95 dark:bg-slate-800/95 shadow-lg rounded-2xl p-3 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md flex gap-3 items-start text-left"
              >
                <div className={`p-2 rounded-xl mt-0.5 ${
                  notif.type === 'success' 
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300' 
                    : notif.type === 'warning'
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300'
                }`}>
                  <Bell size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {notif.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {notif.body}
                  </p>
                </div>
                <button
                  onClick={() => dismissNotification(notif.id)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* MAIN APPLICATION CONTAINER (Saves space for status bar & home sweep indicator) */}
        <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col relative bg-[#F8FAFC] dark:bg-slate-950 text-slate-800 dark:text-slate-100">
          {children}
        </div>

        {/* BOTTOM HOME INDICATOR (Simulated iOS/Android navigation pill) */}
        <div className="h-6 bg-slate-50/70 dark:bg-slate-950/70 backdrop-blur-md flex justify-center items-center select-none z-40">
          <div className="w-[120px] h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full hover:bg-slate-400 transition-colors cursor-pointer"></div>
        </div>

      </div>
    </div>
  );
};
