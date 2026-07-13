/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  name: string;
  className: string;
  school: string;
  photoUrl: string;
  email: string;
  isLoggedIn: boolean;
}

export interface Subject {
  id: string;
  name: string;
  teacher: string;
  room: string;
  teacherEmail: string;
  teacherPhone: string;
  notes: string;
  color: string; // Tailwind bg-class or hex
  textColor: string; // Tailwind text-class or hex
  borderColor: string; // Tailwind border-class
  iconName: string;
}

export interface ScheduleItem {
  id: string;
  subjectId: string;
  day: 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat';
  startTime: string; // "07.00"
  endTime: string; // "07.45"
  room: string;
}

export interface Task {
  id: string;
  subjectId: string;
  title: string;
  description: string;
  deadline: string; // e.g., "Jumat, 17 Mei 2024" or ISO string
  completed: boolean;
}

export interface Reminder {
  id: string;
  title: string;
  type: 'jadwal' | 'tugas';
  timeLabel: string; // "07.00 - 07.45" or deadline time
  countdownLabel: string; // "10 menit lagi", "2 hari lagi"
  iconType: 'alarm' | 'calendar' | 'bell';
  dateLabel: string; // "Hari ini", "Besok", "Nanti"
}

export interface AcademicEvent {
  id: string;
  title: string;
  type: 'ulangan' | 'uts' | 'uas' | 'libur_nasional' | 'libur_sekolah';
  date: string; // "2024-05-24"
  description: string;
}
