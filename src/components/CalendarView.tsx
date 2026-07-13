/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Plus, Trash2, CalendarDays, ClipboardList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CalendarView: React.FC = () => {
  const { academicEvents, addAcademicEvent, deleteAcademicEvent } = useApp();

  // Calendar states centered around July 2026 (our current local year/month)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(6); // 0-indexed, so 6 is July

  const [selectedDate, setSelectedDate] = useState<string>('2026-07-13'); // default selected date is current local date

  // Add agenda modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'ulangan' | 'uts' | 'uas' | 'libur_nasional' | 'libur_sekolah'>('ulangan');
  const [newDesc, setNewDesc] = useState('');

  const monthsID = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  // Total days in month helper
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of week for current month (0 is Sunday, 1 is Monday...)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  // Generate blank cells and day cells
  const blankCells = Array(firstDay).fill(null);
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Filter events for the currently selected date
  const eventsForSelectedDate = academicEvents.filter((e) => e.date === selectedDate);

  // Helper to format date string
  const formatDateString = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleCellClick = (day: number) => {
    const formatted = formatDateString(currentYear, currentMonth, day);
    setSelectedDate(formatted);
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addAcademicEvent({
      title: newTitle,
      type: newType,
      date: selectedDate,
      description: newDesc,
    });

    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  // Helper to get color of event dots or cards
  const getEventTypeColors = (type: string) => {
    switch (type) {
      case 'ulangan':
        return {
          dot: 'bg-rose-500',
          bg: 'bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-900/40',
          text: 'text-rose-700 dark:text-rose-300',
          badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200'
        };
      case 'uts':
        return {
          dot: 'bg-purple-500',
          bg: 'bg-purple-50 dark:bg-purple-950/20 border-purple-100 dark:border-purple-900/40',
          text: 'text-purple-700 dark:text-purple-300',
          badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200'
        };
      case 'uas':
        return {
          dot: 'bg-blue-500',
          bg: 'bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/40',
          text: 'text-blue-700 dark:text-blue-300',
          badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200'
        };
      case 'libur_nasional':
        return {
          dot: 'bg-emerald-500',
          bg: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40',
          text: 'text-emerald-700 dark:text-emerald-300',
          badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200'
        };
      case 'libur_sekolah':
        return {
          dot: 'bg-amber-500',
          bg: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-900/40',
          text: 'text-amber-700 dark:text-amber-300',
          badge: 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200'
        };
      default:
        return {
          dot: 'bg-slate-500',
          bg: 'bg-slate-50 dark:bg-slate-900/20 border-slate-100 dark:border-slate-800/40',
          text: 'text-slate-700 dark:text-slate-300',
          badge: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
        };
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* HEADER */}
      <div className="flex flex-col text-left">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
          <CalendarDays size={20} className="text-blue-600" />
          Kalender Akademik
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Jadwal ulangan, ujian, libur sekolah, dan agenda lainnya
        </p>
      </div>

      {/* MONTH NAVIGATOR */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[20px] shadow-sm p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
            {monthsID[currentMonth]} {currentYear}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* WEEKDAYS HEADERS */}
        <div className="grid grid-cols-7 text-center mb-1">
          {daysOfWeek.map((day, idx) => (
            <span
              key={day}
              className={`text-[10.5px] font-bold pb-2 ${
                idx === 0 ? 'text-rose-500' : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {day}
            </span>
          ))}
        </div>

        {/* DAYS GRID */}
        <div className="grid grid-cols-7 text-center gap-1">
          {/* Blank cells */}
          {blankCells.map((_, idx) => (
            <div key={`blank-${idx}`} className="aspect-square"></div>
          ))}

          {/* Active day cells */}
          {dayCells.map((day) => {
            const formatted = formatDateString(currentYear, currentMonth, day);
            const isSelected = selectedDate === formatted;
            
            // Check for events on this day
            const dayEvents = academicEvents.filter((e) => e.date === formatted);
            const isToday = formatted === '2026-07-13'; // Mock current date

            return (
              <button
                key={`day-${day}`}
                onClick={() => handleCellClick(day)}
                className={`aspect-square rounded-xl text-xs font-semibold flex flex-col items-center justify-center relative transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm scale-105'
                    : isToday
                    ? 'bg-blue-100 dark:bg-blue-950/50 text-blue-600 dark:text-blue-300 ring-2 ring-blue-500/20'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                }`}
              >
                <span>{day}</span>
                
                {/* Event dots container */}
                {dayEvents.length > 0 && (
                  <div className="flex gap-0.5 justify-center mt-0.5 absolute bottom-1.5">
                    {dayEvents.slice(0, 3).map((e) => (
                      <span
                        key={e.id}
                        className={`w-1 h-1 rounded-full ${
                          isSelected ? 'bg-white' : getEventTypeColors(e.type).dot
                        }`}
                      ></span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* EVENTS OF THE SELECTED DATE */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Agenda: {new Date(selectedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1 py-1 px-2.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 rounded-xl text-[10.5px] font-bold hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
          >
            <Plus size={12} />
            Tambah Agenda
          </button>
        </div>

        <div className="flex flex-col gap-3 min-h-[140px]">
          {eventsForSelectedDate.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[20px] shadow-sm text-center">
              <ClipboardList size={32} className="text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Tidak Ada Agenda</p>
              <p className="text-[10px] text-slate-400 mt-1 max-w-[200px]">
                Ketuk tombol "Tambah Agenda" jika ingin merencanakan tugas atau kegiatan belajar hari ini.
              </p>
            </div>
          ) : (
            eventsForSelectedDate.map((event) => {
              const styles = getEventTypeColors(event.type);
              return (
                <div
                  key={event.id}
                  className={`p-4 border ${styles.bg} rounded-[20px] shadow-sm flex items-start justify-between gap-3 text-left`}
                >
                  <div className="flex flex-col gap-1.5 flex-1">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold w-fit capitalize ${styles.badge}`}>
                      {event.type.replace('_', ' ')}
                    </span>
                    <h4 className={`text-xs font-bold ${styles.text} leading-snug`}>
                      {event.title}
                    </h4>
                    {event.description && (
                      <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-normal">
                        {event.description}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteAcademicEvent(event.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
                    title="Hapus Agenda"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ADD AGENDA MODAL CONTAINER */}
      <AnimatePresence>
        {showAddModal && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-end justify-center select-none p-4 backdrop-blur-xs">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white dark:bg-slate-900 rounded-t-[30px] rounded-b-[20px] w-full max-w-sm max-h-[90%] overflow-y-auto p-5 pb-6 text-left shadow-2xl flex flex-col gap-4 pointer-events-auto"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Tambah Agenda Baru
                </h4>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              <form onSubmit={handleAddEventSubmit} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Nama Agenda / Ujian
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ulangan Harian Kimia..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Jenis Kegiatan
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ulangan">Ulangan Harian</option>
                    <option value="uts">UTS (Ujian Tengah Semester)</option>
                    <option value="uas">UAS (Ujian Akhir Semester)</option>
                    <option value="libur_nasional">Libur Nasional</option>
                    <option value="libur_sekolah">Libur Sekolah</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Tanggal Terpilih
                  </label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10.5px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Keterangan (Opsional)
                  </label>
                  <textarea
                    placeholder="Materi ujian, perlengkapan yang harus dibawa, dll..."
                    rows={3}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 shadow-sm mt-2"
                >
                  <Plus size={15} />
                  Simpan Agenda Baru
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
