import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme';
import type { FieldInputProps } from '../types/form';
import { fieldStyles } from './fieldStyles';

export function RadioField({ field, value, onChange }: FieldInputProps) {
  const selected = typeof value === 'string' ? value : '';

  return (
    <View accessibilityRole="radiogroup" style={styles.group}>
      {(field.options ?? []).map((option) => {
        const isSelected = selected === option.value;
        return (
          <Pressable
            accessibilityLabel={option.label}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            key={option.value}
            onPress={() => onChange(field.id, option.value)}
            style={fieldStyles.choice}
          >
            <View style={fieldStyles.dot}>{isSelected ? <View style={fieldStyles.dotOn} /> : null}</View>
            <Text style={styles.label}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: 4,
  },
  label: {
    color: theme.text,
    fontSize: 16,
  },
});
