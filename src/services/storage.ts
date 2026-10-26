import AsyncStorage from '@react-native-async-storage/async-storage';

import type { FieldValue, FormValues } from '../types/form';

const KEY = 'cp3-form-submission';

export type Submission = {
  submittedAt: string;
  values: FormValues;
};

function isFieldValue(value: unknown): value is FieldValue {
  return typeof value === 'string' || typeof value === 'boolean';
}

function isSubmission(value: unknown): value is Submission {
  if (typeof value !== 'object' || value === null) return false;
  if (!('submittedAt' in value) || typeof value.submittedAt !== 'string') return false;
  if (!('values' in value) || typeof value.values !== 'object' || value.values === null) return false;
  return Object.values(value.values).every(isFieldValue);
}

export async function loadSubmission(): Promise<Submission | null> {
  const raw = await AsyncStorage.getItem(KEY);
  if (raw === null) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isSubmission(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export async function saveSubmission(submission: Submission): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(submission));
}

export async function clearSubmission(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
