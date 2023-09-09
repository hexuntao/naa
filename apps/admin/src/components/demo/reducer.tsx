import { Calendar, Switch } from 'antd';
import { produce } from 'immer';
import { isNil } from 'lodash';
import { ReactNode, Reducer, useContext, useEffect, useMemo, useReducer } from 'react';

import { ThemeContext, defaultThemeConfig } from './constants';
import $styles from './style.module.css';
import { ThemeAction, ThemeState } from './types';

const ThemeReducer: Reducer<ThemeState, ThemeAction> = produce((draft, action) => {
  switch (action.type) {
    case 'change_mode':
      draft.mode = action.value;
      break;
    case 'change_compact':
      draft.compact = action.value;
      break;
    default:
      break;
  }
});

export const Theme: FC<{ data?: ThemeState; children?: ReactNode }> = ({ data = {}, children }) => {
  const [state, dispatch] = useReducer(ThemeReducer, data, (initData) => ({
    ...defaultThemeConfig,
    ...initData,
  }));
  useEffect(() => {
    const body = document.getElementsByTagName('body');
    if (body.length) {
      body[0].classList.remove('light');
      body[0].classList.remove('dark');
      body[0].classList.add(state.mode === 'dark' ? 'dark' : 'light');
    }
  }, [state.mode]);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const ThemeConfig: FC = () => {
  const context = useContext(ThemeContext);
  if (isNil(context)) return null;
  const { state, dispatch } = context;
  const toggleMode = () =>
    dispatch({ type: 'change_mode', value: state.mode === 'light' ? 'dark' : 'light' });
  const toggleCompact = () => dispatch({ type: 'change_compact', value: !state.compact });
  return (
    <>
      <Switch
        checkedChildren="🌛"
        unCheckedChildren="☀️"
        onChange={toggleMode}
        checked={state.mode === 'dark'}
        defaultChecked={state.mode === 'dark'}
      />
      <Switch
        checkedChildren="紧凑"
        unCheckedChildren="正常"
        onChange={toggleCompact}
        checked={state.compact}
        defaultChecked={state.compact}
      />
    </>
  );
};

const ReducerDemo: FC = () => {
  const context = useContext(ThemeContext);
  if (isNil(context)) return null;
  const {
    state: { mode, compact },
  } = context;
  return (
    <div className={$styles.container}>
      <h2 className="text-center">useReducer Demo</h2>
      <div className="flex items-center flex-col">
        <p>主题模式: 「{mode === 'dark' ? '暗黑' : '明亮'}」</p>
        <p>是否紧凑: 「{compact ? '是' : '否'}」</p>
        <div className="flex-auto mb-5">
          <ThemeConfig />
        </div>
        <div className="max-w-md">
          <Calendar fullscreen={false} />
        </div>
      </div>
    </div>
  );
};

export default ReducerDemo;
