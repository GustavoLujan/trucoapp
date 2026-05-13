# TrucoApp — Convenciones del Proyecto

## Propósito
Anotador de Truco para Android. Expo 55 / React Native 0.83 / TypeScript strict.

## Stack
- Estado: useReducer (gameReducer) + hook useGameState. Sin Redux.
- Almacenamiento: @react-native-async-storage/async-storage (fase 2)
- Gráficos: View shapes de React Native (sin librería SVG)
- Tests: preset jest-expo + @testing-library/react-native

## Reglas de carpetas
- Todo código fuente bajo `src/`. Entry point: `App.tsx` en la raíz.
- Tipos en `src/types/game.ts` — un solo archivo para todas las interfaces.
- Funciones puras en `src/utils/` (reducer, helpers de storage).
- Hooks en `src/hooks/`.
- Componentes en `src/components/<NombreComponente>/` con barrel `index.ts`.

## Reglas de componentes
- Cada componente exporta su interfaz Props tipada.
- Estilos siempre en `StyleSheet.create` al final del archivo. Sin estilos inline en JSX.
- Los componentes solo reciben lo que necesitan por props; sin acceso a estado global.

## Tests
- Correr: `npx jest`
- Ubicación: `__tests__/<espejo-de-src-path>/`
- Tests del reducer: unitarios puros (sin render).
- Tests de componentes: `render` + `fireEvent` de @testing-library/react-native.

## Git
- Commits: conventional commits (feat:, fix:, test:, chore:)
- Rama principal: main

## Build APK
- Dev local: `npx expo start --android`
- Preview APK: `eas build --platform android --profile preview`
- Requiere cuenta EAS: `npx eas login`
