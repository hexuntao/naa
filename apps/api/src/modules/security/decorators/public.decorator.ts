import { SetMetadata } from '@nestjs/common';

import { PUBLIC_METADATA } from '../security.constants';

/**
 * 公开：不需要认证就能进入该方法
 */
export const Public = () => {
  return SetMetadata(PUBLIC_METADATA, true);
};
