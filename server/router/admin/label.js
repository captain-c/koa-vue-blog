const router = require('@koa/router')(); // 直接实例化router对象

router.get('/', async (ctx, next) => {
  // await ctx.render('/home/index', { // koa-views 方法
  //   title: `控制面板首页`
  // })
  ctx.body = '标签页'
});


module.exports = router;