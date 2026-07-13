/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Calculator,
  Dna,
  Atom,
  FlaskConical,
  Languages,
  Cpu,
  BookOpen,
  Compass,
  Shield,
  Book,
  GraduationCap,
} from 'lucide-react';

interface SubjectIconProps {
  name: string;
  size?: number;
  className?: string;
}

export const SubjectIcon: React.FC<SubjectIconProps> = ({ name, size = 20, className = '' }) => {
  const norm = name.toLowerCase();
  switch (norm) {
    case 'calculator':
      return <Calculator size={size} className={className} />;
    case 'dna':
      return <Dna size={size} className={className} />;
    case 'atom':
      return <Atom size={size} className={className} />;
    case 'flaskconical':
    case 'flask':
      return <FlaskConical size={size} className={className} />;
    case 'languages':
    case 'language':
      return <Languages size={size} className={className} />;
    case 'cpu':
    case 'computer':
      return <Cpu size={size} className={className} />;
    case 'bookopen':
      return <BookOpen size={size} className={className} />;
    case 'compass':
    case 'history':
      return <Compass size={size} className={className} />;
    case 'shieldalert':
    case 'shield':
    return <Shield size={size} className={className} />;
    case 'graduationcap':
      return <GraduationCap size={size} className={className} />;
    default:
      return <Book size={size} className={className} />;
  }
};
