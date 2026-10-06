import type { L10n } from '@/i18n/utils';
import type { IconName } from '@/lib/icons';

export type TimelineCategory = 'academic' | 'sport' | 'business' | 'project' | 'goal';

export interface TimelineItem {
  /** Texto de la fecha. Si no hay fecha, se muestra `place`. */
  when?: L10n;
  place?: L10n;
  title: L10n;
  text: L10n;
  category: TimelineCategory;
  icon: IconName;
}

/** Orden cronológico. Añadir un hito = añadir un objeto. */
export const timeline: TimelineItem[] = [
  {
    when: { es: '11 – 18 años', en: 'Age 11 – 18' },
    title: { es: 'Natación de competición', en: 'Competitive swimming' },
    text: {
      es: 'Nadaba desde los 7 y entré en el equipo de competición a los 11. Llegué a Campeonatos de España (≈ 2016 – 2023).',
      en: 'Swimming since age 7, on the competition team from 11. Reached the Spanish National Championships (≈ 2016 – 2023).',
    },
    category: 'sport',
    icon: 'waves',
  },
  {
    // TODO: añadir fecha del curso de Google
    place: { es: 'Google', en: 'Google' },
    title: { es: 'Fundamentos de Marketing Digital', en: 'Fundamentals of Digital Marketing' },
    text: { es: 'Curso acreditado por Google, 40 horas.', en: 'Google-accredited course, 40 hours.' },
    category: 'academic',
    icon: 'megaphone',
  },
  {
    when: { es: '2021 – 2023', en: '2021 – 2023' },
    title: { es: 'Bachillerato de Ciencias y Tecnología', en: 'High school: Science and Technology' },
    text: { es: 'IES Costa Teguise, Lanzarote.', en: 'IES Costa Teguise, Lanzarote.' },
    category: 'academic',
    icon: 'book',
  },
  {
    // TODO: confirmar fecha de fundación de Origen LZT
    when: { es: '2023', en: '2023' },
    title: { es: 'Fundo Origen LZT', en: 'I found Origen LZT' },
    text: {
      es: 'Mi marca de ropa urbana canaria. Más tarde programo su tienda online.',
      en: 'My Canary Islands streetwear brand. Later I code its online shop.',
    },
    category: 'business',
    icon: 'shirt',
  },
  {
    when: { es: '2024', en: '2024' },
    title: { es: 'Organizo eventos juveniles', en: 'Organising youth events' },
    text: {
      es: 'Eventos culturales y de ocio para gente joven en Lanzarote: equipos, instituciones y negociación.',
      en: 'Cultural and leisure events for young people in Lanzarote: teams, institutions and negotiation.',
    },
    category: 'business',
    icon: 'users',
  },
  {
    when: { es: 'Sept 2023', en: 'Sept 2023' },
    title: { es: 'Empiezo Ingeniería de Software', en: 'I start Software Engineering' },
    text: { es: 'Universidad Complutense de Madrid. Me mudo de la isla a Madrid.', en: 'Universidad Complutense de Madrid. I move from the island to Madrid.' },
    category: 'academic',
    icon: 'graduation',
  },
  {
    // TODO: añadir cursos en los que obtuve estas notas
    place: { es: 'UCM', en: 'UCM' },
    title: { es: 'Matrícula de Honor y Sobresaliente', en: 'Top marks' },
    text: {
      es: 'Matrícula de Honor en Estructura de Computadores y Sobresaliente en Sistemas Operativos (Linux).',
      en: 'Honours (top grade) in Computer Structure and Outstanding in Operating Systems (Linux).',
    },
    category: 'academic',
    icon: 'award',
  },
  {
    // TODO: confirmar curso en el que fui Scrum Master de SprintPilot
    when: { es: '2026', en: '2026' },
    title: { es: 'Scrum Master de SprintPilot', en: 'Scrum Master of SprintPilot' },
    text: { es: 'Coordino a un equipo de 10 personas en un proyecto de la carrera.', en: 'I coordinate a 10-person team on a university project.' },
    category: 'project',
    icon: 'users',
  },
  {
    when: { es: '2026', en: '2026' },
    title: { es: 'Primeros clientes reales', en: 'First real clients' },
    text: {
      es: 'Psicofactur, Músculo Lab y webs para negocios de Lanzarote.',
      en: 'Psicofactur, Músculo Lab and websites for businesses in Lanzarote.',
    },
    category: 'project',
    icon: 'briefcase',
  },
  {
    when: { es: 'Feb 2027', en: 'Feb 2027' },
    title: { es: 'Prácticas en empresa', en: 'Internship' },
    text: { es: '¿En tu equipo? Estoy disponible desde febrero.', en: 'In your team? I am available from February.' },
    category: 'goal',
    icon: 'rocket',
  },
  {
    when: { es: 'Jun 2027', en: 'Jun 2027' },
    title: { es: 'Graduación', en: 'Graduation' },
    text: { es: 'Fin del Grado en Ingeniería de Software.', en: 'Bachelor’s degree in Software Engineering completed.' },
    category: 'goal',
    icon: 'flag',
  },
];
