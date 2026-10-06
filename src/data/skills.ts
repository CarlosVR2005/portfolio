import type { L10n } from '@/i18n/utils';
import type { IconName } from '@/lib/icons';

export type SkillLevel = 'fluent' | 'regular' | 'learning';
export type SkillGroup = 'lang' | 'web' | 'db' | 'tools' | 'method';

export const groupLabels: Record<SkillGroup, L10n> = {
  lang: { es: 'Lenguajes', en: 'Languages' },
  web: { es: 'Web', en: 'Web' },
  db: { es: 'Bases de datos', en: 'Databases' },
  tools: { es: 'Herramientas', en: 'Tools' },
  method: { es: 'Metodologías', en: 'Methods' },
};

export interface Skill {
  name: string;
  group: SkillGroup;
  level: SkillLevel;
}

// TODO: revisar niveles. Los he asignado según tus proyectos; cámbialos aquí si no encajan.
export const skills: Skill[] = [
  { name: 'Java', group: 'lang', level: 'fluent' },
  { name: 'SQL', group: 'lang', level: 'fluent' },
  { name: 'JavaScript', group: 'lang', level: 'regular' },
  { name: 'C++', group: 'lang', level: 'fluent' },
  { name: 'C', group: 'lang', level: 'regular' },

  { name: 'HTML', group: 'web', level: 'fluent' },
  { name: 'CSS', group: 'web', level: 'fluent' },
  { name: 'Tailwind CSS', group: 'web', level: 'regular' },
  { name: 'Astro', group: 'web', level: 'regular' },
  { name: 'Node.js', group: 'web', level: 'regular' },
  { name: 'Express', group: 'web', level: 'regular' },
  { name: 'Thymeleaf', group: 'web', level: 'regular' },
  { name: 'React', group: 'web', level: 'learning' },
  { name: 'Vite', group: 'web', level: 'learning' },

  { name: 'MySQL', group: 'db', level: 'fluent' },
  { name: 'SQL Developer', group: 'db', level: 'fluent' },
  { name: 'MongoDB', group: 'db', level: 'fluent' },
  { name: 'Supabase (PostgreSQL)', group: 'db', level: 'regular' },

  { name: 'Git / GitHub', group: 'tools', level: 'fluent' },
  { name: 'Visual Studio Code', group: 'tools', level: 'fluent' },
  { name: 'Eclipse', group: 'tools', level: 'fluent' },
  { name: 'Claude Code', group: 'tools', level: 'fluent' },
  { name: 'Linux', group: 'tools', level: 'regular' },
  { name: 'IBM RSAD', group: 'tools', level: 'regular' },
  { name: 'Vercel', group: 'tools', level: 'fluent' },
  { name: 'Stripe', group: 'tools', level: 'regular' },

  { name: 'Scrum', group: 'method', level: 'fluent' },
];

export interface SoftSkill {
  icon: IconName;
  title: L10n;
  proof: L10n;
}

export const softSkills: SoftSkill[] = [
  {
    icon: 'flame',
    title: { es: 'Disciplina y constancia', en: 'Discipline and consistency' },
    proof: {
      es: 'Años entrenando para competir en Campeonatos de España de natación.',
      en: 'Years of training to compete at the Spanish National Swimming Championships.',
    },
  },
  {
    icon: 'users',
    title: { es: 'Trabajo en equipo y coordinación', en: 'Teamwork and coordination' },
    proof: {
      es: 'Scrum Master de un equipo de 10 personas en SprintPilot.',
      en: 'Scrum Master of a 10-person team on SprintPilot.',
    },
  },
  {
    icon: 'rocket',
    title: { es: 'Iniciativa y liderazgo', en: 'Initiative and leadership' },
    proof: {
      es: 'Fundé y llevo mi propia marca, Origen LZT, mientras estudio.',
      en: 'I founded and run my own brand, Origen LZT, while studying.',
    },
  },
  {
    icon: 'calendar',
    title: { es: 'Organización y planificación', en: 'Organisation and planning' },
    proof: {
      es: 'Carrera, empresa propia y clientes freelance a la vez.',
      en: 'Degree, my own business and freelance clients at the same time.',
    },
  },
  {
    icon: 'megaphone',
    title: { es: 'Negociación y relaciones públicas', en: 'Negotiation and public relations' },
    proof: {
      es: 'Organizando eventos juveniles en Lanzarote y tratando con proveedores.',
      en: 'Organising youth events in Lanzarote and dealing with suppliers.',
    },
  },
];
