/**
 * images.constants.ts
 * ------------------------------------------------------------------
 * Mapa único de imágenes del sitio.
 *
 * Las imágenes reales del sitio de referencia NO se descargaron a
 * propósito (para no inflar el proyecto con binarios pesados). Cada
 * ruta de abajo apunta a /public/assets/img/<mismo-nombre-original>,
 * que hoy NO existe en el repo: sirve como "contrato" de nombre de
 * archivo. Para actualizar una imagen:
 *
 *   1) Coloca el archivo real en /public/assets/img/ con el mismo
 *      nombre (o cambia la ruta aquí), y listo — no hay que tocar
 *      ningún componente.
 *
 * Todos los <img> del proyecto usan <ImageWithFallback> (ver
 * src/shared/components/ImageWithFallback.tsx), que muestra un
 * placeholder genérico si el archivo todavía no existe, así nunca
 * rompe el layout mientras el cliente sube sus fotos reales.
 */

export const images = {
  isotipo: "/assets/img/isotipo-68.webp",
  heroBackground: "/assets/img/hero-bosque-alto-1600.webp",
  lote180: "/assets/img/lote-180m2.webp",
  lote200: "/assets/img/lote-200m2.webp",
  lote250: "/assets/img/lote-250m2.webp",
  lote1000: "/assets/img/lote-1000m2.webp",
  lote100: "/assets/img/lote-100m2.webp",
  amenidadPiscina: "/assets/img/amenidad-piscina.webp",
  amenidadJuegos: "/assets/img/amenidad-juegos.webp",
  amenidadParrillas: "/assets/img/amenidad-parrillas.webp",
  porticoIngreso: "/assets/img/portico-ingreso.webp",
  huertoFresas: "/assets/img/huerto-fresas.webp",
  huertoMandarinas: "/assets/img/huerto-mandarinas.webp",
  huertoPapayas: "/assets/img/huerto-papayas.webp",
  mapaHuacho: "/assets/img/mapa-huacho.webp",
  mapaLince: "/assets/img/mapa-lince.webp",
  vistaAerea: "/assets/img/vista-aerea.webp",
  recorrido360: "/assets/img/recorrido-360.webp",
  videoRecorrido3d: "/assets/img/video-recorrido-3d.webp",
  clientesEnLaDuna: "/assets/img/clientes-en-la-duna.webp",
  entrega1: "/assets/img/entrega-1.webp",
  entrega2: "/assets/img/entrega-2.webp",
  entrega3: "/assets/img/entrega-3.webp",
  entrega4: "/assets/img/entrega-4.webp",
  clientesEnElCampo: "/assets/img/clientes-en-el-campo.webp",
  logoProyecta: "/assets/img/logo-proyecta.webp",
  /** Placeholder genérico mostrado cuando una imagen de arriba aún no existe en /public */
  fallback: "/assets/img/_placeholder.svg",
} as const;

export type ImageKey = keyof typeof images;

export default images;
