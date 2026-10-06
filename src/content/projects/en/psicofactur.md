---
slug: psicofactur
lang: en
order: 3
title: Psicofactur
hook: An app that lets a psychology practice manage patients, appointments and invoices in one place.
category: freelance
featured: false
visible: true
status: wip
privacy: public
year: "2026"
role: Full-stack developer (solo)
stack: [React, Vite, Tailwind CSS, Supabase, PostgreSQL, Edge Functions, PWA]
highlights:
  - Installable app (PWA) that works the same on desktop and mobile, designed for several practices.
  - Patients, a calendar synced with Google Calendar and invoicing compliant with Spain's Veri*Factu rules.
  - Automatic appointment reminders that patients can confirm.
  - Supabase (PostgreSQL) database with server logic in Edge Functions.
problem: >-
  A busy psychology practice was handling appointments, payments and invoices across several tools. On top of that,
  Spain's new Veri*Factu regulation requires invoices to be issued in a specific way.
solution:
  - I designed a single installable web app for desktop and mobile that is easy to use every day.
  - Patient management, a calendar connected to Google Calendar and per-appointment invoicing with payment status.
  - Invoices are issued through a certified Veri*Factu provider instead of reinventing that part.
  - Automatic reminders before each appointment, letting the patient confirm or cancel.
result: >-
  The project is still in progress. It is the most complete thing I have built on my own: it makes me think about
  privacy from day one, about real regulations and about a non-technical person who will use it every day.
links:
  repo: https://github.com/CarlosVR2005/psicofactur
mockup: psicofactur
accent: ocean
---

- **Front end:** React + Vite + Tailwind CSS, packaged as a PWA.
- **Back end:** Supabase (PostgreSQL) and Edge Functions for automated tasks.
- **Integrations:** Google Calendar, a Veri*Factu invoicing provider and a messaging service for reminders.
- **Code:** public on GitHub. Every image on this page uses made-up data.
