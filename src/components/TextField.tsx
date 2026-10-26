import { TextInput } from 'react-native';

import type { FieldInputProps, FieldType } from '../types/form';
import { fieldStyles } from './fieldStyles';

const KEYBOARD: Partial<Record<FieldType, 'email-address' | 'numeric' | 'default'>> = {
  email: 'email-address',
  number: 'numeric',
};

export function TextField({ field, value, onChange }: FieldInputProps) {
  const text = typeof value === 'string' ? value : '';
  const multiline = field.type === 'multiline';

  return (
    <TextInput
      accessibilityLabel={field.label}
      autoCapitalize={field.type === 'email' || field.type === 'password' ? 'none' : 'sentences'}
      autoCorrect={field.type !== 'email' && field.type !== 'password'}
      keyboardType={KEYBOARD[field.type] ?? 'default'}
      multiline={multiline}
      onChangeText={(textValue) => onChange(field.id, textValue)}
      secureTextEntry={field.type === 'password'}
      style={multiline ? [fieldStyles.input, fieldStyles.multi] : fieldStyles.input}
      textAlignVertical={multiline ? 'top' : 'center'}
      value={text}
    />
  );
}
