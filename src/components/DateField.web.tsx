import { createElement } from 'react';
import { View } from 'react-native';

import type { FieldInputProps } from '../types/form';
import { theme } from '../theme';

const inputStyle = {
  backgroundColor: theme.card,
  border: `1px solid ${theme.border}`,
  borderRadius: 12,
  boxSizing: 'border-box' as const,
  color: theme.text,
  fontSize: 16,
  minHeight: 48,
  padding: 12,
  width: '100%',
};

export function DateField({ field, value, onChange }: FieldInputProps) {
  const current = typeof value === 'string' ? value : '';

  return (
    <View>
      {createElement('input', {
        'aria-label': field.label,
        onChange: (event: { currentTarget: { value: string } }) => onChange(field.id, event.currentTarget.value),
        style: inputStyle,
        type: 'date',
        value: current,
      })}
    </View>
  );
}
