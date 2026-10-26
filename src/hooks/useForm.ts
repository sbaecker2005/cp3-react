import { useCallback, useEffect, useState } from 'react';

import {
  clearSubmission,
  loadSubmission,
  saveSubmission,
  type Submission,
} from '../services/storage';
import type { FieldErrors, FieldValue, FormConfig, FormValues } from '../types/form';
import { initialValues, validateForm } from '../utils/validate';

export function useForm(config: FormConfig) {
  const [values, setValues] = useState<FormValues>(() => initialValues(config.fields));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [saved, setSaved] = useState<Submission | null | undefined>(undefined);
  const [storageError, setStorageError] = useState<string | undefined>(undefined);

  useEffect(() => {
    let active = true;
    loadSubmission()
      .then((submission) => {
        if (!active) return;
        setSaved((current) => (current === undefined ? submission : current));
      })
      .catch(() => {
        if (!active) return;
        setSaved((current) => (current === undefined ? null : current));
        setStorageError('Não foi possível ler os dados salvos.');
      });
    return () => {
      active = false;
    };
  }, []);

  const onChange = useCallback((id: string, value: FieldValue) => {
    setValues((current) => ({ ...current, [id]: value }));
    setErrors((current) => {
      if (current[id] === undefined) return current;
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);

  const onSubmit = useCallback(() => {
    const nextErrors = validateForm(config.fields, values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const submission: Submission = {
      submittedAt: new Date().toISOString(),
      values: { ...values },
    };
    saveSubmission(submission)
      .then(() => {
        setSaved(submission);
        setStorageError(undefined);
      })
      .catch(() => {
        setStorageError('Não foi possível salvar. O resultado não foi gravado.');
      });
  }, [config.fields, values]);

  const onClear = useCallback(() => {
    clearSubmission()
      .then(() => {
        setSaved(null);
        setStorageError(undefined);
      })
      .catch(() => {
        setStorageError('Não foi possível limpar os dados salvos.');
      });
  }, []);

  return { values, errors, saved, storageError, onChange, onSubmit, onClear };
}
