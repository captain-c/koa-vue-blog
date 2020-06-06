const rq = require('request-promise');
const fs = require('fs');
const { biYingUrl } = require('../../config');

class GrabImg {
  static async grab(num = 1) {
    const option = {
      url: `${biYingUrl}/HPImageArchive.aspx?format=js&idx=0&n=${num}&mkt=zh-CN`,
      method: 'GET',
      json: true
    };
    rq(option).then((body) => {
      const { images} = body;
      console.log(images[0].url);
      // todo 写入本地
    }).catch((err) => {
      // todo
      console.log(err);
    });
  } 
}

module.exports = {
  GrabImg
};