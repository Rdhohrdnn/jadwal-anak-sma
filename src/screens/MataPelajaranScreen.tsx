/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getSubjectColors } from '../utils/colorUtils';
import { SubjectIcon } from '../components/SubjectIcon';
import { Search, Mail, Phone, BookOpen, Clock, Edit3, X, ChevronRight, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Subject } from '../types';

export const MataPelajaranScreen: React.FC = () => {
  const { subjects, schedule, triggerNotification } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Selected Subject Detail modal state
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [subjectNotes, setSubjectNotes] = useState('');

  // Search filter
  const filteredSubjects = subjects.filter((subj) => {
    const q = searchTerm.toLowerCase();
    return (
      subj.name.toLowerCase().includes(q) ||
      subj.teacher.toLowerCase().includes(q) ||
      subj.room.toLowerCase().includes(q)
    );
  });

  // Get active schedule times for selected subject
  const subjectSchedules = schedule.filter((s) => s.subjectId === selectedSubject?.id);

  // Sync custom local notes when subject opens
  useEffect(() => {
    if (selectedSubject) {
      const savedNotes = localStorage.getItem(`sma_notes_subj_${selectedSubject.id}`);
      setSubjectNotes(savedNotes || selectedSubject.notes);
    }
  }, [selectedSubject]);

  const handleSaveNotes = () => {
    if (!selectedSubject) return;
    localStorage.setItem(`sma_notes_subj_${selectedSubject.id}`, subjectNotes);
    triggerNotification('Catatan Disimpan', `Catatan belajar untuk mata pelajaran "${selectedSubject.name}" berhasil disimpan!`, 'success');
  };

  const handleCopyContact = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    triggerNotification('Kontak Disalin', `${label} guru berhasil disalin ke papan klip.`, 'success');
  };

  return (
    <div className="flex flex-col flex-1 p-5 pb-10 relative">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col text-left mb-4">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
          <BookOpen size={20} className="text-blue-600" />
          Mata Pelajaran
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Informasi guru, ruang kelas, jadwal, dan catatan belajar
        </p>
      </div>

      {/* SEARCH BAR (Material Design 3 style) */}
      <div className="relative mb-5 flex items-center shadow-xs bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden">
        <Search size={18} className="absolute left-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Cari mata pelajaran, guru, atau ruang..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs py-3.5 pl-11 pr-4 bg-transparent border-none focus:outline-none focus:ring-0 text-slate-800 dark:text-slate-100"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="p-1 text-slate-400 hover:text-slate-600 mr-3"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* DIRECTORY LISTING */}
      <div className="flex flex-col gap-3">
        {filteredSubjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center select-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[20px] p-6 shadow-sm">
            <Search size={36} className="text-slate-300 dark:text-slate-700 mb-2" />
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Hasil tidak ditemukan</p>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[160px]">
              Silakan periksa kembali kata kunci pencarian Anda.
            </p>
          </div>
        ) : (
          filteredSubjects.map((subj) => {
            const colors = getSubjectColors(subj.color);
            return (
              <div
                key={subj.id}
                onClick={() => setSelectedSubject(subj)}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-4 rounded-[20px] shadow-sm flex items-center justify-between gap-3 text-left cursor-pointer hover:scale-[1.01] hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <span className={`p-3 rounded-xl ${colors.bg} ${colors.text} flex-shrink-0`}>
                    <SubjectIcon name={subj.iconName} size={20} />
                  </span>
                  
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-100 truncate">
                      {subj.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate">
                      Guru: {subj.teacher}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium mt-0.5">
                      Ruang: {subj.room}
                    </span>
                  </div>
                </div>

                <ChevronRight size={16} className="text-slate-300 dark:text-slate-600 flex-shrink-0" />
              </div>
            );
          })
        )}
      </div>

      {/* SUBJECTS DETAILS SLIDE-UP DRAWER SHEET */}
      <AnimatePresence>
        {selectedSubject && (
          <div className="absolute inset-0 bg-black/50 z-40 flex items-end justify-center select-none p-4 backdrop-blur-xs">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white dark:bg-slate-900 rounded-t-[30px] rounded-b-[20px] w-full max-w-sm max-h-[92%] overflow-y-auto p-5 pb-6 text-left shadow-2xl flex flex-col gap-4 pointer-events-auto"
            >
              
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className={`p-2 rounded-lg ${getSubjectColors(selectedSubject.color).badgeBg}`}>
                    <SubjectIcon name={selectedSubject.iconName} size={16} />
                  </span>
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">
                    Detail {selectedSubject.name}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Drawer Contents */}
              <div className="flex flex-col gap-4">
                
                {/* Teacher Profile Box */}
                <div className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-900/60 flex flex-col gap-2">
                  <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">
                    Guru Pengampu & Ruang
                  </span>
                  <h5 className="text-xs font-black text-slate-800 dark:text-slate-200 mt-0.5">
                    {selectedSubject.teacher}
                  </h5>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    Kelas: {selectedSubject.room}
                  </p>

                  {/* Contacts Row */}
                  <div className="flex items-center gap-2.5 mt-2 border-t border-slate-200/50 dark:border-slate-800/40 pt-2.5">
                    <button
                      onClick={() => handleCopyContact(selectedSubject.teacherEmail, 'Email')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[9.5px] text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 transition-colors"
                    >
                      <Mail size={12} className="text-slate-400" />
                      Email Guru
                    </button>
                    <button
                      onClick={() => handleCopyContact(selectedSubject.teacherPhone, 'Nomor HP')}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[9.5px] text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 transition-colors"
                    >
                      <Phone size={12} className="text-slate-400" />
                      No. WhatsApp
                    </button>
                  </div>
                </div>

                {/* Timings Schedule list */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest pl-1">
                    Jadwal Pertemuan Kelas
                  </span>
                  {subjectSchedules.length === 0 ? (
                    <div className="text-[10px] text-slate-400 p-2 italic bg-slate-50 rounded-lg">
                      Tidak ada jam tatap muka terjadwal.
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {subjectSchedules.map((s) => (
                        <div
                          key={s.id}
                          className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100/60 dark:border-blue-900/40 text-[10px] font-bold text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                        >
                          <Clock size={11} className="text-blue-500" />
                          {s.day} • {s.startTime} - {s.endTime}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interactive Notes Section */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">
                      Catatan Belajar Pribadi
                    </span>
                    <button
                      onClick={handleSaveNotes}
                      className="flex items-center gap-1 text-[9.5px] font-black text-blue-600 hover:underline"
                    >
                      <Save size={10} />
                      Simpan Catatan
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={subjectNotes}
                    onChange={(e) => setSubjectNotes(e.target.value)}
                    placeholder="Tulis ringkasan materi, info tugas, kisi-kisi ulangan dari guru di sini..."
                    className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-medium leading-relaxed text-slate-700 dark:text-slate-300"
                  />
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
