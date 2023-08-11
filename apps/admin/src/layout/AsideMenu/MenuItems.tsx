import { MenuList } from '@/router/types';
import { Menu } from 'antd';
import { FC } from 'react';

const { SubMenu, Item } = Menu;

type MenuItemsProps = {
  items?: MenuList;
};

const MenuItems: FC<MenuItemsProps> = ({ items = [] }) => {
  const getTitle = (menu: MenuList[0]) => {
    return (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <span>{menu.meta?.title}</span>
      </span>
    );
  };

  const getMenus = (menuList: MenuList) => {
    return menuList
      ?.filter(item => !item.meta?.hidden)
      ?.map(menu => {
        return menu.children ? (
          <SubMenu key={menu.key || menu.path} title={getTitle(menu)}>
            {getMenus(menu.children)}
          </SubMenu>
        ) : (
          <Item key={menu.key || menu.path}>{getTitle(menu)}</Item>
        );
      });
  };

  return getMenus(items);
};

export default MenuItems;
