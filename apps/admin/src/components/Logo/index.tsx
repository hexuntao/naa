import { FC } from 'react';

import { Skeleton } from 'antd';

const Logo: FC = () => {
  return <Skeleton.Avatar active size={'large'} />;
};

export default Logo;
