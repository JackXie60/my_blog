import {Row,Col,Menu} from "antd"
import {YoutubeOutlined,SmileOutlined,HomeOutlined,MessageOutlined} from "@ant-design/icons"
import style from '../styles/components/header.module.css'
import servicePath from "../config/apiUrl"
import { useState,useEffect} from "react"
import axios from "axios"
import Router from 'next/router'
const IconMap = {
    'youtube':<YoutubeOutlined/>,
    'smile':<SmileOutlined/>,
    'message':<MessageOutlined />
}
export default function Header(){
    const [navArray , setNavArray] = useState([])
    useEffect(()=>{
      const fetchData = async ()=>{
        const result= await axios(servicePath.getTypeInfo).then(
          (res)=>{
              setNavArray(res.data.data)
              return res.data.data
          }
        )
        setNavArray(result)
      }
      fetchData();
    },[])
    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/')
        }else{
            Router.push('/list/'+e.key)
        }
    }
    return (
        <div className={style.header}>
            <Row type="flex" justify="center">
                <Col  xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className={style.headerLogo}>个人博客</span>
                    {/* <span className={style.headerTxt}>兴趣是最好的老师，学习是第一生产力</span> */}
                </Col>
                <Col className="menuDiv" xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined/>
                            首页
                        </Menu.Item>
                        {
                            navArray.map((item)=>{
                                return(
                                    <Menu.Item key={item.id}>
                                        {IconMap[item.icon]}
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            }) 
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}