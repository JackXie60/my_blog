'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    let result = await this.app.mysql.get("blogs",{})
    console.log(result)
    this.ctx.body = result
  }
  async getArticleList(){

    let id = this.ctx.params.id;
    let sql = 'SELECT article.id as id,'+
              'article.title as title,'+
              'article.introduce as introduce,'+
              'FROM_UNIXTIME(article.addTime,"%Y-%m-%d %H:%i:%s") as addTime,'+
              'article.view_count as view_count ,'+
              'article.article_content as content,'+
              'type.typeName as typeName '+
              'FROM article LEFT JOIN type ON article.type_id = type.id '
 
     const results = await this.app.mysql.query(sql)
 
     this.ctx.body={
         data:results
     }
 }
 async getArticleById(){
  let id = this.ctx.params.id;
  let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            'FROM_UNIXTIME(article.addTime,"%Y-%m-%d %H:%i:%s") as addTime,'+
            'article.view_count as view_count ,'+
            'article.article_content as content,'+
            'type.typeName as typeName '+
            'FROM article LEFT JOIN type ON article.type_id = type.id '+
            'where article.id = '+id

   const results = await this.app.mysql.query(sql)

   this.ctx.body={
       data:results
   }
}
async getListById(){
  let id = this.ctx.params.id
  let sql = 'SELECT article.id as id,'+
  'article.title as title,'+
  'article.introduce as introduce,'+
  "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime,"+
  'article.view_count as view_count ,'+
  'type.typeName as typeName '+
  'FROM article LEFT JOIN type ON article.type_id = type.Id '+
  'WHERE type_id='+id
  const result = await this.app.mysql.query(sql)
  this.ctx.body={data:result}

}
async getTypeInfo(){
  const result = await this.app.mysql.select('type')
  this.ctx.body = {data:result}
}
}
module.exports = HomeController;
