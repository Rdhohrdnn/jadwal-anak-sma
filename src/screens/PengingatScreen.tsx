/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, BellOff, Calendar, Clock, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'motion/react';

export const PengingatScreen: React.FC = () => {
  const {
    reminders,
    isLocalNotificationsEnabled,
    toggleLocalNotifications,
    triggerNotification,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'semua' | 'jadwal' | 'tugas'>('semua');

  // Filter reminders
  const filteredReminders = reminders.filter((rem) => {
    if (activeTab === 'jadwal') return rem.type === 'jadwal';
    if (activeTab === 'tugas') return rem.type === 'tugas';
    return true; // semua
  });

  // Group reminders by date sections
  const todayReminders = filteredReminders.filter((rem) => rem.dateLabel === 'Hari ini');
  const tomorrowReminders = filteredReminders.filter((rem) => rem.dateLabel === 'Besok');
  const laterReminders = filteredReminders.filter((rem) => rem.dateLabel === 'Nanti');

  const handleTestNotification = () => {
    triggerNotification(
      'Uji Pengingat Berhasil!',
      'PR Kimia Anda akan berakhir dalam 1 jam. Harap segera kumpulkan!',
      'info'
    );
  };

  const renderReminderCard = (rem: typeof reminders[0]) => {
    const isJadwal = rem.type === 'jadwal';
    return (
      <div
        key={rem.id}
        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-4 rounded-[20px] shadow-sm flex items-center justify-between gap-3 text-left hover:scale-[1.01] transition-transform"
      >
        <div className="flex items-center gap-3.5 flex-1 min-w-0">
          <div className={`p-3 rounded-xl flex-shrink-0 ${
            isJadwal 
              ? 'bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300' 
              : 'bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-300'
          }`}>
            {isJadwal ? <Clock size={18} /> : <Calendar size={18} />}
          </div>

          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
              {rem.title}
            </h4>
            <span className="text-[9.5px] text-slate-400 font-semibold truncate">
              {rem.timeLabel}
            </span>
            <span className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold mt-1">
              {rem.countdownLabel}
            </span>
          </div>
        </div>

        {/* Bell Alarm Blue Indicator */}
        <button
          onClick={() => triggerNotification('Pengingat Aktif', `Notifikasi alarm untuk "${rem.title}" akan berbunyi.`)}
          className={`p-2 rounded-xl border transition-all ${
            isLocalNotificationsEnabled
              ? 'bg-blue-50 border-blue-100 text-blue-600 dark:bg-blue-950 dark:border-blue-900/60 dark:text-blue-300'
              : 'bg-slate-50 border-slate-100 text-slate-300 dark:bg-slate-950 dark:border-slate-900 dark:text-slate-700'
          }`}
          disabled={!isLocalNotificationsEnabled}
          title={isLocalNotificationsEnabled ? 'Notifikasi Aktif' : 'Notifikasi Mati'}
        >
          {isLocalNotificationsEnabled ? <Bell size={14} className="animate-swing" /> : <BellOff size={14} />}
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 p-5 pb-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col text-left mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
          <Bell size={20} className="text-blue-600" />
          Alarm & Pengingat
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Notifikasi hitung mundur kelas dan tugas sekolah
        </p>
      </div>

      {/* LOCAL NOTIFICATION TOGGLE PREVIEW PANEL */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-4 rounded-[22px] shadow-sm flex flex-col gap-3.5 mb-5 text-left">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-black text-slate-800 dark:text-slate-100">
              Local Notifications
            </span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">
              Kirim pengingat sebelum pelajaran & deadline
            </span>
          </div>
          
          {/* Custom Switch Toggle button */}
          <button
            onClick={toggleLocalNotifications}
            id="notification-switch-toggle"
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center ${
              isLocalNotificationsEnabled ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'
            }`}
          >
            <span className={`w-4 h-4 rounded-full bg-white absolute shadow-md transition-transform ${
              isLocalNotificationsEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}></span>
          </button>
        </div>

        {/* Notif logic summary labels */}
        <div className="flex flex-col gap-1.5 border-t border-slate-100 dark:border-slate-800/80 pt-3 text-[9.5px] text-slate-400 font-semibold leading-normal">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>Jadwal: Berbunyi 10 menit sebelum pelajaran dimulai.</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
            <span>Tugas: Berbunyi 1 hari dan 1 jam sebelum deadline berakhir.</span>
          </div>
        </div>

        {/* Test alarm trigger button */}
        {isLocalNotificationsEnabled && (
          <button
            onClick={handleTestNotification}
            className="w-full mt-1 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/70 dark:border-blue-900/40 font-bold text-[10px] text-center hover:bg-blue-100 transition-colors"
          >
            Uji Notifikasi Alaram
          </button>
        )}
      </div>

      {/* TABS NAVIGATION */}
      <div className="flex items-center bg-slate-100 dark:bg-slate-900/50 p-1 rounded-2xl mb-5 select-none">
        <button
          onClick={() => setActiveTab('semua')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'semua'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setActiveTab('jadwal')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'jadwal'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Jadwal
        </button>
        <button
          onClick={() => setActiveTab('tugas')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'tugas'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          Tugas
        </button>
      </div>

      {/* NOTIFICATION GROUPS SECTION */}
      <div className="flex-1 flex flex-col gap-5 overflow-y-auto pr-0.5">
        
        {/* SECTION: HARI INI */}
        {todayReminders.length > 0 && (
          <div className="flex flex-col gap-2.5 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">
              Hari ini
            </span>
            <div className="flex flex-col gap-3">
              {todayReminders.map(renderReminderCard)}
            </div>
          </div>
        )}

        {/* SECTION: BESOK */}
        {tomorrowReminders.length > 0 && (
          <div className="flex flex-col gap-2.5 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">
              Besok
            </span>
            <div className="flex flex-col gap-3">
              {tomorrowReminders.map(renderReminderCard)}
            </div>
          </div>
        )}

        {/* SECTION: NANTI */}
        {laterReminders.length > 0 && (
          <div className="flex flex-col gap-2.5 text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 ml-1">
              Nanti
            </span>
            <div className="flex flex-col gap-3">
              {laterReminders.map(renderReminderCard)}
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredReminders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center select-none bg-white dark:bg-slate-900 rounded-[20px] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <Info size={32} className="text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Tidak ada pengingat</p>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[160px]">
              Semua alaram kelas atau tugas saat ini kosong.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
