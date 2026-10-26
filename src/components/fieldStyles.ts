import { StyleSheet } from 'react-native';

import { theme } from '../theme';

export const fieldStyles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    borderCurve: 'continuous',
    backgroundColor: theme.card,
    color: theme.text,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  multi: {
    minHeight: 96,
  },
  choice: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    minHeight: 48,
  },
  mark: {
    borderColor: theme.border,
    borderRadius: 4,
    borderWidth: 1,
    height: 22,
    width: 22,
  },
  markOn: {
    backgroundColor: theme.accent,
    borderColor: theme.accent,
  },
  dot: {
    alignItems: 'center',
    borderColor: theme.border,
    borderCurve: 'continuous',
    borderRadius: 11,
    borderWidth: 1,
    height: 22,
    justifyContent: 'center',
    width: 22,
  },
  dotOn: {
    backgroundColor: theme.accent,
    borderRadius: 6,
    height: 12,
    width: 12,
  },
});
