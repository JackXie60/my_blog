import React,{useState} from 'react';
import { Card, Input,Button ,Spin,message } from 'antd';
import {
    UserAddOutlined,
    KeyOutlined
  } from '@ant-design/icons';
import '../style/Login.css'
import axios from 'axios'
import servicePath from '../config/apiUrl';

function Login(props){
    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = function (){
        setIsLoading(true)
        if(!userName){
            message.error('用户名不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },300)
            return false
        }else if(!password){
            message.error('密码不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },300)
            return false
        }
        let dataProps = {
            userName,
            password,
        }
        axios({
            method:'post',
            url:servicePath.checkLogin,
            data:dataProps,
        }).then(res=>{
            setIsLoading(false)
            if(res.data.data==='登录成功'){
                localStorage.setItem('openId',res.data.openId)
                props.history.push('/index')
            }else{
                message.error('用户名密码错误')
            }
        })
    }
   
    return (
        <div className="login-div">

            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="JSPang Blog  System" bordered={true} style={{ width: 400 }} >
                    <Input
                        id="userName"
                        size="large"
                        placeholder="Enter your userName"
                        prefix={<UserAddOutlined />} 
                        onChange={(e)=>{setUserName(e.target.value)}}
                    /> 
                    <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="Enter your password"
                        prefix={<KeyOutlined />} 
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />     
                    <br/><br/>

                    <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
                </Card>
            </Spin>
        </div>
    )
}
export default Login