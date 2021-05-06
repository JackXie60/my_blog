const express = require("express")
const path = require("path")
const app = express();
app.use(express.static(path.join(__dirname,'./page/')))
app.listen(12126,function(){
    console.log("正在监听12126端口")
})