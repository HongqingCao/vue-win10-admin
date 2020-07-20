<p align="center">
<img src="./win10.png" alt="mark text" width="414" height="733">
</p>

<h3 align="center">用Vue+KOA2构建window10风格的管理系统</h3>

<p align="center">
  <a href="">
    更新日志
  </a>
  <span> | </span>
  <a>
    中文
  </a>
</p>

> 用Vue+KOA2构建window10风格的管理系统,前后端高度集成

## 更新日志

 | 序号 |功能 |功能   | 描述 |
| --- | --- |--- | --- |
|0| 前端系统功能 |开发中|仪表盘工作台、分析页面、主题设置|
|1| 前端系统UI |已完成|win10风格桌面系统：仿开始菜单、快捷菜单、任务栏、消息、支持窗口大小拖动（有小bug待修复）|
|2| 前端功能 |已完成|(1)登录、动态菜单和权限生成<br>(2)系统设置：权限设置、角色设置、用户设置、系统日志<br>(3)平台管理：桌面背景设置|
|3|后端|已完成|跨域解决、token 统一拦截、权限拦截、路由合并、基本完成相关功能的API开发|

## 贡献
 有兴趣的同学可以切一个分支（以您的github账号命名分支），发起 pull request 

## window10风格的管理系统

- 这可能是目前唯一一个较为完整windows10风格的开源前后端集成的管理系统
- **前端** Vue + Vuex + Vue-Router + Element+UI
- **后端** Node + koa2 + Sequelize
- **数据库** mysql

![](https://user-gold-cdn.xitu.io/2020/7/17/1735a8bd6cc357f2?w=1502&h=993&f=gif&s=2547685)

## 构建和设置

#### （0）项目初始化
> **开发环境:** 安装 `node` + `mysql`,项目框架是由`vue-cli` 构建的  
> **编译器:**  `Visual Studio Code`(个人习惯,其他也可)  
> **数据库可视化工具:** `Navicat for MySQL`(个人习惯,其他也可)  
> **接口调试工具:** `Postman`(个人习惯,其他也可)  

#### （1）项目目录
```bash
├── public                     // 项目前端html模板
├── server                     // 服务端源代码
│   ├── config                 // 服务端基础配置
│   │    ├── config.js         // 数据库信息配置和密钥
│   │    ├── db.js             // 配置Sequelize的数据库链接
│   ├── controllers            // 控制器
│   ├── module                 // 数据表模型
│   ├── routes                 // 服务端路由
│   ├── utils                  // 服务端封装的基础工具
│   ├── validate               // 服务端请求参数校验文件
│   ├── app.js                 // 服务端启动文件
├── src                        // 前端源代码
│   ├── api                    // 前端所有请求
│   ├── assets                 // 前端主题 字体等静态资源
│   ├── components             // 前端全局公用组件
│   ├── dictionary             // 前端字典
│   ├── filtres                // 前端全局 filter
│   ├── layout                 // 前端基础公共布局
│   ├── mock                   // 前端项目mock 模拟数据
│   ├── router                 // 前端路由
│   ├── store                  // 前端全局 store管理
│   ├── styles                 // 前端全局样式和字体图标
│   ├── utils                  // 前端全局公用方法
│   ├── views                  // 前端view
│   ├── App.vue                // 入口页面
│   ├── main.js                // 入口 加载组件 初始化等
│   ├── permission.js          // 权限管理
│   └── settings.js            // 基础设置
├── .env.development           // 开发环境全局变量配置
├── .env.prod                  // 生产环境全局变量配置
├── .env.test                  // 测试环境全局变量配置
├── babel.config.js            // babel 配置项
├── package.json               // package.json
├── .gitignore                 // git 忽略项
└── vue.config.js              // vue配置文件
```
#### （2）项目运行介绍
我们看到 `package.json`文件
```
  "scripts": {
    "dev": "vue-cli-service serve",
    "server": "nodemon server/app",
    "start": "concurrently -k \"npm run server\" \"npm run dev\"",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
```
> dev 是启动前端项目，方便单独开发前端  
> server 是启动服务端，方便单独开发服务端  
> start 是同时启动服务端和前端服务 

**值得一提是这里用了同时启动服务端和前端服务的方案**  
用`concurrently`插件，这样可以让`npm script命令`同时开启多个监听服务，而且如果一个进程服务失败，其他进程服务仍然继续运行，甚至不会注意到其中的区别，赞~

#### （3）项目启动
> 步骤一  

创建一个空的`mysql`数据库（如：db_win），可以直接导入创建数据库和数据, 在'server/mysql/db_win.sql'  

>步骤二  

在`server/config/config.js`修改相关数据库配置，**PS:如果你是直接导入的数据库和数据可以直接忽略步骤三、四**

```
const config = {
  // 启动端口
  port: 3000,
  //秘钥
  secret:'win10',
  // 数据库配置
  database: {
    dbName: 'db_win',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456@cao',
    timezone: '+08:00'
  }
}

module.exports = config
```
> 超级管理员  

账号：root, 密码:root (ps 数据库表里存的密码是MD5加密) 


接下来就可以愉快的玩耍了~


## 项目拓展  

> 1、 添加新页面    

现在⽂件 src/router/asyncRoutes.js 中按照其他路由的格式添加新的⻚⾯，添加完成后在使⽤管理员账号在系统设置-权限设置中新增权限，菜单的路径与上述⽂件配置中的name字段对应，必须保持⼀致

> 2、 添加新功能  

功能是依附于菜单的，需要先配置系统设置-权限设置 才能在菜单下⾯挂功能接⼝

> 3、 添加或者更新新数据库表   
 
在server/model 里对应添加数据库模型，根据模型自动创建表，只需要建完模型后，把server/config/db.js 里把下面这段代码放开，运行 npm run server或者npm run start ,看到 init db ok，说明数据库表更新完~

```
// sequelize
//   .sync({alter: true} )
//   .then(() => {
//     console.log('init db ok')
//   })
//   .catch(err => {
//     console.log('init db error', err)
//   })
```
> 3、 添加功能接口  

## License

[MIT](http://opensource.org/licenses/MIT)
