/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Subject, ScheduleItem, Task, Reminder, AcademicEvent, UserProfile } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Andi Pratama',
  className: 'Kelas X IPA 1',
  school: 'SMA Negeri 1 Jakarta',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200', // A clean, professional placeholder avatar
  email: 'andi.pratama@sma1.sch.id',
  isLoggedIn: true,
};

export const initialSubjects: Subject[] = [
  {
    id: 'subj-1',
    name: 'Matematika',
    teacher: 'Pak Budi',
    room: 'Ruang X IPA 1',
    teacherEmail: 'budi.santoso@sma1.sch.id',
    teacherPhone: '0812-3456-7890',
    notes: 'Buku Paket Matematika Kelas X, Bab Trigonometri. Tugas dikerjakan di buku latihan.',
    color: 'blue',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderColor: 'border-blue-200 dark:border-blue-900',
    iconName: 'Calculator',
  },
  {
    id: 'subj-2',
    name: 'Biologi',
    teacher: 'Bu Sinta',
    room: 'Ruang X IPA 1',
    teacherEmail: 'sinta.lestari@sma1.sch.id',
    teacherPhone: '0813-8765-4321',
    notes: 'Praktikum di Laboratorium Biologi setiap hari Rabu kedua. Harap membawa jas lab.',
    color: 'emerald',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    borderColor: 'border-emerald-200 dark:border-emerald-900',
    iconName: 'Dna',
  },
  {
    id: 'subj-3',
    name: 'Fisika',
    teacher: 'Pak Andi',
    room: 'Lab Fisika',
    teacherEmail: 'andi.wijaya@sma1.sch.id',
    teacherPhone: '0815-9999-8888',
    notes: 'Pembahasan Hukum Newton dan termodinamika. Kuis diadakan tanpa pemberitahuan.',
    color: 'purple',
    textColor: 'text-purple-600 dark:text-purple-400',
    borderColor: 'border-purple-200 dark:border-purple-900',
    iconName: 'Atom',
  },
  {
    id: 'subj-4',
    name: 'Kimia',
    teacher: 'Bu Lisa',
    room: 'Lab Kimia',
    teacherEmail: 'lisa.herawati@sma1.sch.id',
    teacherPhone: '0811-2222-3333',
    notes: 'Materi Ikatan Kimia dan Tabel Periodik Unsur. Selalu gunakan kacamata pengaman di laboratorium.',
    color: 'pink',
    textColor: 'text-pink-600 dark:text-pink-400',
    borderColor: 'border-pink-200 dark:border-pink-900',
    iconName: 'FlaskConical',
  },
  {
    id: 'subj-5',
    name: 'Bahasa Inggris',
    teacher: 'Mr. John',
    room: 'Ruang X IPA 1',
    teacherEmail: 'john.smith@sma1.sch.id',
    teacherPhone: '0812-7777-6666',
    notes: 'Focus on narrative texts and daily English conversations. Weekly vocabulary drills.',
    color: 'orange',
    textColor: 'text-orange-600 dark:text-orange-400',
    borderColor: 'border-orange-200 dark:border-orange-900',
    iconName: 'Languages',
  },
  {
    id: 'subj-6',
    name: 'Informatika',
    teacher: 'Pak Dika',
    room: 'Lab Komputer',
    teacherEmail: 'dika.pratama@sma1.sch.id',
    teacherPhone: '0818-4444-5555',
    notes: 'Pemrograman Python Dasar & Logika Informatika. Praktik langsung di PC Laboratorium.',
    color: 'indigo',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    borderColor: 'border-indigo-200 dark:border-indigo-900',
    iconName: 'Cpu',
  },
  {
    id: 'subj-7',
    name: 'Bahasa Indonesia',
    teacher: 'Bu Rini',
    room: 'Ruang X IPA 1',
    teacherEmail: 'rini.maryani@sma1.sch.id',
    teacherPhone: '0819-3333-2222',
    notes: 'Materi Struktur Teks Eksposisi dan Teks Debat. Menggunakan buku cetak Yudhistira.',
    color: 'amber',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-200 dark:border-amber-900',
    iconName: 'BookOpen',
  },
  {
    id: 'subj-8',
    name: 'Sejarah',
    teacher: 'Pak Yuda',
    room: 'Ruang X IPS 2',
    teacherEmail: 'yuda.permana@sma1.sch.id',
    teacherPhone: '0812-1111-0000',
    notes: 'Sejarah Perjuangan Nasional & Proklamasi. Tugas resume bab dikumpulkan setiap hari Senin.',
    color: 'teal',
    textColor: 'text-teal-600 dark:text-teal-400',
    borderColor: 'border-teal-200 dark:border-teal-900',
    iconName: 'Compass',
  },
  {
    id: 'subj-9',
    name: 'Pendidikan Pancasila',
    teacher: 'Bu Ani',
    room: 'Ruang X IPA 1',
    teacherEmail: 'ani.suprihatin@sma1.sch.id',
    teacherPhone: '0813-2468-1357',
    notes: 'Pemahaman sistem pemerintahan dan konstitusi negara. Diskusi interaktif kelompok.',
    color: 'violet',
    textColor: 'text-violet-600 dark:text-violet-400',
    borderColor: 'border-violet-200 dark:border-violet-900',
    iconName: 'ShieldAlert',
  }
];

export const initialSchedule: ScheduleItem[] = [
  // Senin
  { id: 'sched-101', subjectId: 'subj-1', day: 'Senin', startTime: '07.00', endTime: '07.45', room: 'Ruang X IPA 1' },
  { id: 'sched-102', subjectId: 'subj-1', day: 'Senin', startTime: '07.45', endTime: '08.30', room: 'Ruang X IPA 1' },
  { id: 'sched-103', subjectId: 'subj-2', day: 'Senin', startTime: '08.45', endTime: '09.30', room: 'Ruang X IPA 1' },
  { id: 'sched-104', subjectId: 'subj-2', day: 'Senin', startTime: '09.30', endTime: '10.15', room: 'Ruang X IPA 1' },
  { id: 'sched-105', subjectId: 'subj-6', day: 'Senin', startTime: '10.30', endTime: '11.15', room: 'Lab Komputer' },
  { id: 'sched-106', subjectId: 'subj-6', day: 'Senin', startTime: '11.15', endTime: '12.00', room: 'Lab Komputer' },

  // Selasa
  { id: 'sched-201', subjectId: 'subj-7', day: 'Selasa', startTime: '07.00', endTime: '07.45', room: 'Ruang X IPA 1' },
  { id: 'sched-202', subjectId: 'subj-7', day: 'Selasa', startTime: '07.45', endTime: '08.30', room: 'Ruang X IPA 1' },
  { id: 'sched-203', subjectId: 'subj-3', day: 'Selasa', startTime: '08.45', endTime: '09.30', room: 'Lab Fisika' },
  { id: 'sched-204', subjectId: 'subj-3', day: 'Selasa', startTime: '09.30', endTime: '10.15', room: 'Lab Fisika' },
  { id: 'sched-205', subjectId: 'subj-5', day: 'Selasa', startTime: '10.30', endTime: '11.15', room: 'Ruang X IPA 1' },
  { id: 'sched-206', subjectId: 'subj-5', day: 'Selasa', startTime: '11.15', endTime: '12.00', room: 'Ruang X IPA 1' },

  // Rabu
  { id: 'sched-301', subjectId: 'subj-4', day: 'Rabu', startTime: '07.00', endTime: '07.45', room: 'Lab Kimia' },
  { id: 'sched-302', subjectId: 'subj-4', day: 'Rabu', startTime: '07.45', endTime: '08.30', room: 'Lab Kimia' },
  { id: 'sched-303', subjectId: 'subj-1', day: 'Rabu', startTime: '08.45', endTime: '09.30', room: 'Ruang X IPA 1' },
  { id: 'sched-304', subjectId: 'subj-1', day: 'Rabu', startTime: '09.30', endTime: '10.15', room: 'Ruang X IPA 1' },
  { id: 'sched-305', subjectId: 'subj-8', day: 'Rabu', startTime: '10.30', endTime: '11.15', room: 'Ruang X IPS 2' },
  { id: 'sched-306', subjectId: 'subj-8', day: 'Rabu', startTime: '11.15', endTime: '12.00', room: 'Ruang X IPS 2' },

  // Kamis
  { id: 'sched-401', subjectId: 'subj-5', day: 'Kamis', startTime: '07.00', endTime: '07.45', room: 'Ruang X IPA 1' },
  { id: 'sched-402', subjectId: 'subj-5', day: 'Kamis', startTime: '07.45', endTime: '08.30', room: 'Ruang X IPA 1' },
  { id: 'sched-403', subjectId: 'subj-9', day: 'Kamis', startTime: '08.45', endTime: '09.30', room: 'Ruang X IPA 1' },
  { id: 'sched-404', subjectId: 'subj-9', day: 'Kamis', startTime: '09.30', endTime: '10.15', room: 'Ruang X IPA 1' },
  { id: 'sched-405', subjectId: 'subj-2', day: 'Kamis', startTime: '10.30', endTime: '11.15', room: 'Ruang X IPA 1' },
  { id: 'sched-406', subjectId: 'subj-2', day: 'Kamis', startTime: '11.15', endTime: '12.00', room: 'Ruang X IPA 1' },

  // Jumat
  { id: 'sched-501', subjectId: 'subj-3', day: 'Jumat', startTime: '07.00', endTime: '07.45', room: 'Lab Fisika' },
  { id: 'sched-502', subjectId: 'subj-3', day: 'Jumat', startTime: '07.45', endTime: '08.30', room: 'Lab Fisika' },
  { id: 'sched-503', subjectId: 'subj-4', day: 'Jumat', startTime: '08.45', endTime: '09.30', room: 'Lab Kimia' },
  { id: 'sched-504', subjectId: 'subj-4', day: 'Jumat', startTime: '09.30', endTime: '10.15', room: 'Lab Kimia' },
];

export const initialTasks: Task[] = [
  {
    id: 'task-1',
    subjectId: 'subj-1',
    title: 'Tugas Matematika',
    description: 'Kerjakan soal latihan Bab Trigonometri di halaman 45, bagian A nomor 1-10.',
    deadline: 'Jumat, 17 Mei 2024',
    completed: false,
  },
  {
    id: 'task-2',
    subjectId: 'subj-8',
    title: 'Makalah Sejarah',
    description: 'Membuat makalah ringkasan sejarah perjuangan pahlawan nasional daerah masing-masing minimal 5 halaman.',
    deadline: 'Senin, 20 Mei 2024',
    completed: false,
  },
  {
    id: 'task-3',
    subjectId: 'subj-2',
    title: 'Laporan Biologi',
    description: 'Laporan hasil pengamatan praktikum ekosistem kolam di belakang sekolah. Diketik rapi beserta tabel data.',
    deadline: 'Rabu, 22 Mei 2024',
    completed: false,
  },
  {
    id: 'task-4',
    subjectId: 'subj-9',
    title: 'Presentasi PKN',
    description: 'Menyiapkan materi slide presentasi PowerPoint mengenai pembagian kekuasaan lembaga tinggi negara.',
    deadline: 'Kamis, 23 Mei 2024',
    completed: true,
  },
];

export const initialReminders: Reminder[] = [
  {
    id: 'rem-1',
    title: 'Matematika',
    type: 'jadwal',
    timeLabel: '07.00 - 07.45',
    countdownLabel: '10 menit lagi',
    iconType: 'alarm',
    dateLabel: 'Hari ini',
  },
  {
    id: 'rem-2',
    title: 'Biologi',
    type: 'jadwal',
    timeLabel: '08.45 - 09.30',
    countdownLabel: '1 jam 25 menit lagi',
    iconType: 'alarm',
    dateLabel: 'Hari ini',
  },
  {
    id: 'rem-3',
    title: 'Makalah Sejarah',
    type: 'tugas',
    timeLabel: 'Senin, 20 Mei 2024',
    countdownLabel: 'Besok',
    iconType: 'calendar',
    dateLabel: 'Besok',
  },
  {
    id: 'rem-4',
    title: 'Laporan Biologi',
    type: 'tugas',
    timeLabel: 'Rabu, 22 Mei 2024',
    countdownLabel: '2 hari lagi',
    iconType: 'bell',
    dateLabel: 'Nanti',
  },
  {
    id: 'rem-5',
    title: 'Presentasi PKN',
    type: 'tugas',
    timeLabel: 'Kamis, 23 Mei 2024',
    countdownLabel: '3 hari lagi',
    iconType: 'bell',
    dateLabel: 'Nanti',
  },
];

export const initialAcademicEvents: AcademicEvent[] = [
  {
    id: 'event-1',
    title: 'Ulangan Harian Sejarah (Bab Perjuangan)',
    type: 'ulangan',
    date: '2026-07-20',
    description: 'Materi mengenai Perjuangan Bersenjata & Diplomasi mempertahankan kemerdekaan RI.',
  },
  {
    id: 'event-2',
    title: 'UTS Biologi (Ekosistem & Sel)',
    type: 'uts',
    date: '2026-07-22',
    description: 'Ujian Tengah Semester tertulis di kelas masing-masing. Harap membawa alat tulis lengkap.',
  },
  {
    id: 'event-3',
    title: 'UTS Matematika Semester Ganjil',
    type: 'uts',
    date: '2026-07-24',
    description: 'Ujian Tengah Semester mengenai Trigonometri & Fungsi Aljabar.',
  },
  {
    id: 'event-4',
    title: 'UAS Semester Ganjil',
    type: 'uas',
    date: '2026-08-05',
    description: 'Ujian Akhir Semester Ganjil serentak se-kabupaten dimulai tanggal 5 s.d. 12 Agustus.',
  },
  {
    id: 'event-5',
    title: 'Libur Hari Kemerdekaan RI',
    type: 'libur_nasional',
    date: '2026-08-17',
    description: 'Upacara bendera pagi hari, dilanjutkan dengan hari libur nasional HUT RI ke-81.',
  },
  {
    id: 'event-6',
    title: 'Libur Akhir Semester Ganjil',
    type: 'libur_sekolah',
    date: '2026-08-25',
    description: 'Libur sekolah semester ganjil dimulai dari tanggal 25 Agustus hingga 2 September.',
  }
];
