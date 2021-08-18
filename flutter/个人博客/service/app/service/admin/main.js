'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class MainService extends Service {
  async checkLogin() {
    console.log(999);
    const username = this.ctx.request.body.username;
    const password = this.ctx.request.body.password;
    const md5 = crypto.createHash('md5');
    const passwordWithCrypto = md5.update(password).digest('hex');
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + username +
    "' AND password = '" + passwordWithCrypto + "'";
    const result = await this.app.mysql.query(sql);
    if (result.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = {
        openid: openId,
      };
      return {
        data: '登录成功',
        openId,
      };
    }
    return {
      data: '登录失败',
    };
  }
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    return resType;
  }
  // 添加文章
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    try {
      const result = await this.app.mysql.insert('article', tmpArticle);
      const insertSuccess = result.affectedRows === 1;
      const insertId = result.insertId;
      return {
        isScuccess: insertSuccess,
        insertId,
      };
    } catch (err) {
      return {
        err: err.message,
      };
    }
  }
  // 修改文章
  async updateArticle() {
    const tmpArticle = this.ctx.request.body;
    try {
      const result = await this.app.mysql.update('article', tmpArticle);
      const insertSuccess = result.affectedRows === 1;
      return {
        isScuccess: insertSuccess,
      };
    } catch (err) {
      return {
        err: err.message,
      };
    }
  }
  // 获取文章列表
  async getArticleList() {
    const sql = 'SELECT article.id as id,' +
                'article.title as title,' +
                'article.introduce as introduce,' +
                'article.view_count as view_count,' +
                "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
                'type.typeName as typeName ' +
                'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
                'ORDER BY article.id DESC ';

    const resList = await this.app.mysql.query(sql);
    return resList;
  }
  // 删除文章
  async deleteArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    return res;
  }
  // 根据id获取文章
  async getArticleById() {
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
    'article.title as title,' +
    'article.introduce as introduce,' +
    'article.article_content as article_content,' +
    "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
    'article.view_count as view_count ,' +
    'type.typeName as typeName ,' +
    'type.id as typeId ' +
    'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    'WHERE article.id=' + id;
    const result = await this.app.mysql.query(sql);
    return result;
  }
}
module.exports = MainService;

