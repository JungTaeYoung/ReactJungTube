import React, { useEffect } from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {

  return (
    
    <Menu mode={props.mode} style={{ backgroundColor: 'transparent' }}>
      <Menu.Item key="mail">
        <a href="/videos">모든 영상</a>
      </Menu.Item>
      <Menu.Item key="mail2">
        <a href="/subscription">구독한 영상</a>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu