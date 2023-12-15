import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${new Date().getFullYear()} hexuntao`}
      links={[
        {
          key: 'Naa',
          title: 'Nest Antd Admin',
          href: 'https://github.com/hexuntao/naa',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
