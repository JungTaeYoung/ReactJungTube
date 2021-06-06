import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu theme={props.theme} mode={props.mode} style={{ backgroundColor: 'transparent' }}>
      <Menu.Item key="mail">
        <a href="/">모든 영상</a>
      </Menu.Item>
      <Menu.Item key="mail2">
        <a href="/subscription">구독한 영상</a>
      </Menu.Item>

      {/* <SubMenu title={<span>Blogs</span>}>
      <MenuItemGroup title="Item 1">
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
      </MenuItemGroup>
      <MenuItemGroup title="Item 2">
        <Menu.Item key="setting:3">Option 3</Menu.Item>
        <Menu.Item key="setting:4">Option 4</Menu.Item>
      </MenuItemGroup>
    </SubMenu> */}
    </Menu>
  )
}

export default LeftMenu