/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getSubjectColors } from '../utils/colorUtils';
import { SubjectIcon } from '../components/SubjectIcon';
import { ClipboardList, Plus, Trash2, Calendar, CheckSquare, Square, ChevronLeft, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const TugasScreen: React.FC = () => {
  const {
    tasks,
    subjects,
    addTask,
    toggleTaskCompleted,
    deleteTask,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'semua' | 'belum' | 'selesai'>('semua');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form states
  const [newTitle, setNewTitle] = useState('');
  const [newSubjId, setNewSubjId] = useState(subjects[0]?.id || '');
  const [newDesc, setNewDesc] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  // Filtering logic
  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'belum') return !t.completed;
    if (activeFilter === 'selesai') return t.completed;
    return true; // semua
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSubjId) return;

    // Build standard Indonesian date string if empty
    let deadlineStr = newDeadline;
    if (!deadlineStr) {
      const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      deadlineStr = new Date().toLocaleDateString('id-ID', options);
    } else {
      // Parse HTML date into Indonesian date text
      const parsedDate = new Date(deadlineStr);
      if (!isNaN(parsedDate.getTime())) {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        deadlineStr = parsedDate.toLocaleDateString('id-ID', options);
      }
    }

    addTask({
      title: newTitle,
      subjectId: newSubjId,
      description: newDesc,
      deadline: deadlineStr,
    });

    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setNewDeadline('');
    setShowAddModal(false);
  };

  return (
    <div className="flex flex-col flex-1 p-5 pb-16 relative">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col text-left mb-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
          <ClipboardList size={20} className="text-blue-600" />
          Daftar Tugas
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Kelola PR, proyek, dan tugas akademik Anda
        </p>
      </div>

      {/* FILTER PILLS */}
      <div className="flex items-center gap-2 mb-5 select-none">
        <button
          onClick={() => setActiveFilter('semua')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'semua'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setActiveFilter('belum')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'belum'
              ? 'bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/40'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Belum Selesai
        </button>
        <button
          onClick={() => setActiveFilter('selesai')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
            activeFilter === 'selesai'
              ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/40'
              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
          }`}
        >
          Selesai
        </button>
      </div>

      {/* TASKS LIST */}
      <div className="flex flex-col gap-4">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center select-none bg-white dark:bg-slate-900 rounded-[20px] p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <CheckCircle size={40} className="text-slate-300 dark:text-slate-700 mb-3" />
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Tidak Ada Tugas</p>
            <p className="text-[10.5px] text-slate-400 mt-1 max-w-[180px]">
              {activeFilter === 'selesai'
                ? 'Belum ada tugas yang diselesaikan. Semangat mencicil!'
                : activeFilter === 'belum'
                ? 'Semua tugas telah diselesaikan dengan rapi. Hebat!'
                : 'Belum ada tugas yang tercatat.'}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const subj = subjects.find((s) => s.id === task.subjectId);
            const colors = subj ? getSubjectColors(subj.color) : getSubjectColors('');

            return (
              <div
                key={task.id}
                className={`bg-white dark:bg-slate-900 border ${
                  task.completed 
                    ? 'border-emerald-100 dark:border-emerald-900/60' 
                    : 'border-slate-100 dark:border-slate-800'
                } rounded-[20px] p-4 shadow-sm flex items-start gap-3 text-left transition-all relative overflow-hidden`}
              >
                {/* Visual completion side-bar highlight */}
                {task.completed && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                )}

                {/* Subject Icon Box */}
                <div className={`p-2.5 rounded-xl ${colors.bg} ${colors.text} flex-shrink-0 mt-0.5`}>
                  <SubjectIcon name={subj?.iconName || 'Book'} size={18} />
                </div>

                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                      {subj?.name}
                    </span>
                    
                    {/* Completion status badge */}
                    <span className={`px-2 py-0.5 rounded-full text-[8.5px] font-black ${
                      task.completed 
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300' 
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                    }`}>
                      {task.completed ? 'Selesai' : 'Belum Selesai'}
                    </span>
                  </div>

                  <h4 className={`text-xs font-black leading-snug truncate ${
                    task.completed ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-slate-800 dark:text-slate-200'
                  }`}>
                    {task.title}
                  </h4>

                  {task.description && (
                    <p className={`text-[10px] leading-relaxed line-clamp-2 ${
                      task.completed ? 'text-slate-300 dark:text-slate-600' : 'text-slate-500 dark:text-slate-400'
                    }`}>
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center gap-1 mt-1 text-[9.5px] text-slate-400 font-semibold">
                    <Calendar size={12} />
                    <span>Deadline: {task.deadline}</span>
                  </div>
                </div>

                {/* Quick Checkbox & Delete Tools */}
                <div className="flex flex-col gap-3 justify-between items-end self-stretch pl-1">
                  <button
                    onClick={() => toggleTaskCompleted(task.id)}
                    className={`p-1 rounded-md transition-colors ${
                      task.completed 
                        ? 'text-emerald-500 hover:text-emerald-600' 
                        : 'text-slate-300 dark:text-slate-700 hover:text-slate-400'
                    }`}
                    title={task.completed ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
                  >
                    {task.completed ? (
                      <CheckSquare size={18} className="stroke-[2.5]" />
                    ) : (
                      <Square size={18} className="stroke-[2.5]" />
                    )}
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 text-slate-300 dark:text-slate-700 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
                    title="Hapus Tugas"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* FLOATING ACTION BUTTON (FAB) */}
      <button
        onClick={() => setShowAddModal(true)}
        className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 cursor-pointer z-30"
        title="Tambah Tugas"
      >
        <Plus size={24} className="stroke-[2.5]" />
      </button>

      {/* ADD TASK SLIDE-UP MODAL BOTTOM SHEET */}
      <AnimatePresence>
        {showAddModal && (
          <div className="absolute inset-0 bg-black/50 z-40 flex items-end justify-center select-none p-4 backdrop-blur-xs">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white dark:bg-slate-900 rounded-t-[30px] rounded-b-[20px] w-full max-w-sm max-h-[90%] overflow-y-auto p-5 pb-6 text-left shadow-2xl flex flex-col gap-4 pointer-events-auto"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Tambah Tugas Baru
                </h4>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Nama Tugas
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Latihan Soal Trigonometri..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Mata Pelajaran
                  </label>
                  <select
                    value={newSubjId}
                    onChange={(e) => setNewSubjId(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {subjects.map((subj) => (
                      <option key={subj.id} value={subj.id}>
                        {subj.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Keterangan Tugas
                  </label>
                  <textarea
                    required
                    placeholder="Kerjakan latihan halaman X nomor Y, ketik di Microsoft Word, dsb..."
                    rows={3}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Batas Pengumpulan (Deadline)
                  </label>
                  <input
                    type="date"
                    required
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 shadow-sm mt-2"
                >
                  <Plus size={15} />
                  Simpan Tugas
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
