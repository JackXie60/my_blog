import React,{useState,useEffect} from 'react'
import Head from 'next/head'
import {Row,Col,List} from 'antd'
import style from '../styles/page/home.module.css'
import Header from '../components/Header'
import {
  CalendarOutlined,
  FolderAddOutlined,
  FireOutlined

} from '@ant-design/icons';
import Avatar from '../components/Avatar'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import Link from 'next/link'
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

export default function Home(props) {
  const { blogList } = props;
  const [mylist,setList] = useState(blogList);
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 
  return (
    <>
      <Head>
      <title>Home</title>
    </Head>
    {/* 头部区 */}
    <Header/>
    <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
              <List.Item>
                <div className={style.listtitle}>
                  <Link href={{pathname:'/detailed/'+item.id}}>
                    <a style={{color:'#ff9e1e'}}>{item.title}</a>
                  </Link>
                </div>
                <div className={style.listicon}>
                  <span><CalendarOutlined/>{item.addTime}</span>
                  <span><FolderAddOutlined/>{item.typeName}</span>
                  <span><FireOutlined/>{item.view_count}人</span>
                </div>
                <div className={style.listcontext} dangerouslySetInnerHTML={{__html:marked(item.context)}}></div>
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
export async function getStaticProps(){
  const data = await (await axios.get(servicePath.getArticleList)).data.data;
  return {
    props: {
      blogList:data,
    },
    revalidate:10,
  }
}
