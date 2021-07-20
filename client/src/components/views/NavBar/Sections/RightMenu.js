/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Switch, Menu, Avatar, Dropdown } from 'antd';
import { VideoCameraFilled } from '@ant-design/icons';
import axios from 'axios';
import { theme } from '../../../../_actions/preferences_actions';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Link } from "react-router-dom";

function RightMenu(props) {
  const [isDarkMode, setIsDarkMode] = React.useState();
  const { switcher, currentTheme, status, themes } = useThemeSwitcher();
  const user = useSelector(state => state.user)


  const isDrak = useSelector(state => state.preferences.darkThemeEnabled)
  const dispatch = useDispatch();
  //To know my current status, send Auth request 


  const [UserImage, setUserImage] = useState('')



  useEffect(() => {
    console.log(user.userData)
    if (user.userData !== undefined) {
      setUserImage(user.userData.image)
    }

  }, [user])



  const toggleTheme = (isChecked) => {

    dispatch(theme())
    // console.log(useSelector(state => state.preferences.darkThemeEnabled))
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else if((user.userData && user.userData.isAuth)) {
    return (
      <>
        {/* <Switch checked={isDarkMode} onChange={toggleTheme} /> */}
        <Menu theme={props.theme} mode={props.mode}>
          <Menu.Item key="upload">
            <Link to="/video/upload"><VideoCameraFilled /> 비디오 업로드</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
        <Dropdown overlay={avatarMenu}>
          <Avatar src={UserImage}></Avatar>
        </Dropdown>
      </>
    )
  } else {
    return(
      <span>로딩중</span>
    )
  }
}

const avatarMenu = (
  <Menu>
    <Menu.Item><Link to="/mypage"></Link>내 영상</Menu.Item>
  </Menu>
)

export default withRouter(RightMenu);

