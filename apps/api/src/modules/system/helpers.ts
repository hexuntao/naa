import { ConfigureFactory, ConfigureRegister } from '../config/types';

import { SystemConfig } from './types';

export const defaultSystemConfig: SystemConfig = {};
export const createSystemConfig: (
  register: ConfigureRegister<RePartial<SystemConfig>>,
) => ConfigureFactory<SystemConfig> = (register) => ({
  register,
  defaultRegister: () => defaultSystemConfig,
});
