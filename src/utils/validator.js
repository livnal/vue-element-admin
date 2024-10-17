/*
 * @Descripttion:
 * @version:
 * @FilePath: /vue-element-admin/src/utils/validator.js
 */
/**
 * 此工具类提供了基础的validator，适用于async-validator
 */

/**
 * 用于值是否相同的回调函数
 *
 * @callback ValueComparator
 * @param {*} value 需要校验的字段的值
 * @return {Boolean} 值相同返回true， 不相同返回false
 */
/**
 * 将调用此方法返回的validator传入自定义校验规则中的validator字段，可以用来比较表单字段中的值是否与另一个值相等
 * 常用两次密码校验
 *
 * @param {ValueComparator} comparator 比较值是否相同的回调函数
 * @param {string} errMsg
 * @return {Function}
 */
export function getCheckSameValueValidator(comparator, errMsg = '值不一致') {
  return (rule, value, callback) => {
    if (comparator(value) === false) {
      callback(errMsg);
    } else {
      callback();
    }
  };
}

// 常规INPUT框
// 校验必填字段
export const checkRequired = name => [
  {
    required: true,
    message: `${name}不能为空`,
    trigger: 'change'
  }
];
// 仅可输入英文字母和数字
export const checkCode = (checkTerm, name) => [
  {
    pattern: `^[A-Z0-9_]{1,${checkTerm.max}}$`,
    message: `${name}应由最多${checkTerm.max}位大写英文字母、数字或_组成`,
    trigger: 'blur'
  },
  { required: checkTerm.required, message: `${name}不能为空`, trigger: 'blur' }
];
// 校验字段的长度
export const checkLength = (checkTerm, name) => [
  {
    min: checkTerm.min,
    max: checkTerm.max,
    message: `${name}最大长度为${checkTerm.max}位`,
    trigger: 'blur'
  },
  {
    required: checkTerm.required,
    message: `${name}不能为空`,
    trigger: 'blur'
  }
];

// 特殊INPUT框

// X字码校验,如二字码，三字码，四字码
export const checkCodeX = (checkTerm, name) => [
  {
    pattern: `^[A-Z0-9]{${checkTerm.max}}$`,
    message: `${name}应由${checkTerm.max}位大写英文字母或数字组成`,
    trigger: 'blur'
  },
  { required: checkTerm.required, message: `${name}不能为空`, trigger: 'blur' }
];
// 校验输入框纯中文、长度
export const checkChineseLength = (checkTerm, name) => [
  // FIXME: 暂时去除校验
  // { pattern: `^[\u4E00-\u9FA5/A-Za-z0-9- ]{${checkTerm.min},
  // ${checkTerm.max}}$`, message: `${name}只能由最多${checkTerm.max}位中文文字、字母、-或数字组成`, trigger: 'blur' },
  {
    min: checkTerm.min,
    max: checkTerm.max,
    message: `${name}最大长度为${checkTerm.max}位`,
    trigger: 'blur'
  },
  { required: checkTerm.required, message: `${name}不能为空`, trigger: 'blur' }
];
// 校验输入框纯英文、长度
export const checkEnglishLength = (checkTerm, name) => [
  // FIXME: 暂时去除校验
  {
    pattern: `^[A-Za-z0-9-/,:.' ]{${checkTerm.min},${checkTerm.max}}$`,
    message: `${name}只能由最多${checkTerm.max}位英文字母、数字组成`
  },
  // {
  //   min: checkTerm.min, max: checkTerm.max,
  //   message: `${name}最大长度为${checkTerm.max}位`, trigger: 'blur'
  // },
  { required: checkTerm.required, message: `${name}不能为空`, trigger: 'blur' }
];
// 校验输入框英文、数字
export const checkEnglishNumberLength = (checkTerm, name) => [
  // FIXME: 暂时去除校验
  // { pattern: `^[A-Za-z0-9 ]{${checkTerm.min},${checkTerm.max}}$`,
  // message: `${name}只能由最多${checkTerm.max}位英文字母组成`, trigger: 'blur' },
  {
    min: checkTerm.min,
    max: checkTerm.max,
    message: `${name}最大长度为${checkTerm.max}位`,
    trigger: 'blur'
  },
  { required: checkTerm.required, message: `${name}不能为空`, trigger: 'blur' }
];
// 校验输入框正整数、长度
export const checkNumberLength = (checkTerm, name) => [
  { pattern: /(^[0-9]\d{0,2}$)/, message: `${name}应为1000以内的非负整数` },
  { required: checkTerm.required, message: `${name}不能为空` }
];
// 校验输入框正整数、长度
export const checkMinusLength = (checkTerm, name) => [
  { pattern: /(^[1-9]\d{0,2}$)|(^[-]\d{0,3}$)|(0)/, message: `${name}应为正负1000以内的整数`, trigger: 'blur' },
  { required: checkTerm.required, message: `${name}不能为空`, trigger: 'blur' }
];
// 校验输入框浮点型、长度
export const checkFloatLength = (checkTerm, name) => [
  {
    pattern: /(^[1-9]\d{0,3}$)|(^0\.\d{1,2}$)|(^[1-9]\d{0,3}\.\d{1,2}$)|(0)/,
    message: `${name}应为10000以内的正数(最多保留两位小数)`
  },
  { required: checkTerm.required, message: `${name}不能为空` }
];
export const checkLargeNumber = (checkTerm, name) => [
  { pattern: /(^[1-9]\d{0,5}$)|(^0\.\d{1,2}$)|(^[1-9]\d{0,5}\.\d{1,2}$)|(0)/, message: `${name}应为1000000以内的正数` },
  { required: checkTerm.required, message: `${name}不能为空` }
];
// 校验输入框浮点型、长度
export const checkFloatLengthOne = (checkTerm, name) => [
  {
    pattern: /(^[1-9]\d{0,3}$)|(^0\.\d{1}$)|(^[1-9]\d{0,3}\.\d{1}$)/,
    message: `${name}应为10000以内的正数(最多保留一位小数)`
  },
  { required: checkTerm.required, message: `${name}不能为空` }
];
// 校验输入框电话、长度
export const checkPhoneLength = (checkTerm, name) => [
  { pattern: /^[0-9 -]*$/, message: `${name}仅可由数字、-或空格组成` },
  { required: checkTerm.required, message: `${name}不能为空` },
  {
    min: checkTerm.min,
    max: checkTerm.max,
    message: `${name}最大长度为${checkTerm.max}位`
  }
];
/**
 * 检查数值范围
 * @param {*} value 数值
 * @param {*} min 最小值
 * @param {*} max 最大值
 */
export function checkNumberRange(value, min, max) {
  return !(Number.isNaN(value) || value > max || value < min);
}
/**
 * 航班时间校验
 * for 班期计划航班
 * @param {*} rule 规则
 * @param {*} value 数值
 * @param {*} callback 回调
 */
export function flightTimeValidator(rule, value, callback) {
  // 最小位数为4
  let hasError = value.length < 4;
  if (!hasError) {
    // 小时
    const hour = value.substr(0, 2) - 0;
    // 分钟
    const min = value.substr(2, 2) - 0;
    // 尾部+号
    const plusFlag = value[4];
    // 检查小时和分钟是否符合要求
    hasError = !checkNumberRange(hour, 0, 23) || !checkNumberRange(min, 0, 59);
    // 检查+号是否符合要求
    if (plusFlag && plusFlag !== '+') {
      hasError = true;
    }
  }
  if (hasError) {
    // 不符合要求抛出提示
    callback(new Error('时间格式错误，请输入1230或1230+格式的字符'));
  } else {
    callback();
  }
}
/**
 * 计划规则校验
 * for 班期计划航班
 * @param {*} rule 规则
 * @param {*} value 数值
 * @param {*} callback 回调
 */
export function planRuleValidator(rule, value, callback) {
  // 兼容占位的.
  value = value.replace(/\./g, '');
  // 限制字符为1-7
  let hasError = !/^[1-7]*$/.test(value);
  // 限制字符两两不同
  if (!hasError) {
    // 将字符解析为数组并排序
    const arr = value.split('').sort();
    for (let i = 0; i < arr.length - 1; i++) {
      // 判断排序后相邻数据不同
      if (arr[i] === arr[i + 1]) {
        hasError = true;
        break;
      }
    }
  }
  if (hasError) {
    // 不符合要求抛出提示
    callback(new Error('格式错误，请输入1234567或1457格式的字符'));
  } else {
    callback();
  }
}
/**
 * 航班号格式校验
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function flightNoValidator(rule, value, callback) {
  const reg = /^[0-9A-Z]+$/;
  if (!reg.test(value)) {
    callback(new Error('航班号格式错误'));
  } else {
    callback();
  }
}
