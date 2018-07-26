/**
 * Created by Administrator on 2018/3/20 0020.
 */

/*轮播图的增加修改删除*/


var DB=require('../../module/db.js');
var md5=require('md5');

/**验证码模块*/
var svgCaptcha = require('svg-captcha');

//
//console.log(md5('123456'));
var router=require('koa-router')();

router.get('/',async (ctx)=>{
    await  ctx.render('admin/login');
})


router.post('/doLogin', async (ctx)=>{

    console.log(ctx.request.body);

    var username=ctx.request.body.username;

    var password=ctx.request.body.password;

    var captcha = ctx.request.body.captcha;

    //验证用户名和密码是否合法
    var result=await DB.find('user',{"userName":username,"passWord":password});

    if(result){
        console.log(result);
        ctx.session.userInfo = result[0];
        ctx.redirect(ctx.state.__ROOT__+'/admin');
    }else{
        console.log("失败")
        ctx.body="<script>alert('登录失败');location.href='/admin/login'</script>";
    }

})


router.get('/code', async (ctx)=>{


    //const captcha = svgCaptcha.create({ size:6,fontSize: 50, width: 100,height:40,background:"#cc9966" });

    const captcha = svgCaptcha.create({ size:4,fontSize: 50, width: 120,height:34,background:"#cc9966" });

    //console.log(captcha.text);

    ctx.session.code=captcha.text;

    //设置响应头svg格式
    ctx.response.type = 'image/svg+xml';

    ctx.body=captcha.data;

});
module.exports=router.routes();
