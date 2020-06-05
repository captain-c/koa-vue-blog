const router = require('@koa/router')(); // 直接实例化router对象

router.get('/', (ctx, next) => {
  ctx.body = '首页home'
});


module.exports = router;