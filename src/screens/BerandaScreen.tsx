/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { SubjectIcon } from '../components/SubjectIcon';
import { getSubjectColors } from '../utils/colorUtils';
import { Calendar, ClipboardList, BookOpen, BarChart3, ChevronRight, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export const BerandaScreen: React.FC = () => {
  const {
    userProfile,
    schedule,
    subjects,
    tasks,
    navigateTo,
    triggerNotification,
  } = useApp();

  // Get current hour to calculate correct Indonesian greeting
  const getGreeting = () => {
    const hr = new Date().getHours();
    if (hr < 11) return 'Selamat Pagi';
    if (hr < 15) return 'Selamat Siang';
    if (hr < 19) return 'Selamat Sore';
    return 'Selamat Malam';
  };

  // Mock date matching local setting
  const formattedDate = 'Senin, 13 Juli 2026';

  // Get Monday schedule items as "Today" (since Monday has Matematika & Biologi according to mock)
  const mondaySchedule = schedule.filter((item) => item.day === 'Senin');

  // Pelajaran Sekarang (Math)
  const currentSchedule = mondaySchedule[0];
  const currentSubject = subjects.find((s) => s.id === currentSchedule?.subjectId);
  const currentColors = currentSubject ? getSubjectColors(currentSubject.color) : getSubjectColors('');

  // Pelajaran Berikutnya (Biologi)
  const nextSchedule = mondaySchedule[2]; // Index 2 represents Biologi at 08.45
  const nextSubject = subjects.find((s) => s.id === nextSchedule?.subjectId);
  const nextColors = nextSubject ? getSubjectColors(nextSubject.color) : getSubjectColors('');

  // Count of pending tasks
  const pendingTasksCount = tasks.filter((t) => !t.completed).length;

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 100;

  return (
    <div className="flex flex-col flex-1 pb-10 bg-[#F8FAFC] dark:bg-slate-950/40">
      
      {/* CLEAN MINIMALIST HEADER PANEL */}
      <div className="px-5 pt-6 pb-5 flex flex-col gap-4 text-left">
        {/* Profile Row */}
        <div className="flex items-center justify-between select-none">
          <div className="flex flex-col">
            <span className="text-slate-400 dark:text-slate-500 text-[11px] font-bold uppercase tracking-wider">
              {getGreeting()}, 👋
            </span>
            <h2 className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight mt-0.5">
              {userProfile.name}
            </h2>
            <span className="text-slate-500 dark:text-slate-400 text-[10px] font-bold flex items-center gap-1 mt-1">
              <GraduationCap size={13} className="text-blue-600" />
              {userProfile.className} • {userProfile.school}
            </span>
          </div>
          
          <button
            onClick={() => navigateTo('pengaturan')}
            className="w-11 h-11 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm transition-transform hover:scale-105"
          >
            <img
              src={userProfile.photoUrl}
              alt={userProfile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
        </div>

        {/* Dynamic Task Progress Circle Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-4 rounded-[20px] shadow-xs flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9.5px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Progress Tugas</span>
            <span className="text-sm font-black text-blue-600 dark:text-blue-400 mt-1">{progressPercent}% Selesai</span>
            <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
              {completedCount} dari {totalCount} tugas telah rampung
            </span>
          </div>
          <div className="w-11 h-11 relative">
             <svg className="w-full h-full transform -rotate-90">
                <circle cx="22" cy="22" r="18" stroke="currentColor" strokeWidth="3" fill="transparent" className="text-slate-100 dark:text-slate-800" />
                <circle cx="22" cy="22" r="18" stroke="currentColor" strokeWidth="3" fill="transparent" strokeDasharray="113.1" strokeDashoffset={113.1 - (113.1 * progressPercent) / 100} className="text-blue-600 dark:text-blue-400 transition-all duration-500" />
             </svg>
          </div>
        </div>
      </div>

      {/* FLOATING CARD: PELAJARAN SEKARANG & BERIKUTNYA */}
      <div className="px-5 flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[22px] p-4 shadow-xs flex flex-col gap-3">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-black text-slate-800 dark:text-slate-100 uppercase tracking-wider">
              {formattedDate}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-[#2563EB] dark:text-blue-300 text-[9px] font-extrabold">
              KBM Aktif
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Pelajaran Sekarang */}
            {currentSubject && (
              <div 
                onClick={() => navigateTo('jadwal')}
                className="bg-slate-50/70 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850 p-3 rounded-2xl flex flex-col gap-1.5 text-left cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-1.5">
                  <span className={`p-1.5 rounded-lg ${currentColors.badgeBg}`}>
                    <SubjectIcon name={currentSubject.iconName} size={14} />
                  </span>
                  <span className="text-[9.5px] font-black text-slate-400 dark:text-slate-500 uppercase">
                    Sekarang
                  </span>
                </div>
                <div className="flex flex-col mt-1">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">
                    {currentSubject.name}
                  </h4>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {currentSchedule.startTime} - {currentSchedule.endTime}
                  </span>
                  <span className="text-[8.5px] text-slate-400 font-semibold mt-1">
                    {currentSchedule.room}
                  </span>
                </div>
              </div>
            )}

            {/* Pelajaran Berikutnya */}
            {nextSubject && (
              <div 
                onClick={() => navigateTo('jadwal')}
                className="bg-slate-50/70 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-850 p-3 rounded-2xl flex flex-col gap-1.5 text-left cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <div className="flex items-center gap-1.5">
                  <span className={`p-1.5 rounded-lg ${nextColors.badgeBg}`}>
                    <SubjectIcon name={nextSubject.iconName} size={14} />
                  </span>
                  <span className="text-[9.5px] font-black text-slate-400 dark:text-slate-500 uppercase">
                    Berikutnya
                  </span>
                </div>
                <div className="flex flex-col mt-1">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">
                    {nextSubject.name}
                  </h4>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    {nextSchedule.startTime} - {nextSchedule.endTime}
                  </span>
                  <span className="text-[8.5px] text-slate-400 font-semibold mt-1">
                    {nextSchedule.room}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QUICK BENTO ACTIONS DIRECTORY */}
      <div className="px-5 mt-5 flex flex-col gap-2.5">
        <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider text-left pl-1">
          Menu Pintas
        </h3>
        <div className="grid grid-cols-3 gap-3">
          
          <button
            onClick={() => navigateTo('dashboard')}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-3 rounded-[20px] shadow-sm flex flex-col items-center justify-center gap-2 text-center hover:scale-105 transition-transform"
          >
            <span className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <BarChart3 size={18} />
            </span>
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
              Statistik
            </span>
          </button>

          <button
            onClick={() => navigateTo('kalender')}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-3 rounded-[20px] shadow-sm flex flex-col items-center justify-center gap-2 text-center hover:scale-105 transition-transform"
          >
            <span className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <Calendar size={18} />
            </span>
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
              Kalender
            </span>
          </button>

          <button
            onClick={() => navigateTo('mapel')}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-3 rounded-[20px] shadow-sm flex flex-col items-center justify-center gap-2 text-center hover:scale-105 transition-transform"
          >
            <span className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
              <BookOpen size={18} />
            </span>
            <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
              Mata Pelajaran
            </span>
          </button>

        </div>
      </div>

      {/* TODAY'S TIMELINE LIST PREVIEW */}
      <div className="px-5 mt-5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between pl-1">
          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider text-left">
            Jadwal Hari Ini
          </h3>
          <button
            onClick={() => navigateTo('jadwal')}
            className="text-[10.5px] font-black text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          >
            Lihat semua
            <ChevronRight size={12} className="ml-0.5" />
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[20px] p-4 shadow-sm flex flex-col gap-3 text-left">
          {mondaySchedule.slice(0, 3).map((sched, index) => {
            const subj = subjects.find((s) => s.id === sched.subjectId);
            const colors = subj ? getSubjectColors(subj.color) : getSubjectColors('');
            
            return (
              <div key={sched.id} className="flex items-center gap-3">
                <span className="text-[10.5px] font-mono font-bold text-slate-400 dark:text-slate-500 min-w-[76px]">
                  {sched.startTime} - {sched.endTime}
                </span>
                
                {/* Visual Connector Dot */}
                <span className={`w-2 h-2 rounded-full ${colors.accent}`}></span>
                
                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {subj?.name}
                  </h4>
                  <p className="text-[9.5px] text-slate-400">
                    {subj?.teacher} • {sched.room}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* UPCOMING TASKS PREVIEW CARD */}
      <div className="px-5 mt-5 flex flex-col gap-2.5">
        <div className="flex items-center justify-between pl-1">
          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider text-left">
            Pengingat Tugas
          </h3>
          <button
            onClick={() => navigateTo('tugas')}
            className="text-[10.5px] font-black text-blue-600 dark:text-blue-400 hover:underline flex items-center"
          >
            Lihat semua
            <ChevronRight size={12} className="ml-0.5" />
          </button>
        </div>

        {tasks.filter((t) => !t.completed).length === 0 ? (
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-[20px] p-4 text-center">
            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">🎉 Semua tugas selesai!</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Tidak ada tugas mendesak hari ini.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[20px] p-4 shadow-sm flex flex-col gap-3 text-left">
            {tasks
              .filter((t) => !t.completed)
              .slice(0, 2)
              .map((task) => {
                const subj = subjects.find((s) => s.id === task.subjectId);
                const colors = subj ? getSubjectColors(subj.color) : getSubjectColors('');
                return (
                  <div
                    key={task.id}
                    onClick={() => navigateTo('tugas')}
                    className="flex gap-3 items-start cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 p-1.5 rounded-xl transition-colors"
                  >
                    <span className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} mt-0.5`}>
                      <ClipboardList size={16} />
                    </span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 truncate">
                        {task.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Deadline: {task.deadline}
                      </p>
                    </div>
                    {/* Urgency indicator dot */}
                    <span className="w-2 h-2 rounded-full bg-rose-500 self-center"></span>
                  </div>
                );
              })}
          </div>
        )}
      </div>

    </div>
  );
};
