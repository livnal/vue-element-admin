/*
 * @Descripttion:
 * @version:
 * @FilePath: /vue-element-admin/src/utils/util.js
 */
/**
 * @description: 首字母大写
 * @param {*} str 字符串
 * @return {*}
 */
export function firstLetterUpper(str) {
  return str.charAt(0).toUpperCase() + str.slice(1) // 截图首字母大写然后拼接
}

/**
 * 生成UUID
 */
export function createUUID() {
  let d = new Date().getTime() // 获取时间戳
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })

  return uuid
}

/**
 * body上添加/删除类名
 * @param {string} className 类名
 * @param {add | remove} action 添加或删除
 */
export function toggleBodyClass(className, action) {
  const docEl = document.getElementsByTagName('body')[0] // 获取元素

  if (action === 'add') {
    // 增加类名
    docEl.classList.add(className)
  } else if (action === 'remove') {
    // 删除类名
    docEl.classList.remove(className)
  }
}

/**
 * 文件引入
 * @param {} r
 * @param {*} type
 */
export function importAll(r, type = 'object', split = '') {
  const modules = type === 'object' ? {} : []
  r.keys().forEach(key => {
    let moduleKey = key.replace(/(\.\/|\.js)/g, '') // 获取文件名
    const moduleKeyArr = moduleKey.split(/[-/]/)

    moduleKey = ''

    if (split) {
      moduleKey = moduleKeyArr.join(split)
    } else {
      moduleKeyArr.forEach((item, index) => {
        moduleKey += index > 0 ? firstLetterUpper(item) : item
      })
    }

    // 如果是对象格式
    if (type === 'object') {
      modules[moduleKey] = r(key).default || r(key)
    } else {
      // 数组格式
      modules.push(r(key).default || r(key))
    }
  })

  return modules
}

/**
 * 是否是外部 url
 * @param {string} path 路径
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 *
 * @param {Array} arr 数组
 * @param {String} labelKey label 键值
 * @param {String} valueKey value 键值
 */
export function arrToMap(arr, labelKey = 'value', valueKey = '') {
  const map = {}

  arr.forEach(item => {
    map[item[labelKey]] = valueKey ? item[valueKey] : item
  })

  return map
}

/**
 *
 * @param {Object} obj 对象
 * @param {function} callback 转换函数
 */
export function mapToArr(obj, callback) {
  return Object.keys(obj).map(key => {
    return callback(key, obj[key])
  })
}

/**
 * @description: 16 进制颜色转 rgba
 * @param {*} hexCode
 * @param {*} opacity
 */
export function convertHexToRGBA(hexCode, opacity) {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r},${g},${b},${opacity})`
}

/**
 * @description: 获取文件后缀
 * @param {*} filename
 */
export function getFileExtension(filename) {
  // 文件扩展名匹配正则
  var reg = /\.[^.]+$/
  var matches = reg.exec(filename)
  if (matches) {
    return matches[0]
  }
  return ''
}
