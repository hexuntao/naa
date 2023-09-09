import { Button } from 'antd';
import clsx from 'clsx';
import { isEqual, isNil } from 'lodash';
import {
  DependencyList,
  EffectCallback,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { LocaleContext, ThemeContext, defaultThemeConfig, locales } from './constants';
import $styles from './style.module.css';

export const useTheme = () => {
  const context = useContext(ThemeContext) ?? ({} as Record<string, any>);
  return useMemo(
    () => (isNil(context.state) ? defaultThemeConfig : context.state),
    [context.state],
  );
};

export const useThemeAction = () => {
  const context = useContext(ThemeContext) ?? ({} as Record<string, any>);
  return useCallback(isNil(context.dispatch) ? null : context.dispatch, [context.dispatch]);
};

export const useLocale = () => {
  const context = useContext(LocaleContext) ?? ({} as Record<string, any>);
  return useMemo(() => (isNil(context.locale) ? locales[0] : context.locale), [context.locale]);
};

export const useLocaleAction = () => {
  const context = useContext(LocaleContext) ?? ({} as Record<string, any>);
  return useCallback(isNil(context.setLocale) ? null : context.setLocale, [context.setLocale]);
};

export const useUpdateEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const inited = useRef(deps);
  useEffect(() => {
    if (!isEqual(inited.current, deps)) {
      inited.current = deps;
      effect();
    }
  }, [deps]);
};

const CustomDemo: FC = () => {
  const [count, setCount] = useState(0);
  useUpdateEffect(() => {
    console.log('changed');
  }, [count]);
  return (
    <div className={clsx($styles.container, 'w-[20rem]')}>
      <h2 className="text-center">Custom Demo</h2>
      <p className="text-center py-5">{count}</p>
      <div className="flex justify-around">
        <Button onClick={() => setCount(Math.ceil(Math.random() * 10))} type="dashed">
          变化
        </Button>
      </div>
    </div>
  );
};
export default CustomDemo;
