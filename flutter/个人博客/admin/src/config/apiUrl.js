const inpUrl = 'http://localhost:7002/admin/';

const servicePath = {
    checkLogin:inpUrl + 'login/' ,
    getTypeInfo: inpUrl + 'getTypeInfo/',
    addArticle: inpUrl + 'addArticle/',
    updateArticle: inpUrl + 'updateArticle' ,
    getArticleList: inpUrl + 'getArticleList' ,  //  文章列表 
    deleteArticle: inpUrl + 'deleteArticle/' ,  //  删除文章
    getArticleById:inpUrl + 'getArticleById/' ,  //  根据ID获得文章详情
}

export default servicePath;