# Bosque Alto — Landing (clon estructural)

Clon del landing `https://heroic-sorbet-d0e4a1.netlify.app/` construido en
**Next.js 14 (App Router)** con **arquitectura screaming**: las carpetas
gritan el dominio del negocio (`lotes`, `plusvalia`, `ubicacion`,
`facilidades-pago`, `testimonios`, `faq`, `cotizacion`, `footer`, `nav`), no
detalles técnicos.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Requiere conexión a internet la primera vez
(descarga las tipografías de Google Fonts: Fraunces + Manrope).

## Estructura (screaming architecture)

```
src/
  app/                      → rutas de Next (App Router)
    page.tsx                → ensambla todas las secciones
    layout.tsx              → fuentes, metadata, CTA flotante
    api/cotizacion/route.ts → endpoint que procesa los formularios
  features/                 → un folder por dominio/sección del negocio
    hero/
    lotes/                  → tarjetas de lotes + comparador + amenidades
    plusvalia/
    ubicacion/
    facilidades-pago/       → pasos de compra + simulador de crédito
    testimonios/
    faq/
    cotizacion/             → LeadForm reutilizable + hook + sección final
    footer/
    nav/                    → header + CTA flotante mobile
  shared/
    constants/
      theme.constants.ts    → UNICO archivo de estilos (colores, fuentes, radios, sombras, WhatsApp)
      content.json           → UNICO archivo de TODOS los textos del sitio
      images.constants.ts    → UNICO mapa de rutas de imágenes
    components/
      ImageWithFallback.tsx  → <img> con placeholder automático si el archivo no existe
    types/
    lib/
```

## Cómo editar la web

- **Textos**: edita `src/shared/constants/content.json`. Cada sección del
  sitio (hero, lotes, plusvalía, ubicación, FAQ, footer, etc.) tiene su
  propia clave. No hay textos "hardcodeados" en los componentes.
- **Estilos (colores, tipografías, radios, sombras)**: edita
  `src/shared/constants/theme.constants.ts`. `tailwind.config.ts` importa
  esos valores automáticamente — no necesitas tocar Tailwind.
- **Imágenes**: edita `src/shared/constants/images.constants.ts` o,
  más simple, sube el archivo real a `public/assets/img/` con el mismo
  nombre que ya está referenciado (por ejemplo `hero-bosque-alto-1600.webp`).
  Mientras el archivo no exista, se muestra automáticamente un placeholder
  genérico (`_placeholder.svg`) para no romper el layout.
- **WhatsApp / teléfono**: está centralizado en `theme.constants.ts` →
  export `contact` (`whatsappNumber`, `whatsappHref`).

## Imágenes: por qué no se descargaron

Por pedido explícito, no se descargaron los binarios del sitio original
(pueden pesar mucho). Todas las rutas en `images.constants.ts` apuntan a
`/public/assets/img/<nombre-original>`, que hoy **no existe**. Esto es
intencional: en cuanto subas el archivo real con ese nombre, se muestra
solo con volver a compilar — no hay que tocar componentes.

## Formularios (funcionales)

Hay dos formularios (Hero y sección final de cotización), ambos usan el
mismo componente `LeadForm` + hook `useLeadForm`:

1. El formulario hace `POST` a `/api/cotizacion` (route handler de Next).
2. La API valida nombre, celular y lote elegido.
3. Si es válido, arma un mensaje y devuelve un link `https://wa.me/...`
   con el mensaje pre-cargado, que el navegador abre en una pestaña nueva.

Esto es 100% funcional out-of-the-box (no requiere backend externo ni
credenciales). Para producción, lo natural es que dentro de
`src/app/api/cotizacion/route.ts` agregues el guardado en tu base de datos,
CRM (HubSpot, Kommo, etc.) o el envío de un email/Slack, antes o en vez de
construir el link de WhatsApp.

## Paleta de estilos

No fue posible leer la hoja de estilos (CSS) original del sitio de
referencia (Netlify no expone el CSS vía scraping de texto), así que la
paleta en `theme.constants.ts` es una reconstrucción fiel basada en el
contenido, el `meta theme-color` original (`#0F1A12`, verde bosque oscuro)
y el tono "condominio campestre". Ajusta los hex si tienes la guía de
marca real del cliente.

## Datos extraídos del sitio original

- Todos los textos → `src/shared/constants/content.json`
- Todas las imágenes (nombre + alt) → `src/shared/constants/images.constants.ts`
- WhatsApp de ventas: **+51 922 199 903**
- Dirección sala de ventas: Av. Arequipa 1860, piso 2, Of. 207 — Lince, Lima
- Redes sociales, RUC y textos legales → `content.json` → `footer`
