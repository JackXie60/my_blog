'use strict';

const Controller = require('egg').Controller

class MainController extends Controller{

    async index(){
        //首页的文章列表数据
        this.ctx.body='hi api'
    }
    async checkLogin(){
        let username = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        const sql = " SELECT username FROM admin_user WHERE username = '"+username+
        "'AND password = '"+password+"'"
        const res = await this.app.mysql.query(sql)
        if(res.length>0){
            let openId = new Date().getTime()
            this.ctx.session.openId = {'openId':openId}
            this.ctx.body = {'data':'登录成功','openId':openId}
        }else{
            this.ctx.body = {data:'登录失败'}
        }
    }
    async getTypeInfo(){
        const resType = await this.app.mysql.select('type')
        this.ctx.body = {data:resType}
    }
    //添加文章
async addArticle(){

    let tmpArticle= this.ctx.request.body
    // tmpArticle.
    const result = await this.app.mysql.insert('article',tmpArticle)
    const insertSuccess = result.affectedRows === 1
    const insertId = result.insertId

    this.ctx.body={
        isScuccess:insertSuccess,
        insertId:insertId
    }
}
async updateArticle(){
    let tmpArticle= this.ctx.request.body

    const result = await this.app.mysql.update('article', tmpArticle);
    const updateSuccess = result.affectedRows === 1;
    console.log(updateSuccess)
    this.ctx.body={
        isScuccess:updateSuccess
    }
}  
}

module.exports = MainController