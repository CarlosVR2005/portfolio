---
slug: origen-lzt
lang: es
order: 2
title: Origen LZT
hook: Mi propia marca de ropa urbana canaria, con una tienda online que programé yo mismo.
category: entrepreneurship
featured: true
visible: true
status: live
privacy: public
year: 2023 – hoy
role: Fundador · marca, negocio y desarrollo web
stack: [Astro, Tailwind CSS, Supabase, Stripe Checkout, Vercel]
highlights:
  - Creé la marca desde cero, con identidad y posicionamiento propios para el mercado canario.
  - Gestiono proveedores y logística a distancia, desde Madrid.
  - Programé la tienda online yo mismo, sin plantillas tipo Shopify.
  - El stock se descuenta solo con cada venta, y la web tiene reseñas y emails automáticos.
problem: >-
  Quería lanzar una marca de ropa con identidad canaria y venderla online sin depender de plataformas cerradas, todo
  mientras estudio en Madrid y la marca vive en Lanzarote.
solution:
  - Definí la marca, su estilo y su público, y me encargué de la relación con proveedores y de los envíos a distancia.
  - Desarrollé la tienda con Astro y Tailwind, con los productos y el stock guardados en Supabase.
  - Integré los pagos con Stripe Checkout y un webhook que descuenta el stock automáticamente en cada compra.
  - Añadí reseñas de clientes, aviso de stock bajo y emails transaccionales.
result: >-
  La tienda está en producción en origenlzt.com y la mantengo yo. Me ha enseñado a pensar como negocio, no solo como
  programador: proveedores, márgenes, marketing y atención al cliente también forman parte del producto.
links:
  demo: https://origenlzt.com
mockup: origen
accent: lava
---

- **Front:** Astro con Tailwind CSS, páginas rápidas y con muy poco JavaScript.
- **Datos:** catálogo y stock en Supabase (PostgreSQL), leídos en tiempo de build y en ejecución.
- **Pagos:** Stripe Checkout alojado por Stripe, con recuperación de carritos abandonados.
- **Automatización:** webhook de Stripe que actualiza el stock al confirmarse cada pago.
- **Despliegue:** Vercel.
