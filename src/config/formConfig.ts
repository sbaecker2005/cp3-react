import type { FormConfig } from '../types/form';

export const formConfig = {
  title: 'Cadastro de Usuário',
  fields: [
    { id: 'name', label: 'Nome', type: 'text', required: true },
    { id: 'email', label: 'E-mail', type: 'email', required: true },
    { id: 'password', label: 'Senha', type: 'password', required: true },
    { id: 'age', label: 'Idade', type: 'number', required: true },
    { id: 'bio', label: 'Biografia', type: 'multiline', required: false },
    {
      id: 'state',
      label: 'Estado',
      type: 'select',
      required: true,
      options: [
        { label: 'São Paulo', value: 'SP' },
        { label: 'Rio de Janeiro', value: 'RJ' },
        { label: 'Minas Gerais', value: 'MG' },
      ],
    },
    {
      id: 'gender',
      label: 'Gênero',
      type: 'radio',
      required: true,
      options: [
        { label: 'Masculino', value: 'male' },
        { label: 'Feminino', value: 'female' },
        { label: 'Outro', value: 'other' },
      ],
    },
    { id: 'terms', label: 'Aceito os termos', type: 'checkbox', required: true },
    { id: 'newsletter', label: 'Receber novidades', type: 'switch', required: true },
    { id: 'birthDate', label: 'Data de nascimento', type: 'date', required: true },
  ],
} satisfies FormConfig;
