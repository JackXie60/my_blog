let ipUrl = 'http://127.0.0.1:7001/admin/' 

let servicePath = {
    updateArticle:ipUrl + 'updateArticle' ,  //  修改文章第api地址
    addArticle:ipUrl + 'addArticle' ,
    checkLogin:ipUrl + 'checkOpenId' , 
    getTypeInfo:ipUrl + 'getTypeInfo' ,  //  获得文章类别信息
}
export default servicePath;