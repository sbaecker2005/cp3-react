import type { FieldErrors, FieldValue, FormField, FormValues } from '../types/form';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NUMBER = /^-?\d+([.,]\d+)?$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

export function initialValues(fields: readonly FormField[]): FormValues {
  const values: FormValues = {};
  for (const field of fields) {
    values[field.id] = field.type === 'checkbox' || field.type === 'switch' ? false : '';
  }
  return values;
}

// switch: false is an answer. checkbox required means the box must be checked.
export function validateForm(fields: readonly FormField[], values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  for (const field of fields) {
    const message = validateField(field, values[field.id]);
    if (message) errors[field.id] = message;
  }
  return errors;
}

function validateField(field: FormField, value: FieldValue | undefined): string | undefined {
  if (field.type === 'switch') {
    if (field.required && typeof value !== 'boolean') return 'Defina ligado ou desligado.';
    return undefined;
  }

  if (field.type === 'checkbox') {
    if (field.required && value !== true) return 'Marque esta opção para continuar.';
    return undefined;
  }

  const text = typeof value === 'string' ? value.trim() : '';
  if (text === '') return field.required ? 'Preencha este campo.' : undefined;
  if (field.type === 'email' && !EMAIL.test(text)) return 'Informe um e-mail válido.';
  if (field.type === 'number' && !NUMBER.test(text)) return 'Informe um número válido.';
  if (field.type === 'date' && !DATE.test(text)) return 'Informe uma data válida.';
  return undefined;
}
