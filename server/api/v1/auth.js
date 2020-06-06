const router = require('@koa/router')(); // 直接实例化router对象
const { UserController } = require('../../controller/user');

// 登录接口
router.post('/login', UserController.login);

// 注册接口
router.post('/register', UserController.create);

//获取用户信息
// router.post('/info', UserController.);


module.exports = router;