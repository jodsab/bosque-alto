import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contact } from "@/shared/constants/theme.constants";
import { ComplaintFormState, validateComplaintForm } from "@/features/legal/complaintValidation";

type ComplaintPayload = Partial<ComplaintFormState>;

const GOOD_TYPE_LABELS: Record<string, string> = {
  lote: "Lote de terreno",
  atencion: "Atención comercial",
  otro: "Otro",
};

const CLAIM_TYPE_LABELS: Record<string, string> = {
  reclamo: "Reclamo — disconformidad con el producto o servicio",
  queja: "Queja — disconformidad no relacionada al producto o servicio",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildSignatureHtml() {
  const siteUrl = process.env.SITE_URL?.replace(/\/$/, "");
  const logoImg = siteUrl
    ? `<img src="${siteUrl}/assets/img/logo.webp" alt="Proyecta Innova" width="110" style="display:block;margin-bottom:10px;" />`
    : "";

  return `
    <div style="margin-top:28px;padding-top:16px;border-top:1px solid #DEDACB;">
      ${logoImg}
      <p style="margin:0;font-size:12px;color:#5B6A5D;">Proyecta Innova Trasciende S.A.C. — RUC 20609903881</p>
      <p style="margin:2px 0 0;font-size:12px;color:#5B6A5D;">Av. Arequipa 1860, piso 19, Of. 1905 — Lince, Lima</p>
    </div>
  `;
}

/** Envoltorio visual común: tarjeta blanca con header oscuro, sobre fondo crema, con firma abajo. */
function buildEmailShell(title: string, innerHtml: string) {
  return `
    <div style="background:#F6F3EA;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(15,26,18,0.08);">
        <div style="background:#0F1A12;padding:20px 28px;">
          <span style="color:#F3F0E6;font-size:18px;font-weight:700;font-family:Arial,Helvetica,sans-serif;">
            ${escapeHtml(title)}
          </span>
        </div>
        <div style="padding:28px;color:#16221A;font-size:14px;line-height:1.6;">
          ${innerHtml}
          ${buildSignatureHtml()}
        </div>
      </div>
    </div>
  `;
}

function buildCompanyEmailHtml(data: ComplaintPayload) {
  const rows: [string, string][] = [
    ["Nombres", data.firstName ?? ""],
    ["Apellidos", data.lastName ?? ""],
    ["DNI / Carné de extranjería", data.documentId ?? ""],
    ["Celular", data.phone ?? ""],
    ["Correo", data.email ?? ""],
    ["Domicilio", data.address ?? ""],
    ["Padre/madre o apoderado", data.guardian || "—"],
    ["Tipo de bien contratado", GOOD_TYPE_LABELS[data.goodType ?? ""] ?? data.goodType ?? ""],
    ["Monto reclamado", data.claimedAmount || "—"],
    ["Descripción del bien/servicio", data.goodDescription ?? ""],
    ["Tipo de reclamación", CLAIM_TYPE_LABELS[data.claimType ?? ""] ?? data.claimType ?? ""],
    ["Detalle", data.detail ?? ""],
    ["Pedido del consumidor", data.request ?? ""],
  ];

  const rowsHtml = rows
    .map(
      ([label, value], i) => `
        <tr style="background:${i % 2 === 0 ? "#F6F3EA" : "#FFFFFF"};">
          <td style="padding:8px 12px;font-weight:700;vertical-align:top;white-space:nowrap;color:#0F1A12;">${escapeHtml(label)}</td>
          <td style="padding:8px 12px;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td>
        </tr>`
    )
    .join("");

  const inner = `
    <p style="margin:0 0 16px;">Se registró un nuevo reclamo en el Libro de Reclamaciones del sitio.</p>
    <table style="width:100%;border-collapse:collapse;border-radius:8px;overflow:hidden;">${rowsHtml}</table>
  `;

  return buildEmailShell("Nuevo reclamo — Libro de Reclamaciones", inner);
}

function buildConsumerEmailHtml(data: ComplaintPayload) {
  const inner = `
    <p style="margin:0 0 12px;">Hola ${escapeHtml(data.firstName ?? "")}, confirmamos que registramos tu reclamo en el Libro de Reclamaciones de Proyecta Innova Trasciende S.A.C.</p>
    <p style="margin:0 0 16px;">Te daremos respuesta en un plazo no mayor a quince (15) días hábiles, a este mismo correo.</p>
    <p style="margin:0 0 6px;font-weight:700;color:#0F1A12;">Copia de lo que enviaste:</p>
    <p style="white-space:pre-line;background:#F6F3EA;padding:12px;border-radius:8px;margin:0;">${escapeHtml(data.detail ?? "")}</p>
  `;

  return buildEmailShell("Recibimos tu reclamo", inner);
}

export async function POST(request: NextRequest) {
  let data: ComplaintPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const errors = validateComplaintForm(data);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY no está configurada");
    return NextResponse.json(
      {
        ok: false,
        errors: {
          general: "El envío por correo no está configurado todavía. Escríbenos por WhatsApp mientras tanto.",
        },
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  try {
    await resend.emails.send({
      from: `Libro de Reclamaciones <${fromEmail}>`,
      to: [contact.complaintsRecipientEmail],
      subject: `Nuevo reclamo — ${data.firstName} ${data.lastName}`,
      html: buildCompanyEmailHtml(data),
    });

    await resend.emails.send({
      from: `Proyecta Innova <${fromEmail}>`,
      to: [data.email as string],
      replyTo: contact.complaintsRecipientEmail,
      subject: "Recibimos tu reclamo — Proyecta Innova",
      html: buildConsumerEmailHtml(data),
    });
  } catch (err) {
    console.error("Error enviando el reclamo por email", err);
    return NextResponse.json(
      {
        ok: false,
        errors: { general: "No pudimos enviar tu reclamo por correo. Intenta de nuevo o escríbenos por WhatsApp." },
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
