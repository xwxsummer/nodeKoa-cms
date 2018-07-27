/**
 * Created by Administrator on 2018/3/20 0020.
 */

/*轮播图的增加修改删除*/


var DB=require('../../module/db.js');
var md5=require('md5');
var sd = require('silly-datetime');

/**验证码模块*/
var svgCaptcha = require('svg-captcha');

//
//console.log(md5('123456'));
var router=require('koa-router')();

router.get('/',async (ctx)=>{
    await  ctx.render('admin/login');
})


router.post('/doLogin', async (ctx)=>{

    //console.log(ctx.request.body);

    var username=ctx.request.body.username;

    var password=ctx.request.body.password;

    var code = ctx.request.body.captcha;

    if (code==ctx.session.code){
    //验证用户名和密码是否合法
    var result=await DB.find('user',{"userName":username,"passWord":password});

    if(result.length>0){
        //console.log(result);
        ctx.session.userInfo = result[0];

        var id = DB.getObjectId(result[0]._id)
        DB.update('user', { "_id": id }, { last_time: sd.format(new Date(), 'YYYY-MM-DD HH:mm')});


       

        ctx.redirect(ctx.state.__ROOT__+'/admin');
    }else{
        //console.log("失败")
        ctx.body="<script>alert('用户名或密码错误');location.href='/admin/login'</script>";
    }
    }else{
        //console.log("验证码错误")
        ctx.body = "<script>alert('验证码错误');location.href='/admin/login'</script>"
    }

})


router.get('/code', async (ctx)=>{


    //const captcha = svgCaptcha.create({ size:6,fontSize: 50, width: 100,height:40,background:"#cc9966" });

    const captcha = svgCaptcha.create({ size:4,fontSize: 50, width: 120,height:34,background:"#cc9966" });

    //console.log(captcha.text.toLocaleLowerCase());

    ctx.session.code=captcha.text.toLocaleLowerCase();

    //设置响应头svg格式
    ctx.response.type = 'image/svg+xml';

    ctx.body=captcha.data;

});

router.get('/loginOut', async (ctx) => {
    ctx.session.userInfo = null;
    await ctx.render('admin/login');
})


module.exports=router.routes();
