import React, { useState, useEffect, Suspense, Children } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
// pages for this product

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer"
import Axios from 'axios';


import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined, HomeFilled } from '@ant-design/icons';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function LayoutIndex(props) {
  const [SubscribeInfos, setSubscribeInfos] = useState([])
  useEffect(() => {

    const subscriptionVariables = {
      userFrom: localStorage.getItem('userId')
    }

    Axios.post('/api/subscribe/subscribeInfo', subscriptionVariables)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.users)
          setSubscribeInfos(response.data.users)
        } else {
          alert('구독한 정보를 받아오지 못했습니다.')
        }
      })
  }, [])
  return (

    <Suspense fallback={(<div>Loading...</div>)}>
      <Layout>
        <NavBar />
        <Sider width={200} className="site-layout-background" style={{

          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,

          paddingTop: '52px', minHeight: 'calc(100vh - 80px)'
        }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeFilled />} key="1">홈</Menu.Item>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="구독한 정튜버">
              {
                SubscribeInfos.map((user, index) => {
                  return (
                    <Menu.Item key={index}>{user.name}</Menu.Item>
                  )
                }
                )
              }

            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '52px 0px 24px', minHeight: 'calc(100vh - 80px)', marginLeft: '200px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 0,
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>

      <Footer />
    </Suspense>
  );
}

export default withRouter(LayoutIndex);
