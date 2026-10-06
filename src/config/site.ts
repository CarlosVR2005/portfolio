/**
 * Único sitio donde cambiar datos de contacto y enlaces.
 * Todo el portfolio lee de aquí.
 */
export const site = {
  name: 'Carlos Vizcaino Rigol',
  shortName: 'Carlos Vizcaino',
  initials: 'CV',
  email: 'carlosvirigol@gmail.com',
  github: 'https://github.com/CarlosVR2005',
  githubUser: 'CarlosVR2005',
  linkedin: 'https://www.linkedin.com/in/carlos-vizcaino-rigol-27449a20b/',
  location: { es: 'Madrid (Pozuelo de Alarcón)', en: 'Madrid (Pozuelo de Alarcón)' },
  origin: { es: 'Lanzarote', en: 'Lanzarote' },
  /** CV por idioma. TODO: sustituir los PDF placeholder por la versión final (sin teléfono ni dirección). */
  cv: {
    es: '/cv/Carlos-Vizcaino-CV.pdf',
    en: '/cv/Carlos-Vizcaino-CV-EN.pdf',
  },
  availability: {
    internshipFrom: '2027-02',
    graduation: '2027-06',
  },
  repo: 'https://github.com/CarlosVR2005/portfolio',
} as const;

export type Site = typeof site;
