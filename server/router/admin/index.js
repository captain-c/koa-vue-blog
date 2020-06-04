// 方式二 前缀路由
const router = require('@koa/router')();

const dashboard = require('./dashboard'); // 后台首页
const article = require('./article'); // 文章
const label = require('./label'); // 标签

router.use(dashboard.routes(), dashboard.allowedMethods());
router.use('/article', article.routes(), article.allowedMethods());
router.use('/label', label.routes(), label.allowedMethods());


module.exports = router;