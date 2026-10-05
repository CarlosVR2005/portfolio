---
slug: origen-lzt
lang: en
order: 2
title: Origen LZT
hook: My own Canary Islands streetwear brand, with an online shop I coded myself.
category: entrepreneurship
featured: true
visible: true
status: live
privacy: public
year: 2023 – now
role: Founder · brand, business and web development
stack: [Astro, Tailwind CSS, Supabase, Stripe Checkout, Vercel]
highlights:
  - Built the brand from scratch, with its own identity and positioning for the Canary Islands market.
  - I manage suppliers and logistics remotely, from Madrid.
  - Coded the online shop myself, no Shopify-style templates.
  - Stock updates itself after every sale, plus customer reviews and automatic emails.
problem: >-
  I wanted to launch a clothing brand with a Canary Islands identity and sell it online without relying on closed
  platforms, all while studying in Madrid with the brand based in Lanzarote.
solution:
  - I defined the brand, its style and audience, and took care of suppliers and remote shipping.
  - I built the shop with Astro and Tailwind, with products and stock stored in Supabase.
  - I integrated payments with Stripe Checkout and a webhook that updates stock automatically on every purchase.
  - I added customer reviews, low-stock badges and transactional emails.
result: >-
  The shop is live at origenlzt.com and I maintain it myself. It taught me to think like a business owner, not only
  like a developer: suppliers, margins, marketing and customer service are part of the product too.
links:
  demo: https://origenlzt.com
mockup: origen
accent: lava
---

- **Front end:** Astro with Tailwind CSS, fast pages with very little JavaScript.
- **Data:** catalogue and stock in Supabase (PostgreSQL), read at build time and at runtime.
- **Payments:** Stripe-hosted Checkout, with abandoned cart recovery.
- **Automation:** Stripe webhook that updates stock when each payment is confirmed.
- **Hosting:** Vercel.
