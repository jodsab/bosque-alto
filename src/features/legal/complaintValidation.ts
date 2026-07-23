export interface ComplaintFormState {
  firstName: string;
  lastName: string;
  documentId: string;
  phone: string;
  email: string;
  address: string;
  guardian: string;
  goodType: string;
  claimedAmount: string;
  goodDescription: string;
  claimType: string;
  detail: string;
  request: string;
}

/**
 * Reglas de validación del Libro de Reclamaciones, compartidas entre el
 * formulario (cliente) y la API route (servidor) para que nunca se
 * desincronicen entre sí.
 */
export function validateComplaintForm(data: Partial<ComplaintFormState>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.firstName?.trim()) errors.firstName = "Ingresa tus nombres.";
  if (!data.lastName?.trim()) errors.lastName = "Ingresa tus apellidos.";
  if (!data.documentId?.trim()) errors.documentId = "Ingresa tu DNI o carné de extranjería.";

  const phoneDigits = (data.phone ?? "").replace(/\D/g, "");
  if (phoneDigits.length < 9) errors.phone = "Ingresa un celular válido (9 dígitos).";

  if (!data.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Ingresa un correo válido.";
  }

  if (!data.address?.trim()) errors.address = "Ingresa tu domicilio.";
  if (!data.goodType) errors.goodType = "Elige el tipo de bien contratado.";
  if (!data.goodDescription?.trim()) errors.goodDescription = "Describe el bien o servicio.";
  if (!data.claimType) errors.claimType = "Elige el tipo de reclamación.";
  if (!data.detail?.trim()) errors.detail = "Detalla tu reclamación.";
  if (!data.request?.trim()) errors.request = "Indica tu pedido.";

  return errors;
}