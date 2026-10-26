import { Switch } from 'react-native';

import type { FieldInputProps } from '../types/form';

export function SwitchField({ field, value, onChange }: FieldInputProps) {
  return (
    <Switch
      accessibilityLabel={field.label}
      onValueChange={(next) => onChange(field.id, next)}
      value={value === true}
    />
  );
}
