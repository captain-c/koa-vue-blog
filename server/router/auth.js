const router = require('@koa/router')(); // 直接实例化router对象

router.get('/login', async (ctx, next) => {
  await ctx.render('auth/login', { // koa-views 方法
    title: `登录页`
  });
});

router.get('/register', async (ctx, next) => {
  await ctx.render('auth/register', { // koa-views 方法
    title: `注册页`
  });
});


module.exports = router;