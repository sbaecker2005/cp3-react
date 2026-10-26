# Formulário Dinâmico

> Você preenche um cadastro montado a partir de uma configuração, e o envio válido fica salvo no aparelho.

## Descrição

O aplicativo lê o título e o array `fields` e desenha um controle para cada item, conforme o `type`. Os campos não estão escritos um a um na tela. Se a configuração mudar, a tela muda junto.

Depois de um envio válido, você vê o resultado com o rótulo de cada campo. Esse bloco volta quando você fecha e abre o app. O botão **Limpar dados salvos** apaga o registro e o bloco some.

Os campos do formulário começam vazios de novo. O que persiste é o bloco **Resultado salvo**, não o que estava digitado e ainda não tinha sido enviado.

## Tecnologias

- React Native 0.83 e Expo SDK 55
- TypeScript estrito
- AsyncStorage 2.2
- `@react-native-picker/picker` 2.11 (select nas três plataformas)
- `@react-native-community/datetimepicker` 8.6 no Android e no iOS
- `<input type="date">` na Web (`src/components/DateField.web.tsx`)
- Jest (jest-expo) para a validação

## Como executar

Você precisa do Node.js 22 e do npm.

```bash
npm install
npx expo start
```

Na Web:

```bash
npx expo start --web
```

No celular, abra o Expo Go do SDK 55 e leia o QR code que o terminal mostra.

## Validação

O envio só grava quando `validateForm` não devolve erro. A mensagem aparece embaixo do campo.

| Tipo | Regra |
| --- | --- |
| text, password, multiline, select, radio | Obrigatório: texto vazio (já sem espaços nas pontas) bloqueia o envio. |
| email | Além do obrigatório, o texto precisa ter a forma `nome@dominio.tld`. |
| number | Além do obrigatório, só vale um inteiro ou decimal, com ponto ou vírgula. `0` e `1,5` passam. `doze` não passa. |
| date | Obrigatório: vazio bloqueia. Se houver texto, ele precisa estar em `AAAA-MM-DD`. |
| checkbox | Obrigatório significa marcado (`true`). Desmarcado não é uma resposta suficiente. |
| switch | `false` é resposta (desligado). O valor inicial já é `false`, então um switch obrigatório não impede o envio. Só falharia se o valor não fosse boolean. |

A biografia é o único campo opcional desta configuração. Select e rádio leem as alternativas de `options`.

Na data, a Web usa o seletor nativo do navegador. O Android abre o diálogo ao tocar em **Selecionar data**. O iOS mostra a roleta e o botão **Confirmar data exibida**, para você poder aceitar o dia que já está na tela sem girar a roleta.

## Como verificar

```bash
npx tsc --noEmit
npm test
npx expo export --platform web
npx expo export --platform android
npx expo export --platform ios
```

Os três exports terminam sem erro quando o bundle de cada plataforma fecha.

## Estrutura de pastas

```text
App.tsx                 tela raiz
index.ts                registro do app
src/config/formConfig.ts    título e fields
src/types/form.ts           tipos da configuração e dos valores
src/components/FieldControl.tsx   mapa type -> componente
src/components/TextField.tsx      text, email, password, number, multiline
src/components/SelectField.tsx
src/components/RadioField.tsx
src/components/CheckboxField.tsx
src/components/SwitchField.tsx
src/components/DateField.tsx       Android e iOS
src/components/DateField.web.tsx   Web
src/screens/FormScreen.tsx
src/hooks/useForm.ts
src/services/storage.ts     AsyncStorage
src/utils/validate.ts
src/utils/validate.test.ts
src/theme.ts
docs/ENUNCIADO.md
docs/RELATORIO-cp3.md
```

## Prints

As imagens não foram geradas aqui: esta máquina não tem emulador nem captura de tela do app. Antes da entrega, grave os três fluxos (formulário preenchido e bloco **Resultado salvo** visível) nestes caminhos:

- `docs/prints/web.png`
- `docs/prints/android.png`
- `docs/prints/ios.png`

## Integrantes

- NOME COMPLETO - RM A PREENCHER
