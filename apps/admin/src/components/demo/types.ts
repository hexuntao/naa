import { Dispatch } from 'react';

export type LocaleType = {
  name: string;
  label: string;
};
export type LocaleState = {
  locale: LocaleType;
  setLocale: (locale: LocaleType) => void;
};

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export type ThemeState = {
  mode: `${ThemeMode}`;
  compact: boolean;
};

export enum ThemeActionType {
  CHANGE_MODE = 'change_mode',
  CHANGE_COMPACT = 'change_compact',
}

export type ThemeAction =
  | { type: `${ThemeActionType.CHANGE_MODE}`; value: `${ThemeMode}` }
  | { type: `${ThemeActionType.CHANGE_COMPACT}`; value: boolean };

export type ThemeContextType = {
  state: ThemeState;
  dispatch: Dispatch<ThemeAction>;
};
