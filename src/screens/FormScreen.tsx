import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FieldControl } from '../components/FieldControl';
import { formConfig } from '../config/formConfig';
import { useForm } from '../hooks/useForm';
import { theme } from '../theme';
import type { FieldValue, FormField } from '../types/form';

function displayValue(field: FormField, value: FieldValue | undefined): string {
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  if (!value) return '—';
  const option = field.options?.find((item) => item.value === value);
  return option ? option.label : value;
}

export function FormScreen() {
  const { values, errors, saved, storageError, onChange, onSubmit, onClear } = useForm(formConfig);

  const rows = useMemo(() => {
    if (!saved) return [];
    return formConfig.fields.map((field) => ({
      id: field.id,
      label: field.label,
      text: displayValue(field, saved.values[field.id]),
    }));
  }, [saved]);

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      style={styles.scroll}
    >
      <Text accessibilityRole="header" style={styles.title}>
        {formConfig.title}
      </Text>
      {storageError ? <Text style={styles.error}>{storageError}</Text> : null}
      {formConfig.fields.map((field) => (
        <FieldControl
          error={errors[field.id]}
          field={field}
          key={field.id}
          onChange={onChange}
          value={values[field.id] ?? ''}
        />
      ))}
      <Pressable
        accessibilityLabel="Enviar formulário"
        accessibilityRole="button"
        onPress={onSubmit}
        style={styles.primary}
      >
        <Text style={styles.primaryText}>Enviar</Text>
      </Pressable>
      {saved === undefined ? <Text style={styles.muted}>Carregando dados salvos…</Text> : null}
      {saved === null ? <Text style={styles.muted}>Nenhum envio salvo neste aparelho.</Text> : null}
      {saved ? (
        <View style={styles.result}>
          <Text accessibilityRole="header" style={styles.label}>
            Resultado salvo
          </Text>
          {rows.map((row) => (
            <Text key={row.id} style={styles.body}>
              {row.label}: {row.text}
            </Text>
          ))}
          <Pressable
            accessibilityLabel="Limpar dados salvos"
            accessibilityRole="button"
            onPress={onClear}
            style={styles.secondary}
          >
            <Text style={styles.secondaryText}>Limpar dados salvos</Text>
          </Pressable>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: theme.bg,
  },
  content: {
    gap: 16,
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '700',
  },
  label: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    color: theme.text,
    fontSize: 16,
  },
  muted: {
    color: theme.muted,
    fontSize: 16,
  },
  error: {
    color: theme.danger,
    fontSize: 16,
  },
  primary: {
    alignItems: 'center',
    backgroundColor: theme.accent,
    borderCurve: 'continuous',
    borderRadius: 12,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 16,
  },
  primaryText: {
    color: theme.accentText,
    fontSize: 16,
    fontWeight: '600',
  },
  secondary: {
    alignItems: 'center',
    borderColor: theme.border,
    borderCurve: 'continuous',
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 16,
  },
  secondaryText: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '600',
  },
  result: {
    backgroundColor: theme.card,
    borderCurve: 'continuous',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    gap: 8,
    padding: 16,
  },
});
