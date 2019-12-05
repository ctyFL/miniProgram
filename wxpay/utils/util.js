const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}

/* 时间戳产生函数   */
function createTimeStamp() {
  return parseInt(new Date().getTime() / 1000) + ''
}
/* 随机数 */
function randomString() {
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < 32; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
/* 获取XML节点信息 */
function getXMLNodeValue(node_name, xml) {
  var tmp = xml.split("<" + node_name + ">")
  var _tmp = tmp[1].split("</" + node_name + ">")
  return _tmp[0]
}
module.exports = {
  createTimeStamp: createTimeStamp,
  randomString: randomString,
  getXMLNodeValue: getXMLNodeValue
}
