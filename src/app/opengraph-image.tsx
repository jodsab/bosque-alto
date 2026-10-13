import { readFileSync } from "fs";
import { join } from "path";
import { ImageResponse } from "next/og";
import content from "@/shared/constants/content.json";

export const runtime = "nodejs";
export const alt = content.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const heroPath = join(process.cwd(), "public/assets/img/hero-don-pedro-1000.webp");
  const heroBase64 = readFileSync(heroPath).toString("base64");
  const heroDataUrl = `data:image/webp;base64,${heroBase64}`;

  // next/og necesita una fuente explícita: su fuente por defecto se resuelve
  // por una ruta interna que falla al exportar en Windows (funciona en dev,
  // rompe el build). Con esto evitamos depender de esa ruta.
  // comentario para generar un nuevo commit y deploy
  const fontData = await fetch(
    "https://raw.githubusercontent.com/vercel/og-examples/main/public/fonts/Inter-Bold.ttf"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage: `url(${heroDataUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 64px",
            backgroundImage:
              "linear-gradient(to top, #0F1A12ee 10%, #0F1A12b3 55%, #2F6B3C40 100%)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: 999,
                backgroundColor: "#FF8000",
                color: "#0F1A12",
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              P
            </div>
            <div style={{ display: "flex", color: "#F3F0E6", fontSize: 22, fontWeight: 700 }}>
              {content.brand.name}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
            <div
              style={{
                display: "flex",
                color: "#FF8000",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Finca Don Pedro · Huacho
            </div>
            <div
              style={{
                display: "flex",
                color: "#F3F0E6",
                fontSize: 68,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: -1,
                marginBottom: 24,
              }}
            >
              Tu lote de campo en Huacho
            </div>
            <div style={{ display: "flex", color: "#009849", fontSize: 40, fontWeight: 800 }}>
              Desde S/ 3,000 al contado
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}