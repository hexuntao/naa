import { FC } from 'react';
import { Layout, Menu } from 'antd';
import MenuItems from './MenuItems';
import Logo from '@/components/Logo';
import { MenuList } from '@/router/types';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';

const Aside = Layout.Sider;
// const { SubMenu, Item } = Menu;

const AsideMenu: FC = () => {
  const items: ItemType<MenuItemType>[] = [
    {
      key: 1,
      title: 'title',
      label: <>asd</>,
    },
  ];

  return (
    <Aside>
      <Logo />
      <Menu items={items}></Menu>
    </Aside>
  );
};

export default AsideMenu;
