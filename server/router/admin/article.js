const router = require('@koa/router')(); // 直接实例化router对象

router.get('/list', async (ctx, next) => {
  // await ctx.render('/home/index', { // koa-views 方法
  //   title: `控制面板首页`
  // })
  ctx.body = '文章列表页'
});

router.get('/detail', async (ctx, next) => {
  // await ctx.render('/home/index', { // koa-views 方法
  //   title: `控制面板首页`
  // })
  ctx.body = '文章详情'
});


module.exports = router;