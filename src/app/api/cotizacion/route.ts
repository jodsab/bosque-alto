import { NextRequest, NextResponse } from "next/server";
import { contact } from "@/shared/constants/theme.constants";

interface LeadPayload {
  name?: string;
  phone?: string;
  lot?: string;
  message?: string;
  source?: string;
}

function buildWhatsappMessage(data: LeadPayload) {
  const lines = [
    "Hola, quiero información sobre un lote en La Finca de Don Pedro (Huacho).",
    `Nombre: ${data.name}`,
    `Celular: ${data.phone}`,
    `Lote de interés: ${data.lot}`,
  ];
  if (data.message) lines.push(`Mensaje: ${data.message}`);
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  let data: LeadPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Ingresa tu nombre completo.";
  }
  const phoneDigits = (data.phone ?? "").replace(/\D/g, "");
  if (phoneDigits.length < 9) {
    errors.phone = "Ingresa un celular válido (9 dígitos).";
  }
  if (!data.lot) {
    errors.lot = "Elige un metraje.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // Aquí es donde, en producción, se guardaría el lead en una base de
  // datos / CRM / se enviaría un email. Por ahora se arma el enlace de
  // WhatsApp para completar el contacto inmediatamente.
  const text = encodeURIComponent(buildWhatsappMessage(data));
  const whatsappUrl = `${contact.whatsappHref}?text=${text}`;

  return NextResponse.json({ ok: true, whatsappUrl });
}
