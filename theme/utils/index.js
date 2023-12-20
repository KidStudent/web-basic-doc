/**
 * 一维数组转树状数组
 * arr: 要转换的一维数组
 * id: 唯一识别
 * pid: 父级唯一识别
 */
export function arrayToJson(arr, id, pid, children = 'children') {
  let tempArr = [];
  let tempObj = {};
  for (let i = 0, l = arr.length; i < l; i++) {
    tempObj[arr[i][id]] = arr[i];
  }
  for (let i = 0, l = arr.length; i < l; i++) {
    let key = tempObj[arr[i][pid]];

    if (key) {
      if (!key[children]) {
        key[children] = [];
        key[children].push(arr[i]);
      } else {
        key[children].push(arr[i]);
      }
    } else {
      tempArr.push(arr[i]);
    }
  }
  return tempArr;
}

export function jsonToArray(nodes, children = 'children') {
  let r = [];
  if (Array.isArray(nodes)) {
    for (let i = 0, l = nodes.length; i < l; i++) {
      r.push(nodes[i]);
      if (Array.isArray(nodes[i][children]) && nodes[i][children].length > 0)
        //将children递归的push到最外层的数组r里面
        r = r.concat(jsonToArray(nodes[i][children]));
      delete nodes[i][children];
    }
  }
  return r;
}

/**
 * 深拷贝, 可以提取公共方法
 */
//返回传递给他的任意对象的类
export function isClass(o) {
  if (o === null) return 'Null';
  if (o === undefined) return 'Undefined';
  return Object.prototype.toString.call(o).slice(8, -1);
}

export function deepCopy(obj) {
  if (!obj) {
    return null;
  }
  let result,
    oClass = isClass(obj);
  //确定result的类型
  if (oClass === 'Object') {
    result = {};
  } else if (oClass === 'Array') {
    result = [];
  } else {
    return obj;
  }

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let copy = obj[key];
      if (isClass(copy) === 'Object') {
        result[key] = deepCopy(copy); //递归调用
      } else if (isClass(copy) === 'Array') {
        result[key] = deepCopy(copy);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
