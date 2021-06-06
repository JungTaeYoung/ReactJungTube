/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Menu, Avatar } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { auth } from '../../../../_actions/user_actions';

function RightMenu(props) {
  const user = useSelector(state => state.user)
  const [UserImage, setUserImage] = useState('')
  
  useEffect(() => {
    console.log(34523432)
    console.log(user.userData)
    if (user.userData !== undefined) {
      setUserImage(user.userData.image)
    }

  }, [user])



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
      <Menu theme={props.theme} mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <div>
        <Menu theme={props.theme} mode={props.mode} style={{ display: 'inline-block', backgroundColor: 'transparent' }}>
          <Menu.Item key="upload">
            <a href="/video/upload">Video</a>
          </Menu.Item>
          <Menu.Item key="logout">
            <a onClick={logoutHandler}>Logout</a>
          </Menu.Item>
        </Menu>
        <Avatar src={UserImage}></Avatar>
      </div>
    )
  }
}

export default withRouter(RightMenu);

