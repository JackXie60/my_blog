'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    const result = await this.service.default.home.getBlogContent();
    this.ctx.body = result;
  }
  async getArticleList() {
    const result = await this.service.default.home.getArticleList();
    this.ctx.body = {
      data: result,
    };
  }
  async getArticleById() {
    const result = await this.service.default.home.getArticleById();
    this.ctx.body = {
      data: result,
    };
  }
  async getTypeInfo() {
    const result = await this.service.default.home.getTypeInfo();
    this.ctx.body = {
      data: result,
    };
  }
  async getListById() {
    const result = await this.service.default.home.getListById();
    this.ctx.body = {
      data: result,
    };
  }
}
module.exports = HomeController;

