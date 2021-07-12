import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage.js"
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage.js"
import MyPage from "./views/MyPage/MyPage.js"
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage"

import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined, HomeFilled } from '@ant-design/icons';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <Layout>
        <NavBar />
        <Sider width={200} className="site-layout-background" style={{ 
          
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          
          paddingTop: '52px', minHeight: 'calc(100vh - 80px)' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeFilled />} key="1">홈</Menu.Item>
            <SubMenu key="sub2" icon={<LaptopOutlined />} title="구독한 정튜버">
              <Menu.Item key="2">황미라</Menu.Item>
              <Menu.Item key="3">최현중</Menu.Item>
              <Menu.Item key="4">정태복</Menu.Item>
              <Menu.Item key="5">정지현</Menu.Item>
              <Menu.Item key="6">양현호</Menu.Item>
              <Menu.Item key="7">김다솜</Menu.Item>
              <Menu.Item key="8">유민호</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '52px 0px 24px', minHeight: 'calc(100vh - 80px)', marginLeft: '200px'}}>
          <Content
            className="site-layout-background"
            style={{
              padding: 0,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path="/" component={Auth(LandingPage, null)} />
              <Route exact path="/login" component={Auth(LoginPage, false)} />
              <Route exact path="/register" component={Auth(RegisterPage, false)} />
              <Route exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
              <Route exact path="/mypage" component={Auth(MyPage, true)} />
              <Route exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
              <Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
            </Switch>
          </Content>
        </Layout>
      </Layout>

      <Footer />
    </Suspense>
  );
}

export default App;
