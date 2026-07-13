/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ColorScheme {
  bg: string;
  text: string;
  border: string;
  badgeBg: string;
  gradient: string;
  accent: string;
}

export const getSubjectColors = (colorName: string): ColorScheme => {
  const normalized = colorName.toLowerCase();

  switch (normalized) {
    case 'blue':
    case 'matematika':
      return {
        bg: 'bg-blue-50/80 dark:bg-blue-950/30',
        text: 'text-blue-700 dark:text-blue-300',
        border: 'border-blue-100 dark:border-blue-900/60',
        badgeBg: 'bg-blue-100/70 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
        gradient: 'from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-800',
        accent: 'bg-blue-500',
      };
    case 'emerald':
    case 'green':
    case 'biologi':
      return {
        bg: 'bg-emerald-50/80 dark:bg-emerald-950/30',
        text: 'text-emerald-700 dark:text-emerald-300',
        border: 'border-emerald-100 dark:border-emerald-900/60',
        badgeBg: 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200',
        gradient: 'from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-800',
        accent: 'bg-emerald-500',
      };
    case 'purple':
    case 'fisika':
      return {
        bg: 'bg-purple-50/80 dark:bg-purple-950/30',
        text: 'text-purple-700 dark:text-purple-300',
        border: 'border-purple-100 dark:border-purple-900/60',
        badgeBg: 'bg-purple-100/70 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200',
        gradient: 'from-purple-500 to-fuchsia-600 dark:from-purple-600 dark:to-fuchsia-800',
        accent: 'bg-purple-500',
      };
    case 'pink':
    case 'kimia':
      return {
        bg: 'bg-pink-50/80 dark:bg-pink-950/30',
        text: 'text-pink-700 dark:text-pink-300',
        border: 'border-pink-100 dark:border-pink-900/60',
        badgeBg: 'bg-pink-100/70 text-pink-800 dark:bg-pink-900/50 dark:text-pink-200',
        gradient: 'from-pink-500 to-rose-600 dark:from-pink-600 dark:to-rose-800',
        accent: 'bg-pink-500',
      };
    case 'orange':
    case 'bahasa inggris':
      return {
        bg: 'bg-orange-50/80 dark:bg-orange-950/30',
        text: 'text-orange-700 dark:text-orange-300',
        border: 'border-orange-100 dark:border-orange-900/60',
        badgeBg: 'bg-orange-100/70 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200',
        gradient: 'from-orange-500 to-amber-600 dark:from-orange-600 dark:to-amber-800',
        accent: 'bg-orange-500',
      };
    case 'indigo':
    case 'informatika':
      return {
        bg: 'bg-indigo-50/80 dark:bg-indigo-950/30',
        text: 'text-indigo-700 dark:text-indigo-300',
        border: 'border-indigo-100 dark:border-indigo-900/60',
        badgeBg: 'bg-indigo-100/70 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200',
        gradient: 'from-indigo-600 to-violet-600 dark:from-indigo-700 dark:to-violet-800',
        accent: 'bg-indigo-500',
      };
    case 'amber':
    case 'yellow':
    case 'bahasa indonesia':
      return {
        bg: 'bg-amber-50/80 dark:bg-amber-950/30',
        text: 'text-amber-700 dark:text-amber-300',
        border: 'border-amber-100 dark:border-amber-900/60',
        badgeBg: 'bg-amber-100/70 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200',
        gradient: 'from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-700',
        accent: 'bg-amber-500',
      };
    case 'teal':
    case 'sejarah':
      return {
        bg: 'bg-teal-50/80 dark:bg-teal-950/30',
        text: 'text-teal-700 dark:text-teal-300',
        border: 'border-teal-100 dark:border-teal-900/60',
        badgeBg: 'bg-teal-100/70 text-teal-800 dark:bg-teal-900/50 dark:text-teal-200',
        gradient: 'from-teal-500 to-emerald-600 dark:from-teal-600 dark:to-emerald-800',
        accent: 'bg-teal-500',
      };
    case 'violet':
    case 'pancasila':
    case 'pkn':
      return {
        bg: 'bg-violet-50/80 dark:bg-violet-950/30',
        text: 'text-violet-700 dark:text-violet-300',
        border: 'border-violet-100 dark:border-violet-900/60',
        badgeBg: 'bg-violet-100/70 text-violet-800 dark:bg-violet-900/50 dark:text-violet-200',
        gradient: 'from-violet-500 to-purple-600 dark:from-violet-600 dark:to-purple-800',
        accent: 'bg-violet-500',
      };
    default:
      return {
        bg: 'bg-slate-50/80 dark:bg-slate-900/30',
        text: 'text-slate-700 dark:text-slate-300',
        border: 'border-slate-100 dark:border-slate-800/60',
        badgeBg: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200',
        gradient: 'from-slate-500 to-slate-700 dark:from-slate-600 dark:to-slate-800',
        accent: 'bg-slate-500',
      };
  }
};
