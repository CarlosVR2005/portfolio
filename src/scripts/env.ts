/** Preferencias del dispositivo, compartidas por todos los scripts. */
export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = () => matchMedia('(hover: hover) and (pointer: fine)').matches;

export type Cleanup = () => void;

/** Altura de la barra fija (coincide con scroll-padding-top en global.css). */
export const NAV_OFFSET = 88;
