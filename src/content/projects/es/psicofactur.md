---
slug: psicofactur
lang: es
order: 3
title: Psicofactur
hook: Una app para que una consulta de psicología gestione pacientes, citas y facturas en un solo sitio.
category: freelance
featured: false
visible: true
status: wip
privacy: public
year: "2026"
role: Desarrollador full-stack (en solitario)
stack: [React, Vite, Tailwind CSS, Supabase, PostgreSQL, Edge Functions, PWA]
highlights:
  - App instalable (PWA) que funciona igual en ordenador y en móvil, pensada para varias consultas.
  - Pacientes, calendario sincronizado con Google Calendar y facturación conforme a Veri*Factu.
  - Recordatorios de cita automáticos con confirmación del paciente.
  - Base de datos en Supabase (PostgreSQL) y lógica de servidor en Edge Functions.
problem: >-
  Una consulta de psicología con muchos pacientes llevaba citas, cobros y facturas repartidos entre varias
  herramientas. Además, la nueva normativa Veri*Factu obliga a emitir las facturas de una forma concreta.
solution:
  - Diseñé una sola aplicación web instalable para escritorio y móvil, sencilla de usar en el día a día.
  - Gestión de pacientes, calendario conectado con Google Calendar y facturación por cita con estado de pago.
  - Facturas emitidas a través de un proveedor homologado de Veri*Factu, en lugar de reinventar esa parte.
  - Recordatorios automáticos antes de cada cita, con opción de que el paciente confirme o cancele.
result: >-
  El proyecto sigue en desarrollo. Es el más completo que he hecho en solitario: me obliga a pensar en privacidad
  desde el primer día, en normativa real y en una persona que lo usará cada día sin ser técnica.
links:
  repo: https://github.com/CarlosVR2005/psicofactur
mockup: psicofactur
accent: ocean
---

- **Front:** React + Vite + Tailwind CSS, empaquetada como PWA.
- **Backend:** Supabase (PostgreSQL) y Edge Functions para las tareas automáticas.
- **Integraciones:** Google Calendar, proveedor de facturación Veri*Factu y servicio de mensajería para recordatorios.
- **Código:** público en GitHub. Todas las imágenes de esta página usan datos inventados.
