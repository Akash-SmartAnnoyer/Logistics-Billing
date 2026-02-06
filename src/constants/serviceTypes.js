/**
 * Service types – single source of truth for the entire application.
 * Use SERVICE_TYPES for dropdowns, labels, and display.
 * Each type has: value (form/key), code (short code), label, letter (badge logo), colors.
 */
export const SERVICE_TYPES = [
  {
    value: 'pickup_only',
    code: 'PU',
    label: 'Pickup only',
    letter: 'P',
    bgColor: '#2563eb',
    textColor: '#ffffff',
  },
  {
    value: 'delivery_only',
    code: 'DL',
    label: 'Delivery only',
    letter: 'D',
    bgColor: '#059669',
    textColor: '#ffffff',
  },
  {
    value: 'pickup_delivery',
    code: 'PU+DL',
    label: 'Pickup + Delivery',
    letter: 'P+D',
    bgColor: '#0d9488',
    textColor: '#ffffff',
  },
  {
    value: 'pickup_linehaul',
    code: 'PU+LH',
    label: 'Pickup + Linehaul (PU+LH)',
    letter: 'P+L',
    bgColor: '#d97706',
    textColor: '#ffffff',
  },
  {
    value: 'linehaul_delivery',
    code: 'LH+DL',
    label: 'Linehaul + Delivery (LH+DL)',
    letter: 'L+D',
    bgColor: '#7c3aed',
    textColor: '#ffffff',
  },
  {
    value: 'full_service',
    code: 'PU+LH+DL',
    label: 'Full service (PU+LH+DL)',
    letter: 'F',
    bgColor: '#4f46e5',
    textColor: '#ffffff',
  },
];

/** Get service type config by value */
export function getServiceType(value) {
  return SERVICE_TYPES.find((t) => t.value === value) || null;
}

/** Get label by value */
export function getServiceTypeLabel(value) {
  const t = getServiceType(value);
  return t ? t.label : value || '';
}

/** Get code by value */
export function getServiceTypeCode(value) {
  const t = getServiceType(value);
  return t ? t.code : value || '';
}
