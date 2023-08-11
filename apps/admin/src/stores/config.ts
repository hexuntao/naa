import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfigState {
  /** 主题色 */
  primaryColor: string;
  setColor: (color: string) => void;
}

/**
 * 全局配置hook
 */
const useConfigStore = create<ConfigState>()(
  persist(
    set => ({
      primaryColor: '#247fff',
      setColor: color => set(() => ({ primaryColor: color })),
    }),
    {
      name: 'primaryColor',
      partialize: state =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) =>
            ['primaryColor'].includes(key)
          )
        ),
    }
  )
);

export default useConfigStore;
