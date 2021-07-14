import {Avatar,Divider} from "antd"
import style from "../styles/components/avator.module.css"
import {GithubOutlined,QqOutlined,WechatOutlined} from "@ant-design/icons"
export default function Author(){
    return (
        <div className={style.authordiv+' comm-box'}>
            <div>
                <Avatar size={100} src="https://img2.baidu.com/it/u=3151541238,1216732425&fm=26&fmt=auto&gp=0.jpg"></Avatar>
            </div>
            <div className={style.authorintroduction}>
                <Divider>社交账号</Divider>
                <Avatar size={28} icon={<GithubOutlined />} className={style.account}  />
                <Avatar size={28} icon={<QqOutlined />}  className={style.account} />
                <Avatar size={28} icon={<WechatOutlined />} className={style.account}  />
            </div>
        </div>
    )
}