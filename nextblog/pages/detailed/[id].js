import Head from "next/head";
import { Row,Col,Breadcrumb,Affix } from "antd";
import Header from "../../components/Header"
import Footer from '../../components/Footer'
import servicePath from "../../config/apiUrl";
import 'markdown-navbar/dist/navbar.css'
import {
    CalendarOutlined,
    FolderAddOutlined,
    FireOutlined
  
  } from '@ant-design/icons';
import style from "../../styles/page/detailed.module.css"  
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import Tocify from '../../components/tocify.tsx'

export default function Home(props) {
  const {blogInfo} = props;
  const renderer = new marked.Renderer();
  const tocify = new Tocify()
  renderer.heading = function(text, level, raw) {
      console.log(text,level)
        const anchor = tocify.add(text, level);
        return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
      };
marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
  }); 

    let html = marked(blogInfo.content) 
  return (
    <>
      <Head>
        <title>课程详情</title>
      </Head>
      <Header></Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left"  xs={24} sm={24} md={16} lg={18} xl={14} >
          <div>
            <div className={style.breaddiv}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <a href="/">首页</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        视频列表
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{blogInfo.title}</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div>
                <div className={style.detailedtitle}>
                    {blogInfo.title}
                </div>

                <div className={style.center+' list-icon'}>
                  <span><CalendarOutlined /> {blogInfo.addTime}</span>
                  <span><FolderAddOutlined/> 视频教程</span>
                  <span><FireOutlined /> {blogInfo.view_count}人</span>
                </div>

                <div className={style.detailedcontent} dangerouslySetInnerHTML = {{__html: html}}>
                </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
                <div className={style.navtitle}>文章目录</div>
                {tocify && tocify.render()}
            </div>
          </Affix>
        </Col>
      </Row>
      <Row>
        <Footer></Footer>
      </Row>
    </>
  )
}
export async function getStaticProps(context){
  const { params } = context;
  console.log(params)
  const data = await (await axios.get(servicePath.getArticleById+params.id)).data.data[0];
  return {
    props:{
        blogInfo:data
    }
  }
} 
export async function getStaticPaths(context){
    const data = await axios.get(servicePath.getArticleList);
    const paths = data.data.data.map(item=>{
        return {
            params:{
                id:''+item.id
            }
        }
    })
    console.log(paths)
    return {
        paths:paths,
        fallback:true,
    }
}
