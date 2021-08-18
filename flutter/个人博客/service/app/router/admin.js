'use strict';
module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth(app.config.jwt);
  router.get('/admin/index', adminauth, controller.admin.main.index);
  router.post('/admin/login', controller.admin.main.login);
  router.get('/admin/getTypeInfo', adminauth, controller.admin.main.getTypeInfo);
  router.post('/admin/addArticle', adminauth, controller.admin.main.insertArticle);
  router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle);
  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
  router.delete('/admin/deleteArticle/:id', adminauth, controller.admin.main.deleteArticle);
  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
};

