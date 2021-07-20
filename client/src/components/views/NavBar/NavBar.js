import React, { useState, useEffect } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import SearchBox from './Sections/SearchBox';
import { theme } from '../../../_actions/preferences_actions';
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Button } from 'antd';
import { AlignRightOutlined } from '@ant-design/icons';
import './Sections/Navbar.css';


function NavBar() {
  const [visible, setVisible] = useState(false)
  const user = useSelector(state => state.user)
  const isDrak = useSelector(state => state.preferences.darkThemeEnabled)
  const dispatch = useDispatch();
  useEffect(() => {
    //To know my current status, send Auth request 

  }, [])


  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%', backgroundColor: (isDrak ? '#202020' : '#fff') }}>
      <div className="menu__logo">
        <a href="/videos"><img width="30px" src="/images/logo.png" /></a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div>
        <SearchBox style={{ maxWidth: '400px' }} />

        <div className={'menu_rigth ' + (user.userData && user.userData.isAuth && 'auth')} >
          <RightMenu mode="horizontal" />
        </div>

        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <AlignRightOutlined />
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
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav >
  )
}

export default NavBar