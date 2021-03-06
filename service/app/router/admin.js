
module.exports = app =>{
    const {router,controller} = app;
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index',adminauth,controller.admin.main.index)
    router.post('/admin/checkOpenId',controller.admin.main.checkLogin)
    router.get('/admin/getTypeInfo',controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle',adminauth,controller.admin.main.addArticle)
    router.post('/admin/updateArticle',adminauth,controller.admin.main.updateArticle)
}
