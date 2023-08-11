import { FC } from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter } from 'react-router-dom';

import dayjs from 'dayjs';
import 'antd/dist/reset.css';
import './styles/global.css';
import 'dayjs/locale/zh-cn';

import { useConfigStore } from '@/stores';
import Router from './router';

dayjs.locale('zh-cn');

const App: FC = () => {
  const { primaryColor } = useConfigStore();
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
      }}
      componentSize="middle"
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
