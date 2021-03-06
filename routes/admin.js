/**
 * Created by Administrator on 2018/3/20 0020.
 */
var router=require('koa-router')();

var user=require('./admin/user.js');

var focus=require('./admin/focus.js');

var newscate=require('./admin/newscate.js');

var login=require('./admin/login.js');

var manage=require('./admin/manage.js');

var url = require("url");

//配置中间件，获取url地址
//********所有的路由都要经过这个中间件********
router.use(async (ctx,next)=>{
    //模板引擎配置全局的变量
    ctx.state.__ROOT__='http://'+ctx.header.host;

    // console.log(ctx.request.url)
    var pathname = url.parse(ctx.request.url).pathname.substring(1);

    // console.log(pathname)
    var PathUrl = pathname.split('/')
    //定义全局变量 
    
    ctx.state.G = {
        url: PathUrl,
        userInfo : ctx.session.userInfo
    }
    //console.log(PathUrl);
  
    //*****判断用户权限*****
    if(ctx.session.userInfo){

        //登录继续向下匹配路由
        await next();
    }else{
        //不成功跳转到登录页面
        if (pathname == 'admin/login' || pathname == 'admin/login/doLogin' || pathname == 'admin/login/code'){
            await next();
        }else{
            ctx.redirect('/admin/login');
        }
    }
    
})

//配置admin的子路由  层级路由
router.get('/',(ctx)=>{
    ctx.render('admin/index');
})

router.use('/manage',manage)
router.use('/user',user);
router.use('/focus',focus);
router.use('/login',login);
router.use('/newscate',newscate);


module.exports=router.routes();