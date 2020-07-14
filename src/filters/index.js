/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param type 传2：元 传其他值或不传：分
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
export function currency(num, type) {
  if (isNaN(parseInt(num))) return '--';
  if (!num && num != 0) return '--';
  num = num.toString().replace(/\$|,/g, '');
  if (type != 2) {
    num = num / 100.0;//把分转成元
  }
  if (isNaN(num)) {
    num = "0";
  }
  let sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10)
    cents = "0" + cents;
  for (let i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num + '.' + cents);
}

/**
 * 时间格式化
 *
 * @param formater  格式化的时间格式，默认为年月日时分
 * @return 格式化后的时间，如 2018-08-07 16:19
 * @type String
 */
export function date(timestamp, formater) {
  if (!timestamp) return '--';
  let date = new Date();
  date.setTime(parseInt(timestamp));
  formater = (formater != null) ? formater : 'yyyy-MM-dd hh:mm';
  Date.prototype.Format = function (fmt) {
    let o = {
      "M+": this.getMonth() + 1, //月
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ?
        (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
  };
  return date.Format(formater);
}

// 性别类型
export function  sexType(value){
  if (value=== 0) {
    return '男'
  } else if (value === 1) {
    return '女'
  } else return '未设置'
}

// 用户状态 
export function  userStatusType(value){
  if (value=== 0) {
    return '冻结'
  } else if (value === 1) {
    return '正常'
  } else return '未设置'
}