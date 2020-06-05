const router = require('@koa/router')(); // 直接实例化router对象
const { UserController } = require('../../controller/user');

// router.post('/login', async (ctx, next) => {
// });

// 注册接口
router.post('/register', UserController.create);


module.exports = router;