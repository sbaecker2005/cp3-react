import { type ComponentType } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme';
import type { FieldInputProps, FieldType } from '../types/form';
import { CheckboxField } from './CheckboxField';
import { DateField } from './DateField';
import { RadioField } from './RadioField';
import { SelectField } from './SelectField';
import { SwitchField } from './SwitchField';
import { TextField } from './TextField';

const RENDERERS: Record<FieldType, ComponentType<FieldInputProps>> = {
  text: TextField,
  email: TextField,
  password: TextField,
  number: TextField,
  multiline: TextField,
  select: SelectField,
  radio: RadioField,
  checkbox: CheckboxField,
  switch: SwitchField,
  date: DateField,
};

type FieldControlProps = FieldInputProps & {
  error?: string;
};

export function FieldControl({ field, value, error, onChange }: FieldControlProps) {
  const Input = RENDERERS[field.type];

  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {field.label}
        {field.required ? ' (obrigatório)' : ''}
      </Text>
      <Input field={field} onChange={onChange} value={value} />
      {error ? (
        <Text accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 8,
  },
  label: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: theme.danger,
    fontSize: 16,
  },
});
