const Koa = require(`koa`);
// const parser = require('koa-bodyparser');
const views = require('koa-views');
const path = require('path');
const static = require('koa-static');
const routes = require('./server/router');
const api = require('./server/api');
const app = new Koa();

const staticPath = './public/static';
// 处理静态资源文件
app.use(static(
  path.join( __dirname,  staticPath)
));

// 使用ejs模板
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}));

// 注册web路由
app.use(routes.routes(), routes.allowedMethods());
// 注册api路由
app.use(api.routes(), api.allowedMethods());


app.listen(3999, () => {
  console.log('我的koa系统启动了')
})