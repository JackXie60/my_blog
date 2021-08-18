import React,{useState} from 'react'
import Head from 'next/head'
import {Row,Col,List,Breadcrumb} from 'antd'
import style from '../../styles/page/home.module.css'
import Header from '../../components/Header'
import Link from 'next/link'
import {
  CalendarOutlined,
  FolderAddOutlined,
  FireOutlined

} from '@ant-design/icons';
import Avatar from '../../components/Avatar'
import Advert from '../../components/Advert'
import Footer from '../../components/Footer'
import axios from 'axios'
import servicePath from '../../config/apiUrl'
import { useRouter } from 'next/router'


export default function ListPage(props){
    return (
      <>
        <Head>
        <title>Home</title>
      </Head>
      {/* 头部区 */}
      <Header/>
      <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  <Breadcrumb.Item>博文列表</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={props.listInfo}
              renderItem={item=>(
                <List.Item>
                  <Link href={{pathname:'/detailed/'+item.id}}>
                    <a style={{color:'#ff9e1e',fontSize:'1.5rem'}}>{item.title}</a>
                  </Link>
                  <div className={style.listicon}>
                    <span><CalendarOutlined/>{item.addTime}</span>
                    <span><FolderAddOutlined/>{item.typeName}</span>
                    <span><FireOutlined/>{item.view_count}</span>
                  </div>
                  <div className={style.listcontext}>{item.introduce}</div>
                </List.Item>
              )}
            ></List>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            {/* 头像 */}
            <Avatar/>
            {/* 广告区域 */}
            <Advert/>
          </Col>
      </Row>
      {/* 底部区 */}
      <Footer/>
      </>
    )
}
export async function getStaticProps(context){
  const id = context.params.listid;
  const result = await (await axios.get(servicePath.getListById+id));
  return {
    props:{
      listInfo:result.data.data,
    },
    revalidate:10
  }
}

export async function getStaticPaths(){
  const result = await (await axios.get(servicePath.getTypeInfo)).data.data;
  const paths = result.map(item=>{
    return {
      params:{
        listid:''+item.id,
      }
    }
  })
  return {
    fallback:false,
    paths:paths,
  }
}