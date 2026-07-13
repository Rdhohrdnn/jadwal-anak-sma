/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getSubjectColors } from '../utils/colorUtils';
import { SubjectIcon } from '../components/SubjectIcon';
import { Calendar, Users, MapPin, ClipboardList } from 'lucide-react';
import { motion } from 'motion/react';

export const JadwalScreen: React.FC = () => {
  const { schedule, subjects } = useApp();
  const [activeDay, setActiveDay] = useState<'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'>('Senin');

  const daysList: { id: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat'; label: string }[] = [
    { id: 'Senin', label: 'Sen' },
    { id: 'Selasa', label: 'Sel' },
    { id: 'Rabu', label: 'Rab' },
    { id: 'Kamis', label: 'Kam' },
    { id: 'Jumat', label: 'Jum' },
  ];

  // Filter schedule by day, sorted by start time
  const daySchedules = schedule
    .filter((item) => item.day === activeDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="flex flex-col flex-1 p-5 pb-10">
      
      {/* HEADER PAGE */}
      <div className="flex flex-col text-left mb-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
          <Calendar size={20} className="text-blue-600" />
          Jadwal Mingguan
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Susunan mata pelajaran harian Anda
        </p>
      </div>

      {/* WEEK PILLS HEADER NAVIGATION */}
      <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900/50 p-1 rounded-2xl mb-6">
        {daysList.map((day) => {
          const isActive = activeDay === day.id;
          return (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {day.label}
            </button>
          );
        })}
      </div>

      {/* TIMELINE VIEW CONTAINER */}
      <div className="flex flex-col relative pl-3 text-left">
        {/* Continuous vertical timeline path vector line */}
        <div className="absolute left-16 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800/80 pointer-events-none"></div>

        {daySchedules.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center select-none ml-12">
            <ClipboardList size={36} className="text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Tidak Ada Kelas</p>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[160px]">
              Hari ini bebas kegiatan belajar mengajar atau libur.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {daySchedules.map((sched) => {
              const subj = subjects.find((s) => s.id === sched.subjectId);
              const colors = subj ? getSubjectColors(subj.color) : getSubjectColors('');

              return (
                <div key={sched.id} className="flex gap-4 items-start relative group">
                  
                  {/* Start time slot */}
                  <div className="text-[11.5px] font-mono font-bold text-slate-500 dark:text-slate-400 min-w-[50px] pt-1">
                    {sched.startTime}
                  </div>

                  {/* Circular node bullet */}
                  <div className="relative mt-2.5 z-10 flex-shrink-0">
                    <span className={`w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-950 flex items-center justify-center shadow-xs ${colors.accent} group-hover:scale-125 transition-transform`}></span>
                  </div>

                  {/* Subject Card container */}
                  <div 
                    className={`flex-1 p-4 rounded-[20px] border ${colors.bg} ${colors.border} shadow-xs flex flex-col gap-2.5 transition-all hover:shadow-md hover:scale-[1.01]`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`p-1.5 rounded-lg ${colors.badgeBg}`}>
                          <SubjectIcon name={subj?.iconName || 'Book'} size={14} />
                        </span>
                        <h4 className="text-xs font-black text-slate-900 dark:text-slate-100">
                          {subj?.name}
                        </h4>
                      </div>
                      <span className="text-[9.5px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                        {sched.startTime} - {sched.endTime}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1.5 border-t border-dashed border-slate-200/50 dark:border-slate-800/40 pt-2 text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-slate-400" />
                        <span>Ruang: {sched.room}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={12} className="text-slate-400" />
                        <span>Guru: {subj?.teacher}</span>
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
            
            {/* End timestamp at the bottom */}
            <div className="flex gap-4 items-center pl-0">
              <div className="text-[11px] font-mono font-semibold text-slate-400 min-w-[50px]">
                12.00
              </div>
              <div className="relative z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 border-2 border-white dark:border-slate-950 block"></span>
              </div>
              <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
                KBM Selesai
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
