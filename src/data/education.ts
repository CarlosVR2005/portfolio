import type { L10n } from '@/i18n/utils';

export interface Degree {
  title: L10n;
  school: L10n;
  dates: L10n;
  note?: L10n;
  current?: boolean;
}

export const degrees: Degree[] = [
  {
    title: { es: 'Grado en Ingeniería de Software', en: 'BSc Software Engineering' },
    school: { es: 'Universidad Complutense de Madrid (UCM)', en: 'Universidad Complutense de Madrid (UCM)' },
    dates: { es: 'Sept 2023 – Jun 2027', en: 'Sept 2023 – Jun 2027' },
    note: {
      es: 'Nota media actual: 7,1. Enfoque en proyectos colaborativos y arquitectura de bases de datos.',
      en: 'Current GPA: 7.1/10. Focus on collaborative projects and database architecture.',
    },
    current: true,
  },
  {
    title: { es: 'Bachillerato de Ciencias y Tecnología', en: 'High school diploma: Science and Technology' },
    school: { es: 'IES Costa Teguise (Lanzarote)', en: 'IES Costa Teguise (Lanzarote)' },
    dates: { es: '2021 – 2023', en: '2021 – 2023' },
  },
];

export const gradeHighlights: { subject: L10n; grade: L10n }[] = [
  {
    subject: { es: 'Estructura de Computadores', en: 'Computer Structure' },
    grade: { es: 'Matrícula de Honor', en: 'Honours (top grade)' },
  },
  {
    subject: { es: 'Sistemas Operativos (Linux)', en: 'Operating Systems (Linux)' },
    grade: { es: 'Sobresaliente', en: 'Outstanding' },
  },
];

export const spokenLanguages: { name: L10n; level: L10n }[] = [
  { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
  {
    name: { es: 'Inglés', en: 'English' },
    level: { es: 'B2 · Escuela Oficial de Idiomas', en: 'B2 · Official School of Languages (EOI)' },
  },
];

export const certificates: { name: L10n; issuer: L10n }[] = [
  {
    name: { es: 'Fundamentos de Marketing Digital', en: 'Fundamentals of Digital Marketing' },
    issuer: { es: 'Google · 40 horas', en: 'Google · 40 hours' },
  },
];
