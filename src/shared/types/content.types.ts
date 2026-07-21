export interface LotOption {
  label: string;
  value: string;
}

export interface LeadFormData {
  name: string;
  phone: string;
  lot: string;
  message?: string;
  source: "hero" | "cotizacion-final";
}
