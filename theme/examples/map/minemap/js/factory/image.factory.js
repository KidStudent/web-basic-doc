/**
 * 地图上的所有使用的图标以及图片必须经过此加工厂到地图上才可使用
 * 所有图片在staticUtil文件中引入抛出即可
 */
import imageList from '../util/staticUtil';

export class ImageFactory {
  map;

  constructor(map) {
    this.map = map;
  }

  loadImageSuccess(callBack) {
    let promiseList = [];
    // 加载地图所需图片
    Object.keys(imageList).forEach((key) => {
      promiseList.push(this.addImage(imageList[key], key));
    });

    Promise.all(promiseList)
      .then(() => {
        callBack();
      })
      .catch((err) => {
        throw err;
      });
  }

  addImage(url, name) {
    return new Promise((resolve) => {
      this.map.loadImage(url, (err, images) => {
        if (err) throw err;
        // 添加自定义图标
        this.map.addImage(name, images);
        resolve(name);
      });
    });
  }
}
