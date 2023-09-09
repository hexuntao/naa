import { Locale } from 'antd/es/locale';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import { createContext } from 'react';

import { LocaleState, LocaleType, ThemeContextType, ThemeState } from './types';

export const localeData: Record<string, Locale> = {
  en_US: enUS,
  zh_CN: zhCN,
};
export const locales: LocaleType[] = [
  {
    name: 'en_US',
    label: '🇺🇸 english(US)',
  },
  {
    name: 'zh_CN',
    label: '🇨🇳 简体中文',
  },
];

export const LocaleContext = createContext<LocaleState>({
  locale: locales[0],
  setLocale: (_locale: LocaleType) => {},
});

export const defaultThemeConfig: ThemeState = {
  mode: 'light',
  compact: false,
};

export const ThemeContext = createContext<ThemeContextType | null>(null);
