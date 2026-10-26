# Relatório — Checkpoint 3

Opção menor adotada: um `TextInput` para text, email, password, number e multiline; data só em `DateField.tsx` (Android e iOS) e `DateField.web.tsx`; sem biblioteca de formulário.

O template é o `expo-template-blank-typescript` do SDK 55 (versão 55.1.39). O `create-expo-app` atual (5.0.0) cria projeto no SDK 58, então a base veio do template oficial na branch `sdk-55`.

## Checklist da seção 13

- [x] **React Native, Expo SDK 55, TypeScript e AsyncStorage.** `package.json:18` (`expo` `~55.0.32`), `package.json:23` (`react-native` `0.83.10`), `package.json:29` (`typescript` `~5.9.2`, `strict` em `tsconfig.json:4`), `package.json:15` e `src/services/storage.ts:1`.
- [x] **Execução em Android, iOS e Web.** Bundles gerados sem erro: `npx expo export --platform web`, `--platform android` e `--platform ios`. A Web usa `src/components/DateField.web.tsx:28` (`input type="date"`). O bundle web contém `type:'date'` nesse input e não contém o texto do seletor nativo. Android e iOS usam `src/components/DateField.tsx:44` e `:69` (`DateTimePicker`). Não abri emulador nem Expo Go; a prova desta máquina é o export.
- [x] **Formulário gerado dinamicamente a partir da configuração.** `src/screens/FormScreen.tsx:40` percorre `formConfig.fields`. `src/components/FieldControl.tsx:13` escolhe o componente pelo `type`. Nenhum campo está fixo no JSX.
- [x] **Dez tipos de campo.** Um de cada em `src/config/formConfig.ts:6` (text), `:7` (email), `:8` (password), `:9` (number), `:10` (multiline), `:14` (select), `:25` (radio), `:33` (checkbox), `:34` (switch), `:35` (date).
- [x] **Opções de seleção na configuração.** `src/config/formConfig.ts:16` e `:27`. O select as lê em `src/components/SelectField.tsx:18`. O rádio, em `src/components/RadioField.tsx:13`.
- [x] **Validação de obrigatórios, e-mail e número.** `src/utils/validate.ts:16`. Checkbox obrigatório exige `true` (`validate.ts:31`). Switch: `false` é resposta (`validate.ts:26`). O erro fica no campo em `src/components/FieldControl.tsx:40`. Envio inválido não grava: `src/hooks/useForm.ts:46`.
- [x] **Resultado após envio válido.** `src/screens/FormScreen.tsx:59` mostra rótulo e valor. Select e rádio aparecem pelo rótulo da opção (`FormScreen.tsx:14`). Boolean vira Sim/Não (`FormScreen.tsx:11`).
- [x] **Salvar, recuperar e limpar com AsyncStorage.** Grava `src/services/storage.ts:34`, lê `:23` no `useEffect` de `src/hooks/useForm.ts:18`, apaga `storage.ts:38` pelo botão `FormScreen.tsx:69`. A tela troca o bloco pelo texto de vazio em `FormScreen.tsx:58`.
- [x] **useState, useEffect, useMemo e useCallback.** Estado em `src/hooks/useForm.ts:13`. Efeito de leitura em `:18`. `onChange` `:35`, `onSubmit` `:45`, `onClear` `:64`. `useMemo` monta as linhas do resultado em `src/screens/FormScreen.tsx:20`.
- [x] **Ausência de `any`.** `npx tsc --noEmit` saiu 0. Busca de `any` em `src/` e `App.tsx` não achou ocorrência.
- [x] **Flexbox e StyleSheet.** `StyleSheet.create` em `src/screens/FormScreen.tsx:83`, `src/components/fieldStyles.ts:5` (`flexDirection: 'row'` na linha 23, `gap`) e `App.tsx:18` (`flex: 1`).
- [x] **Código modularizado.** Tipos, config, componentes, tela, hook, storage e validação em pastas separadas, com `import`/`export`.
- [x] **README com instruções, prints, estrutura, nomes e RMs.** `README.md` tem descrição, tecnologias, execução, estrutura e a seção Integrantes. Os prints estão só como caminhos `docs/prints/web.png`, `docs/prints/android.png` e `docs/prints/ios.png`: os arquivos PNG não existem ainda. O nome e o RM estão como `NOME COMPLETO - RM A PREENCHER`.
- [ ] **Repositório GitHub acessível.** Não publiquei o repositório. Quem entrega sobe o projeto e manda o link.
- [ ] **Link entregue pelo Teams.** Fora deste ambiente.

## Regras das peças emprestadas

Aplicadas no app:

- `react-native-skills/rules/ui-pressable.md`: `Pressable` em `src/screens/FormScreen.tsx:49` e `:69`, `src/components/CheckboxField.tsx:10`, `src/components/RadioField.tsx:15`, `src/components/DateField.tsx:45` e `:59`.
- `react-native-skills/rules/ui-safe-area-scroll.md`: `contentInsetAdjustmentBehavior="automatic"` em `src/screens/FormScreen.tsx:32`.
- `react-native-skills/rules/ui-styling.md`: `gap`, `borderCurve: 'continuous'` e `boxShadow` em `src/screens/FormScreen.tsx:89`, `:118` e `:148`. Um único `fontSize: 16`. Cores em `src/theme.ts:1`.
- `react-native-skills/rules/rendering-text-in-text-component.md`: textos dentro de `Text`, por exemplo `src/screens/FormScreen.tsx:36` e `:65`.
- `react-native-skills/rules/rendering-no-falsy-and.md`: erro com ternário em `src/components/FieldControl.tsx:40`; carga e vazio comparados com `===` em `src/screens/FormScreen.tsx:57` e `:58`.
- `react-native-skills/rules/react-state-minimize.md`: as linhas do resultado saem de `useMemo` (`src/screens/FormScreen.tsx:20`), não de outro `useState`.
- `react-native-skills/rules/react-state-fallback.md`: `saved === undefined` é a carga (`src/hooks/useForm.ts:15`, `src/screens/FormScreen.tsx:57`).
- `react-native-skills/rules/state-ground-truth.md`: o estado guarda o valor do campo (`src/hooks/useForm.ts:13`), não altura nem opacidade.
- `guias-react-native/accessibility.md`: `accessibilityLabel` e `accessibilityRole` nos controles próprios (`src/components/TextField.tsx:17`, `CheckboxField.tsx:11`, `RadioField.tsx:16`, `SwitchField.tsx:8`, `SelectField.tsx:13`, `DateField.tsx:46`, `DateField.web.tsx:25`). Erro com `accessibilityLiveRegion="polite"` em `src/components/FieldControl.tsx:41`. Alvo de toque com `minHeight: 48` em `src/components/fieldStyles.ts:14` e `src/screens/FormScreen.tsx:121`.
- `guias-react-native/coding-style.md`: props com `type` nomeado (`src/types/form.ts:37`), sem `React.FC`, `StyleSheet` no módulo, sem `console.log`.
- `guias-react-native/hooks.md`: o efeito cancela a resposta tardia em `src/hooks/useForm.ts:31`.
- `guias-react-native/patterns.md`: a tela só compõe hook e componentes (`src/screens/FormScreen.tsx:18`). Persistência não sigilosa no AsyncStorage (`src/services/storage.ts:34`).
- `guias-react-native/testing.md`: teste da validação com jest-expo em `src/utils/validate.test.ts:18`. `npm test` passou (2 testes).
- `typescript-patterns.md`: tipos explícitos e nenhum `any` em `src/types/form.ts`. Não usei o exemplo de repositório nem Zod: não há API, e a validação pedida cabe em `src/utils/validate.ts`.
- `engineering-technical-writer.md`: o `README.md` está em segunda pessoa, uma ideia por seção, com o comando que sobe o app.

Não aplicadas, porque o enunciado não pede: FlashList, Reanimated, Expo Router, `expo-image`, alias `@/`, tema escuro e teste de componente com Testing Library.

## Provas nesta máquina

- `npx tsc --noEmit` — saída limpa.
- `npm test` — `src/utils/validate.test.ts`, 2 testes, ok.
- `npx expo export --platform web` — `Exported: dist`, bundle web.
- `npx expo export --platform android` — `Exported: dist`, bundle android.
- `npx expo export --platform ios` — `Exported: dist`, bundle ios.
