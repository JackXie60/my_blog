import Head from "next/head";
import Link from "next/link"
import { Row,Col,List,Breadcrumb } from "antd";
import Header from "../../components/Header"
import { useState } from "react"
import Author from '../../components/Author'
import Advert from '../../components/Advert'
import axios from 'axios'
import Footer from '../../components/Footer'
import {
    CalendarOutlined,
    FolderAddOutlined,
    FireOutlined
  
  } from '@ant-design/icons';
import servicePath from "../../config/apiUrl";
import { useEffect } from "react/cjs/react.development";

export default function Home(props) {
  const {listData} = props;
  const [mylist,setMylist] = useState(listData);
  useEffect(()=>{
    setMylist(listData)
   })
  return (
    <>
      <Head>
        <title>课程列表</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left"  xs={24} sm={24} md={16} lg={18} xl={14} >
          <div>
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">首页</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        视频列表
                    </Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <List
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
              <List.Item>
                <div className="list-title">
                  <Link href={"/detailed"+item.id}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span><CalendarOutlined /> 2019-06-28</span>
                  <span><FolderAddOutlined /> 视频教程</span>
                  <span><FireOutlined/> 5498人</span>
                </div>
                <div className="list-context">{item.context}</div>
              </List.Item>
            )}
            />
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author></Author>
          <Advert></Advert>
        </Col>
      </Row>
      <Row>
        <Footer></Footer>
      </Row>
    </>
  )
}
export async function getStaticProps(context){
  console.log(1)
  // let promise;
  // if(!context.params.listid){
  //   promise = new Promise(resolve=>{
  //     axios(servicePath.getArticleList).then(res=>{
  //       resolve(res.data.data)
  //     })
  //   })
  // }else{
  //   let id = context.params.listid;
  //   promise = new Promise(resolve=>{
  //     axios(servicePath.getListById+id).then(res=>{
  //       resolve(res.data)
  //       console.log(res.data)
  //     })
  //   })
    // console.log(promise)
  // }
  const id = context.params.listid;
  console.log(servicePath.getListById+id)
  const listData = await (await axios(servicePath.getListById+id)).data.data
  return {
    props:{
      listData:listData
    }
  }
}
export async function getStaticPaths(){
  const typeData = await (await axios(servicePath.getTypeInfo)).data.data;
  const paths = typeData.map(typeinfo=>{
    return {
      params:{
        listid:''+typeinfo.id,
      }
    }
  })
  return {
    paths,
    fallback:true,
  }
}
