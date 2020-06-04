const router = require('@koa/router')(); // 直接实例化router对象

router.post('/login', async (ctx, next) => {
  
});

router.get('/register', async (ctx, next) => {
  res.write('api');
  res.end();
});


module.exports = router;