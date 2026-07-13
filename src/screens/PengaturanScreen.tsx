/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  GraduationCap,
  Settings,
  Edit2,
  RefreshCw,
  Sun,
  Moon,
  Globe,
  Info,
  LogOut,
  ChevronRight,
  ChevronLeft,
  CloudLightning,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PengaturanScreen: React.FC = () => {
  const {
    userProfile,
    updateUserProfile,
    theme,
    toggleTheme,
    language,
    toggleLanguage,
    firebaseBackupTime,
    triggerFirebaseSync,
    navigateTo,
    triggerNotification,
  } = useApp();

  // Modal control states
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  // Sync state loading spinner
  const [isSyncing, setIsSyncing] = useState(false);

  // Form states
  const [editName, setEditName] = useState(userProfile.name);
  const [editSchool, setEditSchool] = useState(userProfile.school);
  const [editPhoto, setEditPhoto] = useState(userProfile.photoUrl);
  const [selectedClass, setSelectedClass] = useState(userProfile.className);

  const classesList = [
    'Kelas X IPA 1', 'Kelas X IPA 2', 'Kelas X IPS 1', 'Kelas X IPS 2',
    'Kelas XI IPA 1', 'Kelas XI IPA 2', 'Kelas XI IPS 1', 'Kelas XII IPA 1'
  ];

  const handleEditProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      school: editSchool,
      photoUrl: editPhoto,
    });
    setShowEditProfileModal(false);
  };

  const handleClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ className: selectedClass });
    setShowClassModal(false);
  };

  const handleSyncClick = () => {
    setIsSyncing(true);
    triggerFirebaseSync();
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar dari akun SMA Schedule?')) {
      triggerNotification('Logout Sukses', 'Anda telah keluar dari simulator SMA Schedule.', 'warning');
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div className="flex flex-col flex-1 p-5 pb-10 relative">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col text-left mb-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
          <Settings size={20} className="text-blue-600" />
          Pengaturan
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Ubah konfigurasi profil, kelas, bahasa, dan sinkronisasi
        </p>
      </div>

      {/* USER PROFILE CARD (Material design 3) */}
      <div 
        onClick={() => {
          setEditName(userProfile.name);
          setEditSchool(userProfile.school);
          setEditPhoto(userProfile.photoUrl);
          setShowEditProfileModal(true);
        }}
        className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-5 rounded-[24px] shadow-xs flex items-center justify-between text-left cursor-pointer hover:scale-[1.01] transition-all relative overflow-hidden group mb-6"
      >
        <div className="absolute -right-10 -bottom-10 w-24 h-24 rounded-full bg-slate-50/50 dark:bg-slate-950/20 pointer-events-none group-hover:scale-125 transition-transform"></div>
        
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-100 dark:border-slate-800/80 shadow-xs">
            <img
              src={userProfile.photoUrl}
              alt={userProfile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h4 className="text-sm font-black leading-snug text-slate-900 dark:text-slate-100 truncate">
              {userProfile.name}
            </h4>
            <span className="text-[10.5px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 truncate">
              {userProfile.className}
            </span>
            <span className="text-[9.5px] text-slate-400 dark:text-slate-500 mt-1 truncate">
              {userProfile.school}
            </span>
          </div>
        </div>

        <ChevronRight size={18} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
      </div>

      {/* SECTION: AKUN & KELAS */}
      <div className="flex flex-col gap-3 text-left mb-6">
        <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-slate-400 pl-1">
          Akun & Kelas
        </span>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[22px] shadow-xs overflow-hidden flex flex-col">
          
          {/* Edit Profil item */}
          <button
            onClick={() => {
              setEditName(userProfile.name);
              setEditSchool(userProfile.school);
              setEditPhoto(userProfile.photoUrl);
              setShowEditProfileModal(true);
            }}
            className="px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 border-b border-slate-50 dark:border-slate-800/60"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300 rounded-lg">
                <User size={15} />
              </span>
              <span className="text-[11.5px] font-bold text-slate-700 dark:text-slate-300">
                Edit Profil
              </span>
            </div>
            <ChevronRight size={14} className="text-slate-400" />
          </button>

          {/* Ganti Kelas item */}
          <button
            onClick={() => {
              setSelectedClass(userProfile.className);
              setShowClassModal(true);
            }}
            className="px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 border-b border-slate-50 dark:border-slate-800/60"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300 rounded-lg">
                <GraduationCap size={15} />
              </span>
              <span className="text-[11.5px] font-bold text-slate-700 dark:text-slate-300">
                Ganti Kelas
              </span>
            </div>
            <ChevronRight size={14} className="text-slate-400" />
          </button>

          {/* Guru & Mapel */}
          <button
            onClick={() => navigateTo('mapel')}
            className="px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 border-b border-slate-50 dark:border-slate-800/60"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300 rounded-lg">
                <Settings size={15} />
              </span>
              <span className="text-[11.5px] font-bold text-slate-700 dark:text-slate-300">
                Guru & Mata Pelajaran
              </span>
            </div>
            <ChevronRight size={14} className="text-slate-400" />
          </button>

          {/* Backup & Sinkronisasi */}
          <button
            onClick={handleSyncClick}
            disabled={isSyncing}
            className="px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`p-2 rounded-lg flex-shrink-0 ${
                isSyncing 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 animate-spin' 
                  : 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-300'
              }`}>
                <RefreshCw size={15} />
              </span>
              <div className="flex flex-col min-w-0">
                <span className="text-[11.5px] font-bold text-slate-700 dark:text-slate-300">
                  Backup & Sinkronisasi
                </span>
                <span className="text-[9px] text-slate-400 truncate">
                  Terakhir: {firebaseBackupTime}
                </span>
              </div>
            </div>
            <ChevronRight size={14} className="text-slate-400" />
          </button>

        </div>
      </div>

      {/* SECTION: APLIKASI */}
      <div className="flex flex-col gap-3 text-left">
        <span className="text-[9.5px] font-extrabold uppercase tracking-widest text-slate-400 pl-1">
          Aplikasi
        </span>
        
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[22px] shadow-xs overflow-hidden flex flex-col">
          
          {/* Tema Gelap / Terang */}
          <button
            onClick={toggleTheme}
            className="px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 border-b border-slate-50 dark:border-slate-800/60"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-300 rounded-lg">
                {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
              </span>
              <span className="text-[11.5px] font-bold text-slate-700 dark:text-slate-300">
                Tema Aplikasi
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">
              {theme === 'light' ? 'Terang' : 'Gelap'}
            </span>
          </button>

          {/* Bahasa */}
          <button
            onClick={toggleLanguage}
            className="px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 border-b border-slate-50 dark:border-slate-800/60"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-300 rounded-lg">
                <Globe size={15} />
              </span>
              <span className="text-[11.5px] font-bold text-slate-700 dark:text-slate-300">
                Bahasa
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">
              {language === 'id' ? 'Indonesia' : 'English'}
            </span>
          </button>

          {/* Tentang */}
          <button
            onClick={() => setShowAboutModal(true)}
            className="px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/40 border-b border-slate-50 dark:border-slate-800/60"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-slate-50 text-slate-600 dark:bg-slate-950/50 dark:text-slate-300 rounded-lg">
                <Info size={15} />
              </span>
              <span className="text-[11.5px] font-bold text-slate-700 dark:text-slate-300">
                Tentang Aplikasi
              </span>
            </div>
            <ChevronRight size={14} className="text-slate-400" />
          </button>

          {/* Keluar (Logout) */}
          <button
            onClick={handleLogout}
            className="px-4 py-3.5 flex items-center justify-between text-left hover:bg-rose-50/50 dark:hover:bg-rose-950/20"
          >
            <div className="flex items-center gap-3">
              <span className="p-2 bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 rounded-lg">
                <LogOut size={15} />
              </span>
              <span className="text-[11.5px] font-bold text-rose-600 dark:text-rose-400">
                Keluar Akun
              </span>
            </div>
            <ChevronRight size={14} className="text-rose-300" />
          </button>

        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      <AnimatePresence>
        {showEditProfileModal && (
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
                  Ubah Profil Siswa
                </h4>
                <button
                  onClick={() => setShowEditProfileModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              <form onSubmit={handleEditProfileSubmit} className="flex flex-col gap-3.5">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Nama Sekolah</label>
                  <input
                    type="text"
                    required
                    value={editSchool}
                    onChange={(e) => setEditSchool(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">URL Foto Profil</label>
                  <input
                    type="text"
                    required
                    value={editPhoto}
                    onChange={(e) => setEditPhoto(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-all shadow-sm mt-2"
                >
                  Simpan Perubahan
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GANTI KELAS MODAL */}
      <AnimatePresence>
        {showClassModal && (
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
                  Ganti Kelas Belajar
                </h4>
                <button
                  onClick={() => setShowClassModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>

              <form onSubmit={handleClassSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Pilih Ruang Kelas Anda</label>
                  <div className="grid grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                    {classesList.map((cls) => {
                      const isSelected = selectedClass === cls;
                      return (
                        <button
                          key={cls}
                          type="button"
                          onClick={() => setSelectedClass(cls)}
                          className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-blue-50 border-blue-400 text-blue-600 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-300'
                              : 'bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          {cls}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-all shadow-sm"
                >
                  Terapkan Kelas Baru
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ABOUT APPLICATION MODAL */}
      <AnimatePresence>
        {showAboutModal && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center select-none p-4 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[28px] w-full max-w-xs p-6 text-center shadow-2xl flex flex-col gap-3.5 pointer-events-auto"
            >
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl w-fit mx-auto">
                <GraduationCap size={32} />
              </div>
              
              <div className="flex flex-col">
                <h4 className="text-sm font-black text-slate-800 dark:text-slate-100">
                  SMA Schedule Mobile App
                </h4>
                <span className="text-[10px] text-slate-400 font-bold mt-0.5">
                  Versi 1.0.0 (Production Build)
                </span>
              </div>

              <p className="text-[10.5px] text-slate-500 dark:text-slate-400 leading-relaxed text-center px-1">
                Aplikasi mobile asisten cerdas yang dirancang khusus untuk mempermudah siswa dalam mengatur jadwal mata pelajaran harian, agenda ulangan/ujian, pencatatan materi, dan manajemen deadline tugas sekolah secara efisien.
              </p>

              <div className="bg-slate-50 dark:bg-slate-950 rounded-xl p-2.5 border border-slate-100 dark:border-slate-900 text-[9px] font-semibold text-slate-400 text-left flex flex-col gap-1">
                <div>• Bahasa Pemrograman: Dart / Flutter</div>
                <div>• State Management: Riverpod / Providers</div>
                <div>• Database & Storage: Firebase Firestore</div>
              </div>

              <button
                onClick={() => setShowAboutModal(false)}
                className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl text-xs hover:bg-blue-700 transition-all shadow-sm"
              >
                Tutup Deskripsi
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
