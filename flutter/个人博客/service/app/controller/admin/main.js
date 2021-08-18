'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi cnm';
  }
  async login() {
    console.log('登录请求来了');
    const result = await this.service.admin.main.checkLogin();
    this.ctx.body = result;
  }
  async getTypeInfo() {
    const result = await this.service.admin.main.getTypeInfo();
    this.ctx.body = {
      data: result,
    };
  }
  async insertArticle() {
    const result = await this.service.admin.main.addArticle();
    if (result.err) {
      this.ctx.status = 500;
      this.ctx.body = {
        err: result.err,
      };
    }
    this.ctx.body = result;
    console.log(result);
  }

  async updateArticle() {
    const result = await this.service.admin.main.updateArticle();
    if (result.err) {
      this.ctx.status = 500;
      this.ctx.body = {
        err: result.err,
      };
    }
    this.ctx.body = result;
    console.log(result);
  }
  async getArticleList() {
    const result = await this.service.admin.main.getArticleList();
    this.ctx.body = result;
  }
  async deleteArticle() {
    const result = await this.service.admin.main.deleteArticle();
    this.ctx.body = {
      data: result,
    };
  }
  async getArticleById() {
    const result = await this.service.admin.main.getArticleById();
    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = MainController;
