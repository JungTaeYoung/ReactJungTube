import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';

function NavBar() {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/"><img width="50px" src="/images/logo.png" /></a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" theme='dark' />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" theme='dark' />
        </div>

        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
        <Drawer
          title="메뉴"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
          // bodyStyle={{ backgroundColor: "#001529", padding: "0" }}
          // headerStyle={{ backgroundColor: "#001529", padding: "0" }}
          drawerStyle={{ backgroundColor: "#001529", padding: "0" }}
        >
          <LeftMenu mode="inline" theme='dark' />
          <RightMenu mode="inline" theme='dark' />
        </Drawer>
      </div>
    </nav>
  )
}

export default NavBar