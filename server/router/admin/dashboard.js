const router = require('@koa/router')(); // 直接实例化router对象

router.get('/dashboard', async (ctx, next) => {
  // await ctx.render('/home/index', { // koa-views 方法
  //   title: `控制面板首页`
  // })
  ctx.body = '控制面板首页'
});

router.get('/test', async (ctx, next) => {
  // await ctx.render('/home/index', { // koa-views 方法
  //   title: `控制面板首页`
  // })
  ctx.body = 'test'
});


module.exports = router;