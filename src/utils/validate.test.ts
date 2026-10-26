import { expect, test } from '@jest/globals';

import type { FormField, FormValues } from '../types/form';
import { validateForm } from './validate';

const fields: FormField[] = [
  { id: 'email', label: 'E-mail', type: 'email', required: true },
  { id: 'age', label: 'Idade', type: 'number', required: true },
  { id: 'bio', label: 'Biografia', type: 'multiline', required: false },
  { id: 'terms', label: 'Termos', type: 'checkbox', required: true },
  { id: 'newsletter', label: 'Novidades', type: 'switch', required: true },
];

function values(overrides: FormValues): FormValues {
  return { email: '', age: '', bio: '', terms: false, newsletter: false, ...overrides };
}

test('aceita switch desligado e recusa checkbox obrigatório desmarcado', () => {
  const errors = validateForm(fields, values({ email: 'ana@example.com', age: '0' }));
  expect(errors.newsletter).toBeUndefined();
  expect(errors.terms).toBe('Marque esta opção para continuar.');
});

test('recusa e-mail e número inválidos e aceita o formulário coerente', () => {
  const invalid = validateForm(fields, values({ email: 'ana', age: 'doze', terms: true }));
  expect(invalid.email).toBe('Informe um e-mail válido.');
  expect(invalid.age).toBe('Informe um número válido.');

  const valid = validateForm(
    fields,
    values({ email: '  ana@example.com  ', age: '1,5', bio: '', terms: true, newsletter: false }),
  );
  expect(valid).toEqual({});
});
