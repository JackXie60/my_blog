import { Avatar,Divider } from "antd";
import style from '../styles/components/avatar.module.css'
import {GithubOutlined,QqOutlined,WechatOutlined} from "@ant-design/icons"

export default function Author(){
    return (
        <div className={style.authordiv+' comm-right'}>
            <div>
                <Avatar size={100} src="https://img1.baidu.com/it/u=3254254623,2492769581&fm=26&fmt=auto&gp=0.jpg"></Avatar>
            </div>
            <div className={style.authorintroduction}>
                    萌新程序员，喜欢web和前端开发，希望未来能够成为优秀的程序员
                <Divider style={{fontWeight:'bold'}}>社交账号</Divider>
                <div style={{display:'flex',justifyContent:"space-around"}}>
                <div  style={{display:'flex',flexDirection:'column',color:'black'}}>
                    <Avatar size={28} icon={<GithubOutlined />} className={style.account}/>
                    github
                </div>
                <div  style={{display:'flex',flexDirection:'column',color:'black'}}>
                    <Avatar size={28} icon={<QqOutlined />}  className={style.account} />
                    qq
                </div>
                <div  style={{display:'flex',flexDirection:'column',color:'black'}}>
                <Avatar size={28} icon={<WechatOutlined />}  className={style.account}  />
                    weixin
                </div>
                </div> 
            </div>
        </div>
    )
}