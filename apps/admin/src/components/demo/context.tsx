import { Pagination, Select } from 'antd';
import { ReactNode, useCallback, useMemo, useState } from 'react';

import { LocaleContext, localeData, locales } from './constants';
import { useLocale, useLocaleAction } from './custom';
import $styles from './style.module.css';
import { LocaleState, LocaleType } from './types';

const LocaleProvider: FC<LocaleState & { children?: ReactNode }> = ({
  locale,
  setLocale,
  children,
}) => {
  const value = useMemo(() => ({ locale, setLocale }), [locale]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
};

export const Locale: FC<{ children?: ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<LocaleType>(locales[0]);
  const changeLocale = useCallback((value: LocaleType) => {
    if (Object.keys(localeData).find((v) => v === value.name)) {
      setLocale(value);
    }
  }, []);
  return (
    <LocaleProvider locale={locale} setLocale={changeLocale}>
      {children}
    </LocaleProvider>
  );
};

export const LocaleConfig: FC = () => {
  const locale = useLocale();
  const setLocale = useLocaleAction();
  const changeLocale = (value: string) => {
    const current = locales.find((item) => item.name === value);
    current && setLocale(current);
  };
  return (
    <Select defaultValue={locale.name} style={{ width: 120 }} onChange={changeLocale}>
      {locales.map(({ name, label }) => (
        <Select.Option key={name} value={name}>
          {label}
        </Select.Option>
      ))}
    </Select>
  );
};

const ContextDemo: FC = () => {
  const locale = useLocale();
  return (
    <div className={$styles.container}>
      <h2 className="text-center">useContext Demo</h2>
      <p className="text-center py-5">当前语言: {locale.label}</p>
      <div className="w-full">
        <h3>Antd语言切换测试</h3>
        <div className="w-full my-4">
          <LocaleConfig />
        </div>
      </div>
      <Pagination defaultCurrent={0} total={500} />
    </div>
  );
};
export default ContextDemo;
