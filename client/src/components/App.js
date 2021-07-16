import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage";
import VideoPage from "./views/VideoPage/VideoPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage.js"
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage.js"
import MyPage from "./views/MyPage/MyPage.js"
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage"
import CustomRoute from "./custom-route";
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd'
import { UserOutlined, LaptopOutlined, NotificationOutlined, HomeFilled } from '@ant-design/icons';


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

/*
* CustomRoute 레이아웃 유무
* parem layout
* 사용 layout={true}
* 사용안함 layout={false}
*/

function App() {

  return (
    <Switch>
              <CustomRoute exact path="/" component={Auth(LandingPage, null)} layout={false} />
              <CustomRoute exact path="/videos" component={Auth(VideoPage, null)} />
              <CustomRoute exact path="/login" component={Auth(LoginPage, false)} />
              <CustomRoute exact path="/register" component={Auth(RegisterPage, false)} />
              <CustomRoute exact path="/video/upload" component={Auth(VideoUploadPage, true)} />
              <CustomRoute exact path="/mypage" component={Auth(MyPage, true)} />
              <CustomRoute exact path="/video/:videoId" component={Auth(VideoDetailPage, null)} />
              <CustomRoute exact path="/subscription" component={Auth(SubscriptionPage, null)} />
    </Switch>
  );
}

export default App;
