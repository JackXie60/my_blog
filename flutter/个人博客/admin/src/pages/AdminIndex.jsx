import { Layout, Menu, Breadcrumb } from "antd";
import React, { ReactDOM, useState,useEffect } from "react";
import ArticleList from "./ArticleList";
import "../static/css/AdminIndex.css";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import { AddArticle } from './AddArticle';
const { Header, Content, Footer, Sider,Affix } = Layout;
const { SubMenu } = Menu;

export default function SiderDemo(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [nowPage,setNowPage] = useState('');
  const [defaultSubMenu,setDefaultSubMenu] = useState([])
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const handleClickArticle = e=>{
    console.log(e.item.props)
    if(e.key==='addArticle'){
      props.history.push('/index')
      setNowPage('添加文章');
    }else{
      props.history.push('/articleList')
      setNowPage('文章列表');
    }

  }
  const getSelectedKeys = ()=>{
    if(props.location.pathname.startsWith('/index')){
      return ['addArticle']
    }else if(props.location.pathname==='/articleList'){
      return ['articleList']
    }
  }
  const isOpen = ()=>{
    if(props.location.pathname.startsWith('/index')||props.location.pathname==='/articleList'){
      return ['sub1'];
    }else{
      return []
    }
  }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={getSelectedKeys()} mode="inline" defaultOpenKeys={isOpen()}>
          <SubMenu
            key="sub1"
            onClick={handleClickArticle}
            title={
              <span>
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>文章管理</Breadcrumb.Item>
            <Breadcrumb.Item>{nowPage}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            <Route path="/index/" exact  component={AddArticle} />
            <Route path="/index/:id" exact component={AddArticle}/>
            <Route path="/articleList" exact component={ArticleList}/>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          @Jackxie
        </Footer>
      </Layout>
    </Layout>
  );
}
