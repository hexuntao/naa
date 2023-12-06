import { Configure } from '@/modules/config/configure';
import { ConfigureFactory } from '@/modules/config/types';
import { ApiConfig } from '@/modules/restful/types';

import { v1 } from './v1';

export const api: ConfigureFactory<ApiConfig> = {
  register: async (configure: Configure) => ({
    title: configure.env.get('API_TITLE', 'API 标题'),
    description: configure.env.get('API_DESCRIPTION', 'API 描述'),
    auth: true,
    docuri: 'api/docs',
    default: configure.env.get('API_DEFAULT_VERSION', 'v1'),
    enabled: [],
    versions: { v1: await v1(configure) },
  }),
};
