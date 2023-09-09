import { ConfigEnv, UserConfig, defineConfig } from 'vite';

import { createConfig } from './scripts';

// https://vitejs.dev/config/
export default defineConfig((params: ConfigEnv): UserConfig => {
  const config = createConfig(params);
  return config;
});
