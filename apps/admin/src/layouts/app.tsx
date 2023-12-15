import { RunTimeLayoutConfig } from '@umijs/max';
import { AvatarDropdown, AvatarName } from './default';
import { buildMenus } from '@/router/helper/menu';

/**
 * @name ProLayout 运行时布局配置
 * @doc https://procomponents.ant.design/components/layout#prolayout
 */
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const user = initialState?.userInfo;

  return {
    avatarProps: {
      src: user?.avatar,
      title: <AvatarName name={user?.nickName || ''} />,
      render: (_, children) => {
        return <AvatarDropdown>{children}</AvatarDropdown>;
      },
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    postMenuData(menuData) {
      return buildMenus(menuData!);
    },
    actionsRender: () => {
      return [];
    },
    childrenRender: (children) => {
      return children;
    },
    ...initialState?.settings,
  };
};
