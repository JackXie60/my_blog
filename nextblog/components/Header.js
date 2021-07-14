import {Row,Col,Menu} from "antd"
import {YoutubeOutlined,SmileOutlined,HomeOutlined} from "@ant-design/icons"
import style from "../styles/components/header.module.css"
import {useState,useEffect,useRouter} from 'react'
import servicePath from "../config/apiUrl"
import Router from 'next/router'
import axios from 'axios'

export default function Header(){
    const [navArray,setNavArray] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            axios(servicePath.getTypeInfo).then(async (res)=>{
                setNavArray(res.data.data);
                console.log(navArray)
            })
        }
        fetchData();
    },[])
    const handleClick = (e)=>{
        console.log(e)
        if(e.key==0){
            Router.push('/index')
        }else{
            Router.push('/list/'+e.key)
        }
  
  
    }
    return (
        <div className={style.header}>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className={style.headerlogo}>技术宅</span>
                    <span className={style.headertxt}>专注学习，持续输出</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <HomeOutlined />
                            首页
                        </Menu.Item>
                        {
                            navArray.map((item)=>{
                            return(
                                <Menu.Item key={item.id}>
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