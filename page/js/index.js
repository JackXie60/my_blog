const everyDay = new Vue({
    el:"#every-day",
    data: {
        content:"every day is fine,every day is happy"
    },
    created () {
        //请求得到content
    }
})
const blogList = new Vue({
    el:"#article-list",
    data:{
        articleList:[
            {
                id:"1",
                title:"DNS域名解析",
                content:`DNS是一个域名系统，它提供了将主机名和域名转换为ip地址的服务，因为网络通讯大部分都是基于TCP/IP，计算机在网络通讯中只能识别IP而不能识别域名.浏览器中输入url地址
                浏览器查看自身缓存有没有与之对应的缓存，有就返回对应的ip地址，没有进行下一步
                查看计算机本地的host文件有没有相关的记录，host文件保存了域名和ip地址的映射，没有进行下一步`,
                publishTime:"2018-10-30",
                scanNum:372,
                tags:["DNS域名解析"]
            },
            {
                id:"2",
                title:"DNS域名解析",
                content:`DNS是一个域名系统，它提供了将主机名和域名转换为ip地址的服务，因为网络通讯大部分都是基于TCP/IP，计算机在网络通讯中只能识别IP而不能识别域名.浏览器中输入url地址
                浏览器查看自身缓存有没有与之对应的缓存，有就返回对应的ip地址，没有进行下一步
                查看计算机本地的host文件有没有相关的记录，host文件保存了域名和ip地址的映射，没有进行下一步`,
                publishTime:"2018-10-30",
                scanNum:372,
                tags:["DNS域名解析"],
                link:""
            },
            {
                id:"3",
                title:"DNS域名解析",
                content:`DNS是一个域名系统，它提供了将主机名和域名转换为ip地址的服务，因为网络通讯大部分都是基于TCP/IP，计算机在网络通讯中只能识别IP而不能识别域名.浏览器中输入url地址
                浏览器查看自身缓存有没有与之对应的缓存，有就返回对应的ip地址，没有进行下一步
                查看计算机本地的host文件有没有相关的记录，host文件保存了域名和ip地址的映射，没有进行下一步`,
                publishTime:"2018-10-30",
                scanNum:372,
                tags:["DNS域名解析"],
                link:""
            },
            {
                id:"4",
                title:"DNS域名解析",
                content:`DNS是一个域名系统，它提供了将主机名和域名转换为ip地址的服务，因为网络通讯大部分都是基于TCP/IP，计算机在网络通讯中只能识别IP而不能识别域名.浏览器中输入url地址
                浏览器查看自身缓存有没有与之对应的缓存，有就返回对应的ip地址，没有进行下一步
                查看计算机本地的host文件有没有相关的记录，host文件保存了域名和ip地址的映射，没有进行下一步`,
                publishTime:"2018-10-30",
                scanNum:372,
                tags:["DNS域名解析"],
                link:""
            }
        ]
    }
})
const colors = [
    "#31708f",
    "#ff8000",
    "#800040",
    "#ff00ff",
    "#008000",
    "#0080ff"
]
const blogroll = new Vue({
    el:"#random-tags",
    data:{
        randomtags:[
            "vue",
            "webpack",
            "react",
            "jquery",
            "bootstrap",
            "mysql",
            "nodejs",
            "typescript",
            "移动端开发",
            "架构思维",
            "计算机网络",
            "fultter",
            "ssr",
            "操作系统",
            "计算机组成原理",
            "vue",
            "webpack",
            "react",
            "jquery",
            "bootstrap",
            "mysql",
            "nodejs",
            "typescript",
            "移动端开发",
            "架构思维",
            "计算机网络",
            "fultter",
            "ssr",
            "操作系统",
            "计算机组成原理"
        ]
    },
    computed: {

    },
    created () {
        //获取tags
        this.randomtags = this.randomtags.map(item=>{
            const fontsize = 10 + Math.floor(Math.random()*15);
            const color = Math.floor(Math.random()*colors.length);
            return {
                name:item,
                style:{
                    color:colors[color],
                    fontSize:fontsize+"px",
                }
            }
        })
        console.log(this.randomtags)
    }
})
const recentHot = new Vue({
    el:"#recent-hot",
    data:{
        hotList:[
            {title:"查看你的aws服务器已使用流浪",link:"https://lol.qq.com/main.shtml"},
            {title:"查看你的aws服务器已使用流浪",link:"http://www.baidu.com"},
            {title:"查看你的aws服务器已使用流浪",link:"http://www.baidu.com"},
            {title:"查看你的aws服务器已使用流浪",link:"http://www.baidu.com"},
            {title:"查看你的aws服务器已使用流浪",link:"http://www.baidu.com"},
            {title:"查看你的aws服务器已使用流浪",link:"http:www.baidu.com"},
            {title:"查看你的aws服务器已使用流浪",link:"http:www.baidu.com"},
            {title:"查看你的aws服务器已使用流浪",link:"http:www.baidu.com"},
            {title:"查看你的aws服务器已使用流浪",link:"http:www.baidu.com"},
            {title:"查看你的aws服务器已使用流浪",link:"http:www.baidu.com"},
            {title:"查看你的aws服务器已使用流浪",link:"http:www.baidu.com"},
        ]
    }
})
const recentComment = new Vue({
    el:"#recent-comment",
    data:{
        commentList:[
            {
                link:"https://lol.qq.com/main.shtml",
                username:"用户名称",
                date:'评论时间',
                supple:"抱歉，由于种种原因，本站不再链接至贵"
            },
            {
                link:"https://lol.qq.com/main.shtml",
                username:"用户名称",
                date:'评论时间',
                supple:"抱歉，由于种种原因，本站不再链接至贵"
            },
            {
                link:"https://lol.qq.com/main.shtml",
                username:"用户名称",
                date:'评论时间',
                supple:"抱歉，由于种种原因，本站不再链接至贵"
            },
            {
                link:"https://lol.qq.com/main.shtml",
                username:"用户名称",
                date:'评论时间',
                supple:"抱歉，由于种种原因，本站不再链接至贵"
            },
            {
                link:"https://lol.qq.com/main.shtml",
                username:"用户名称",
                date:'评论时间',
                supple:"抱歉，由于种种原因，本站不再链接至贵"
            }
        ]
    },
    created () {
        
    }
})