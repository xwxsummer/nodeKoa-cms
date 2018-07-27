/**
 * Created by Administrator on 2018/3/20 0020.
 */

/*管理员的增加修改删除*/

var router = require('koa-router')();

router.get('/', async (ctx) => {

    ctx.render('admin/manage/list');

})

router.get('/add', async (ctx) => {

    await ctx.render('admin/manage/add');

})


router.get('/edit', async (ctx) => {

    await ctx.render('admin/manage/edit');

})
router.get('/delete', async (ctx) => {

    ctx.body = '删除用户';

})

module.exports = router.routes();