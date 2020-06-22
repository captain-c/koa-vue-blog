const rq = require('request-promise');
const fs = require('fs');
const path = require('path');
const { biYingUrl } = require('../../config');

class GrabImg {
  /**
   * 
   * @param {*} num 获取对应天数的图片，当前时间倒推 
   */
  static async grab(num = 1, rootDir) {
    const option = {
      url: `${biYingUrl}/HPImageArchive.aspx?format=js&idx=0&n=${num}&mkt=zh-CN`,
      method: 'GET',
      json: true
    };
    rq(option).then((body) => {
      const { images } = body;
      // console.log(images);
      // todo 判断文件类型
      if (Array.isArray(images) && images.length) {
        images.forEach((img) => {
          const { url,fullstartdate } = img;
          rq(`${biYingUrl}${url}`).pipe(fs.createWriteStream(path.join(`${rootDir}/public/static/images/biying`, `${fullstartdate}.jpg`)));
          // rq(`${biYingUrl}url`).then(data => {
          //   console.log(data);
          // }).catch(err => {
          //   console.log(err);
          // });
        });
      }
    }).catch((err) => {
      // todo， 错误处理
      console.log(err);
    });
  } 
}

module.exports = {
  GrabImg
};