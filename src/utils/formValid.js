import {IDNumberReg} from './validate';

/** 手机号校验 */
const phoneReg = (rule, value, callback) => {
  if (value) {
    if (value.length == 11 && value.match("^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\\d{8}$")) {
      callback();
    } else {
      callback(new Error('手机号码号码不正确'));
    }
  } else {
    callback(new Error('请输入手机号码'));
  }
};
const isContactNumber = (phone) => {
  return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(phone);
}

/** 身份证号码校验 */
const IDCardNumberReg = (rule, value, callback) => {
  if (value) {
    let result = IDNumberReg(value);
    if (result.status) {
      callback();
    } else {
      callback(new Error(result.msg));
    }
  } else {
    callback(new Error('请输入身份证号码'));
  }
};

/** 金额校验 */
const currencyReg = (rule, value, callback) => {
  if (value) {
    value = value.toString();
    let splitArr = value.split('.');
    if (splitArr.length === 2) {
      if (splitArr[1].length > 2) {
        callback(new Error('金额最多输入两位小数'));
        return;
      }
    }
    if (value.match(/^[0-9]+.?[0-9]*$/)) {
      if (value.match(/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/)) {
        callback();
      } else if (value === '0') {
        callback();
      } else {
        callback(new Error('金额格式不正确'));
      }
    } else {
      callback(new Error('请输入正确的金额'));
    }
  } else {
    callback(new Error('请输入金额'));
  }
};


export default {
  phoneReg,
  IDCardNumberReg,
  currencyReg,
  isContactNumber
}
