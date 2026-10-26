import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';

import type { FieldInputProps } from '../types/form';
import { fieldStyles } from './fieldStyles';

export function SelectField({ field, value, onChange }: FieldInputProps) {
  const selected = typeof value === 'string' ? value : '';

  return (
    <View style={fieldStyles.input}>
      <Picker
        accessibilityLabel={field.label}
        onValueChange={(itemValue) => onChange(field.id, String(itemValue))}
        selectedValue={selected}
      >
        <Picker.Item label="Selecione" value="" />
        {(field.options ?? []).map((option) => (
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        ))}
      </Picker>
    </View>
  );
}
