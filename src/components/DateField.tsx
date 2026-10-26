import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme';
import type { FieldInputProps } from '../types/form';
import { fieldStyles } from './fieldStyles';

function parseDate(value: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return new Date();
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

export function DateField({ field, value, onChange }: FieldInputProps) {
  const current = typeof value === 'string' ? value : '';
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(() => parseDate(current));

  const commit = (date: Date) => {
    setDraft(date);
    onChange(field.id, formatDate(date));
  };

  const onPick = (event: DateTimePickerEvent, date?: Date) => {
    if (event.type !== 'set' || !date) {
      setOpen(false);
      return;
    }
    setOpen(false);
    commit(date);
  };

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.stack}>
        <Text style={styles.value}>{current === '' ? 'Nenhuma data escolhida' : current}</Text>
        <DateTimePicker display="spinner" mode="date" onChange={onPick} value={draft} />
        <Pressable
          accessibilityLabel={`Confirmar ${field.label}`}
          accessibilityRole="button"
          onPress={() => commit(draft)}
          style={fieldStyles.choice}
        >
          <Text style={styles.confirm}>Confirmar data exibida</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View>
      <Pressable
        accessibilityLabel={`Selecionar ${field.label}`}
        accessibilityRole="button"
        onPress={() => setOpen(true)}
        style={fieldStyles.input}
      >
        <Text style={current === '' ? styles.placeholder : styles.value}>
          {current === '' ? 'Selecionar data' : current}
        </Text>
      </Pressable>
      {open ? <DateTimePicker display="default" mode="date" onChange={onPick} value={draft} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: 8,
  },
  value: {
    color: theme.text,
    fontSize: 16,
  },
  placeholder: {
    color: theme.muted,
    fontSize: 16,
  },
  confirm: {
    color: theme.accent,
    fontSize: 16,
  },
});
