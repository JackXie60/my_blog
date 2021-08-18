import React from 'react'
import Head from 'next/head'
import {Row, Col,Breadcrumb,Affix} from 'antd'
import Header from '../../components/Header'
import Author from '../../components/Avatar'
import Footer from '../../components/Footer'
import Advert from '../../components/Advert'
import {
    CalendarOutlined,
    FolderAddOutlined,
    FireOutlined
  
  } from '@ant-design/icons';
import style from '../../styles/page/detailed.module.css'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/github.css' 
import Tocify from '../../components/Tocify.tsx'
import servicePath from '../../config/apiUrl'
import { useRouter } from 'next/router'

export default function Detailed(props){
    const router = useRouter()
    if (router.isFallback) {
        console.log(1)
        return <div>Loading...</div>
      }
      console.log(2)
    const {blogInfo} = props;
    const renderer = new marked.Renderer();
    const tocify = new Tocify();
    renderer.heading = function(text,level,raw){
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
    }
    marked.setOptions({
        renderer,
        gfm:true,
        pedantic:false,
        tables:true,
        breaks:false,
        smartLists:true,
        smartypants:false,
        highlight:function(code){
            return hljs.highlightAuto(code).value;
        }
    })
    const html = marked(blogInfo.context);
    return (
        <>
        <Head>
          <title>博客详情</title>
        </Head>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
                <div className={style.breaddiv}>
                    <Breadcrumb>
                      <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                      <Breadcrumb.Item>博文列表</Breadcrumb.Item>
                      <Breadcrumb.Item>{blogInfo.title}</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div>
                    <div className={style.breadtitle}>
                        { blogInfo.title }
                    </div>
                    <div className={style.center + ' listicon'}>
                        <span><CalendarOutlined/>{blogInfo.addTime}</span>
                        <span><FolderAddOutlined/>{blogInfo.typeName}</span>
                        <span><FireOutlined/>{blogInfo.view_count}</span>
                    </div>
                    <div className={style.detailedcontent}  dangerouslySetInnerHTML = {{__html: html}}>
                    </div>
                </div>
            </div>
          </Col>
    
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
              <Author/>
              <Advert/>
             <Affix offsetTop={5}>
                <div className="detailed-nav comm-box">
                    <div className="nav-title">文章目录</div>
                    {tocify && tocify.render()}
                </div>
             </Affix>
          </Col>
        </Row>
        <Footer/>
    
     </>
    )
}

export async function getStaticProps(context) {
  let result = '';
  try{
    const {params} = context;
    result = await (await axios.get(servicePath.getArticleById+params.id)).data.data[0];
  }catch{
      result = '找不到id'
  }
  return {
      props:{
          blogInfo:result
      },
      revalidate:10,
  }
}

export async function getStaticPaths(context) {
    const result = await axios.get(servicePath.getArticleList);
    const paths = result.data.data.map(item=>{
        return {
            params:{
                id:''+item.id,
            }
        }
    })
    return {
        paths:paths,
        fallback:true,
    }
}