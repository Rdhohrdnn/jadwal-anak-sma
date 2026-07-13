/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Subject, ScheduleItem, Task, Reminder, AcademicEvent } from '../types';
import {
  initialUserProfile,
  initialSubjects,
  initialSchedule,
  initialTasks,
  initialReminders,
  initialAcademicEvents,
} from '../data/dummyData';

export type ScreenType = 'beranda' | 'jadwal' | 'tugas' | 'pengingat' | 'pengaturan' | 'mapel' | 'kalender' | 'dashboard';

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: Date;
  type: 'success' | 'info' | 'warning';
}

interface AppContextProps {
  // Screens navigation
  currentScreen: ScreenType;
  navigateTo: (screen: ScreenType) => void;
  screenHistory: ScreenType[];
  goBack: () => void;

  // State
  userProfile: UserProfile;
  subjects: Subject[];
  schedule: ScheduleItem[];
  tasks: Task[];
  reminders: Reminder[];
  academicEvents: AcademicEvent[];
  searchQuery: string;
  theme: 'light' | 'dark';
  language: 'id' | 'en';
  isLocalNotificationsEnabled: boolean;

  // Mutations
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  updateTask: (id: string, updatedTask: Partial<Task>) => void;
  toggleTaskCompleted: (id: string) => void;
  deleteTask: (id: string) => void;
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  deleteReminder: (id: string) => void;
  addAcademicEvent: (event: Omit<AcademicEvent, 'id'>) => void;
  deleteAcademicEvent: (id: string) => void;
  setSearchQuery: (query: string) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  toggleLocalNotifications: () => void;

  // In-app Notifications Toast Simulation
  notifications: AppNotification[];
  triggerNotification: (title: string, body: string, type?: 'success' | 'info' | 'warning') => void;
  dismissNotification: (id: string) => void;

  // Firebase simulated connection status
  firebaseConnected: boolean;
  setFirebaseConnected: (connected: boolean) => void;
  firebaseBackupTime: string;
  triggerFirebaseSync: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation States
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('beranda');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['beranda']);

  // Core States (Load from LocalStorage or fallback to Dummy Data)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('sma_user_profile');
    return saved ? JSON.parse(saved) : initialUserProfile;
  });

  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects); // Read-only reference for subjects list
  const [schedule, setSchedule] = useState<ScheduleItem[]>(initialSchedule); // Read-only reference

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('sma_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('sma_reminders');
    return saved ? JSON.parse(saved) : initialReminders;
  });

  const [academicEvents, setAcademicEvents] = useState<AcademicEvent[]>(() => {
    const saved = localStorage.getItem('sma_academic_events');
    return saved ? JSON.parse(saved) : initialAcademicEvents;
  });

  // Settings & Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sma_theme');
    return (saved as 'light' | 'dark') || 'light';
  });
  const [language, setLanguage] = useState<'id' | 'en'>(() => {
    const saved = localStorage.getItem('sma_language');
    return (saved as 'id' | 'en') || 'id';
  });
  const [isLocalNotificationsEnabled, setIsLocalNotificationsEnabled] = useState(true);

  // Simulated Push Notifications Toast State
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  // Simulated Firebase State
  const [firebaseConnected, setFirebaseConnected] = useState(true);
  const [firebaseBackupTime, setFirebaseBackupTime] = useState(() => {
    return localStorage.getItem('sma_firebase_backup') || 'Belum pernah disinkronkan';
  });

  // Persistance Effects
  useEffect(() => {
    localStorage.setItem('sma_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('sma_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('sma_reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('sma_academic_events', JSON.stringify(academicEvents));
  }, [academicEvents]);

  useEffect(() => {
    localStorage.setItem('sma_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sma_language', language);
  }, [language]);

  // Navigation Logic
  const navigateTo = (screen: ScreenType) => {
    if (screen === currentScreen) return;
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    if (screenHistory.length <= 1) return;
    const newHistory = [...screenHistory];
    newHistory.pop(); // Remove current screen
    const prevScreen = newHistory[newHistory.length - 1];
    setScreenHistory(newHistory);
    setCurrentScreen(prevScreen);
  };

  // Notification Toast simulation
  const triggerNotification = (title: string, body: string, type: 'success' | 'info' | 'warning' = 'info') => {
    if (!isLocalNotificationsEnabled) return;

    const id = `notif-${Date.now()}`;
    const newNotif: AppNotification = { id, title, body, timestamp: new Date(), type };
    setNotifications((prev) => [newNotif, ...prev].slice(0, 5)); // Limit to last 5 notifications in toast stack

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      dismissNotification(id);
    }, 4000);
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // User Profile Mutation
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
    triggerNotification('Profil Diperbarui', 'Data profil pengguna berhasil disimpan!', 'success');
  };

  // Tasks Mutations
  const addTask = (taskInput: Omit<Task, 'id' | 'completed'>) => {
    const id = `task-${Date.now()}`;
    const newTask: Task = { ...taskInput, id, completed: false };
    setTasks((prev) => [newTask, ...prev]);

    // Find subject name for the notification
    const subj = subjects.find((s) => s.id === taskInput.subjectId);
    triggerNotification(
      'Tugas Baru Ditambahkan',
      `Tugas "${taskInput.title}" (${subj?.name || 'Mata Pelajaran'}) ditambahkan untuk ${taskInput.deadline}.`,
      'success'
    );

    // Auto create reminder
    addReminder({
      title: taskInput.title,
      type: 'tugas',
      timeLabel: taskInput.deadline,
      countdownLabel: 'Baru dibuat',
      iconType: 'calendar',
      dateLabel: 'Nanti',
    });
  };

  const updateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t)));
    triggerNotification('Tugas Diperbarui', 'Perubahan pada detail tugas berhasil disimpan.', 'success');
  };

  const toggleTaskCompleted = (id: string) => {
    let taskName = '';
    let completedStatus = false;

    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          taskName = t.title;
          completedStatus = !t.completed;
          return { ...t, completed: completedStatus };
        }
        return t;
      })
    );

    triggerNotification(
      completedStatus ? 'Tugas Selesai!' : 'Tugas Belum Selesai',
      `Tugas "${taskName}" ditandai sebagai ${completedStatus ? 'selesai' : 'belum selesai'}.`,
      completedStatus ? 'success' : 'info'
    );
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    triggerNotification(
      'Tugas Dihapus',
      `Tugas "${taskToDelete?.title || ''}" telah berhasil dihapus.`,
      'warning'
    );
  };

  // Reminders Mutations
  const addReminder = (remInput: Omit<Reminder, 'id'>) => {
    const id = `rem-${Date.now()}`;
    const newRem: Reminder = { ...remInput, id };
    setReminders((prev) => [newRem, ...prev]);
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
    triggerNotification('Pengingat Dihapus', 'Pengingat berhasil dinonaktifkan.', 'info');
  };

  // Calendar Events Mutations
  const addAcademicEvent = (eventInput: Omit<AcademicEvent, 'id'>) => {
    const id = `event-${Date.now()}`;
    const newEvent: AcademicEvent = { ...eventInput, id };
    setAcademicEvents((prev) => [newEvent, ...prev]);
    triggerNotification('Agenda Akademik Ditambahkan', `"${eventInput.title}" telah dijadwalkan pada ${eventInput.date}.`, 'success');
  };

  const deleteAcademicEvent = (id: string) => {
    setAcademicEvents((prev) => prev.filter((e) => e.id !== id));
    triggerNotification('Agenda Dihapus', 'Agenda berhasil dihapus dari kalender akademik.', 'warning');
  };

  // Settings Toggles
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    triggerNotification('Tema Diubah', `Aplikasi beralih ke Mode ${theme === 'light' ? 'Gelap' : 'Terang'}!`, 'info');
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'id' ? 'en' : 'id'));
    triggerNotification('Bahasa Diubah', `Language changed to ${language === 'id' ? 'English' : 'Bahasa Indonesia'}`, 'info');
  };

  const toggleLocalNotifications = () => {
    setIsLocalNotificationsEnabled((prev) => !prev);
    setTimeout(() => {
      if (!isLocalNotificationsEnabled) {
        // Since it's toggled, it's now true
        alert('Notifikasi lokal diaktifkan! Anda akan menerima alarm pelajaran dan tugas.');
      }
    }, 50);
  };

  // Firebase Backup and Sync simulation
  const triggerFirebaseSync = () => {
    triggerNotification('Singkronisasi Cloud...', 'Menghubungkan ke Cloud Firestore dan melakukan pencadangan data.', 'info');
    setTimeout(() => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const timeStr = now.toLocaleDateString('id-ID', options);
      localStorage.setItem('sma_firebase_backup', timeStr);
      setFirebaseBackupTime(timeStr);
      triggerNotification('Sinkronisasi Sukses!', 'Semua data diunggah ke Firestore (Collection: users, schedule, tasks, subjects).', 'success');
    }, 1500);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        navigateTo,
        screenHistory,
        goBack,
        userProfile,
        subjects,
        schedule,
        tasks,
        reminders,
        academicEvents,
        searchQuery,
        theme,
        language,
        isLocalNotificationsEnabled,
        updateUserProfile,
        addTask,
        updateTask,
        toggleTaskCompleted,
        deleteTask,
        addReminder,
        deleteReminder,
        addAcademicEvent,
        deleteAcademicEvent,
        setSearchQuery,
        toggleTheme,
        toggleLanguage,
        toggleLocalNotifications,
        notifications,
        triggerNotification,
        dismissNotification,
        firebaseConnected,
        setFirebaseConnected,
        firebaseBackupTime,
        triggerFirebaseSync,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
