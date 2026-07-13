/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, ListTodo, Clock, CheckCircle2, TrendingUp, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const DashboardView: React.FC = () => {
  const { subjects, tasks } = useApp();

  const totalSubjects = subjects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = tasks.filter((t) => !t.completed).length;

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Circular progress specs
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* HEADER SECTION */}
      <div className="flex flex-col">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Statistik Belajar
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Evaluasi akademik mingguan Anda
        </p>
      </div>

      {/* CIRCULAR PROGRESS AND HIGHLIGHT */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 rounded-[20px] p-5 text-white shadow-md flex items-center justify-between relative overflow-hidden">
        {/* Subtle background circles for glassmorphism layout */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none"></div>
        <div className="absolute -left-6 -top-6 w-24 h-24 rounded-full bg-white/5 pointer-events-none"></div>

        <div className="flex flex-col gap-2 z-10 max-w-[55%]">
          <div className="bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold w-fit flex items-center gap-1">
            <Award size={12} />
            Progress Mingguan
          </div>
          <h4 className="text-lg font-bold leading-tight">
            {completionPercentage >= 100
              ? 'Luar Biasa! Semua Tugas Selesai 🎉'
              : completionPercentage >= 50
              ? 'Kerja Bagus! Teruskan Belajar 💪'
              : 'Ayo Mulai Selesaikan Tugasmu! 📚'}
          </h4>
          <p className="text-[11px] text-blue-100 font-medium">
            {completedTasks} dari {totalTasks} tugas telah diselesaikan dengan sukses.
          </p>
        </div>

        {/* Circular Progress Ring */}
        <div className="relative flex items-center justify-center z-10 mr-2">
          <svg className="w-36 h-36 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-white/20 fill-none"
              strokeWidth={strokeWidth}
            />
            {/* Animated foreground progress circle */}
            <motion.circle
              cx="72"
              cy="72"
              r={radius}
              className="stroke-white fill-none"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-2xl font-black font-mono leading-none">{completionPercentage}%</span>
            <span className="text-[9px] uppercase font-bold tracking-wider text-blue-200 mt-1">Selesai</span>
          </div>
        </div>
      </div>

      {/* STATISTICS GRID */}
      <div className="grid grid-cols-2 gap-4">
        {/* Card 1: Subjects */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-4 rounded-[20px] shadow-sm flex flex-col gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl w-fit">
            <BookOpen size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{totalSubjects}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Mata Pelajaran</span>
          </div>
        </div>

        {/* Card 2: Total Tasks */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-4 rounded-[20px] shadow-sm flex flex-col gap-3">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl w-fit">
            <Clock size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{totalTasks}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Total Tugas</span>
          </div>
        </div>

        {/* Card 3: Completed */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-4 rounded-[20px] shadow-sm flex flex-col gap-3">
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit">
            <CheckCircle2 size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{completedTasks}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Tugas Selesai</span>
          </div>
        </div>

        {/* Card 4: Pending */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-4 rounded-[20px] shadow-sm flex flex-col gap-3">
          <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-xl w-fit">
            <ListTodo size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{pendingTasks}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Tugas Belum</span>
          </div>
        </div>
      </div>

      {/* ACCENT TIPS / ANALYSIS */}
      <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60 p-4 rounded-[20px] flex items-start gap-3">
        <TrendingUp className="text-blue-500 mt-0.5 flex-shrink-0 animate-pulse" size={18} />
        <div className="flex flex-col gap-1 text-left">
          <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">Tips Akademik Hari Ini</h5>
          <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-relaxed">
            {pendingTasks > 0
              ? `Anda memiliki ${pendingTasks} tugas yang belum selesai. Prioritaskan "Tugas Matematika" atau buat jadwal mencicil makalah agar tidak kewalahan menjelang deadline.`
              : 'Luar biasa! Tidak ada tugas tersisa hari ini. Gunakan waktu luang Anda untuk membaca bab berikutnya atau beristirahat yang cukup.'}
          </p>
        </div>
      </div>
    </div>
  );
};
