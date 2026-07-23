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
  isotipo: "/assets/img/logo-solo.png",
  heroBackground: "/assets/img/hero-don-pedro-1000.webp",
  lote200: "/assets/img/lotes/lote-200m2.png",
  lote250: "/assets/img/lotes/lote-250m2.png",
  lote500: "/assets/img/lotes/lote-500m2.png",
  lote1000: "/assets/img/lotes/lote-1000m2.png",
  amenidadPiscina: "/assets/img/amenidad/amenidad-piscina.png",
  amenidadJuegos: "/assets/img/amenidad/amenidad-juegos.png",
  amenidadParrillas: "/assets/img/amenidad/amenidad-parrillas.png",
  amenidadCanchas: "/assets/img/amenidad/amenidad-canchas.png",
  porticoIngreso: "/assets/img/portico-ingreso.webp",
  huertoPaltas: "/assets/img/huerto/huerto-paltas.webp",
  huertoMandarinas: "/assets/img/huerto/huerto-mandarinas.webp",
  huertoPapayas: "/assets/img/huerto/huerto-papayas.webp",
  mapaHuacho: "/assets/img/map/mapa-huacho.webp",
  mapaLince: "/assets/img/map/mapa-lince.webp",
  vistaAerea: "/assets/img/vista-aerea.webp",
  recorrido360: "/assets/img/recorrido-360.webp",
  videoRecorrido3d: "/assets/img/video-recorrido-3d.webp",
  clientesEnLaDuna: "/assets/img/clientes/principal.jpg",
  clienteF1: "/assets/img/clientes/F1.webp",
  clienteF2: "/assets/img/clientes/F2.webp",
  clienteF3: "/assets/img/clientes/F3.webp",
  clienteF4: "/assets/img/clientes/F4.webp",
  clienteF5: "/assets/img/clientes/F5.webp",
  clienteF8: "/assets/img/clientes/F8.webp",
  logoProyecta: "/assets/img/logo-proyecta.webp",
  carrousel1: "/assets/img/carrousel/foto1.webp",
  carrousel2: "/assets/img/carrousel/foto2.webp",
  carrousel3: "/assets/img/carrousel/foto3.webp",
  carrousel4: "/assets/img/carrousel/foto4.webp",
  carrousel5: "/assets/img/carrousel/foto5.webp",
  carrousel6: "/assets/img/carrousel/foto6.webp",
  carrousel7: "/assets/img/carrousel/foto7.webp",
  carrousel8: "/assets/img/carrousel/foto8.webp",
  carrousel9: "/assets/img/carrousel/foto9.webp",
  carrousel10: "/assets/img/carrousel/foto10.webp",
  carrousel11: "/assets/img/carrousel/foto11.webp",
  carrousel12: "/assets/img/carrousel/foto12.webp",
  carrousel13: "/assets/img/carrousel/foto13.webp",
  carrousel14: "/assets/img/carrousel/foto14.webp",
  carrousel15: "/assets/img/carrousel/foto15.webp",
  carrousel16: "/assets/img/carrousel/foto16.webp",
  carrousel17: "/assets/img/carrousel/foto17.webp",
  carrousel18: "/assets/img/carrousel/foto18.webp",
  carrousel19: "/assets/img/carrousel/foto19.webp",
  render1: "/assets/img/carrousel3d/render1.png",
  render2: "/assets/img/carrousel3d/render2.png",
  render3: "/assets/img/carrousel3d/render3.png",
  render4: "/assets/img/carrousel3d/render4.png",
  render5: "/assets/img/carrousel3d/render5.png",
  render6: "/assets/img/carrousel3d/render6.png",
  render7: "/assets/img/carrousel3d/render7.png",
  render8: "/assets/img/carrousel3d/render8.png",
  render9: "/assets/img/carrousel3d/render9.png",
  render10: "/assets/img/carrousel3d/render10.png",
  render11: "/assets/img/carrousel3d/render11.png",
  pedroSanchez: "/assets/img/pedro-sanchez.png",
  /** Placeholder genérico mostrado cuando una imagen de arriba aún no existe en /public */
  fallback: "/assets/img/_placeholder.svg",
} as const;

export type ImageKey = keyof typeof images;

export default images;
