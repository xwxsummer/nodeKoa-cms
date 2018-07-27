
const Koa=require('koa'),
      router=require('koa-router')(),
      render = require('koa-art-template'),
      path=require('path'),
      static = require('koa-static'),//中间件
      koaBodyparser = require('koa-bodyparser'),
      session = require('koa-session');
var app=new Koa();//实例化

//引入子模块

var admin=require('./routes/admin.js');
var api=require('./routes/api.js');
var index=require('./routes/index.js');

//配置静态web
app.use(static(__dirname +'/public'));
//配置post的中间件
app.use(koaBodyparser());

//配置koa-art-template 模板引擎
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production',
    //扩展时间管道
    dateFormat:dataFormat = function(value){return sd.format(new Data(value),'YYY-MM-DD HH-mm')}
    //html页面{{$value.last_time|dateFormat}}管道的使用
});

//配置session

app.keys = ['some secret hurr'];//cookie的签名

const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000, //过期时间，需要设置
    overwrite: true, /** (boolean) can overwrite or not (default true)没有效果 */
    httpOnly: true, /** (boolean) httpOnly or not (default true) 表示只有服务器端可以获取签名*/
    signed: true, /** (boolean) signed or not (default true) 默认签名*/
    rolling: false, /**在每次请求时强行设置cookie, 这将重新设置过期时间(default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. 快要到期了重新连接(default is false)*/
};
app.use(session(CONFIG, app));
  
//配置路由
router.use(index);
/*
  /admin   配置子路由  层级路由
 /admin/user
 */
router.use('/admin',admin);
/*
 /api/newslist   新闻列表的api
 */
router.use('/api',api);   /*在模块里面暴露路由并且启动路由*/
//启动路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(8008);









