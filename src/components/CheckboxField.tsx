import { Pressable, View } from 'react-native';

import type { FieldInputProps } from '../types/form';
import { fieldStyles } from './fieldStyles';

export function CheckboxField({ field, value, onChange }: FieldInputProps) {
  const checked = value === true;

  return (
    <Pressable
      accessibilityLabel={field.label}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      onPress={() => onChange(field.id, !checked)}
      style={fieldStyles.choice}
    >
      <View style={checked ? [fieldStyles.mark, fieldStyles.markOn] : fieldStyles.mark} />
    </Pressable>
  );
}
