const Koa = require(`koa`);
const parser = require('koa-bodyparser');
const views = require('koa-views');
const path = require('path');
const static = require('koa-static');
const routes = require('./server/router');
const api = require('./server/api');
const Cron = require('cron').CronJob;
const { GrabImg } = require('./server/schedule/biYingImg');
const app = new Koa();

// 定时任务
// constructor(cronTime, onTick, onComplete, start, timezone, context, runOnInit, unrefTimeout)
// cronTime [必需] 配置定时任务的时间，可以使用这可以是cron语法或JS Date对象的形式。
// onTick [必需]在指定时间触发的回调。
// onComplete [可选] 在作业停止时将触发的回调。
// Start [可选]指定是否在退出构造函数之前启动作业，默认情况下，此值设置为false。
// timeZone [可选] -指定执行的时区。这将修改相对于您的时区的实际时间 ，不设置为当前所在时区。
// https://blog.csdn.net/weixin_34318272/article/details/93169326
// 0 0 08 * * *   |  */10 * * * * *
const getBiYingImg = new Cron('*/10 * * * * *', function () {
  GrabImg.grab(1, __dirname);
}, null, false);
getBiYingImg.start();


app.use(parser()); // 处理post数据
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