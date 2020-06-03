const Koa = reuqire(`koa`);
// const parser = require('koa-bodyparser');
const views = require('koa-views');
const path = require('path');
const app = new Koa();

// 使用ejs模板
app.use(views(path.join(__dirname, './views'), {
  extension: 'ejs'
}));



app.listen(3999, () => {
  // console.log('')
})