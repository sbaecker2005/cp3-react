export type FieldOption = {
  label: string;
  value: string;
};

export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'multiline'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | 'date';

export type FormField = {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: FieldOption[];
};

export type FormConfig = {
  title: string;
  fields: FormField[];
};

export type FieldValue = string | boolean;

export type FormValues = Partial<Record<string, FieldValue>>;

export type FieldErrors = Partial<Record<string, string>>;

export type FieldInputProps = {
  field: FormField;
  value: FieldValue;
  onChange: (id: string, value: FieldValue) => void;
};
