import Head from "next/head";
import { Row,Col,List } from "antd";
import Header from "../components/Header"
import style from "../styles/page/home.module.css"
import { useState } from "react"
import classes from "../styles/page/index.module.css"
import {
  CalendarOutlined,
  FolderAddOutlined,
  FireOutlined

} from '@ant-design/icons';
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import Link from 'next/link'
import servicePath from "../config/apiUrl";

export default function Home(props) {
  const { bolgList } = props;
  const [mylist,setMylist] = useState(bolgList);

  return (
    <>
      <Head>
        <title>HomePage</title>
      </Head>
      <Header></Header>
      <Row className={style.commmain} type="flex" justify="center">
        <Col className={style.commleft}  xs={24} sm={24} md={16} lg={18} xl={14} >
          <div>
            <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item=>(
              <List.Item>
                <div className={classes.listtitle}>
                  <Link href={{ pathname:'/detailed/'+item.id}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className={classes.listicon}>
                  <span><CalendarOutlined /> { item.addTime }</span>
                  <span><FolderAddOutlined /> 视频教程</span>
                  <span><FireOutlined/> {item.view_count}人</span>
                </div>
                <div className={classes.listcontext}>{item. content}</div>
              </List.Item>
            )}
            />
          </div>
        </Col>
        <Col className={style.commright} xs={0} sm={0} md={7} lg={5} xl={4}>
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
export async function getStaticProps(){
  const data = await (await axios.get(servicePath.getArticleList)).data.data;
  return {
    props:{
      bolgList:data
    }
  }
}
