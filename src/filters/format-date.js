/*
 * @Descripttion:
 * @version:
 * @FilePath: /vue-element-admin/src/filters/format-date.js
 */
const dateFormat = (date, block) => {
  if (!date) {
    return '';
  }

  let format = block || 'yyyy-MM-dd';

  date = new Date(date);

  const map = {
    M: date.getMonth() + 1, // 月份
    d: date.getDate(), // 日
    h: date.getHours(), // 小时
    H: date.getHours(), // 小时
    m: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    q: Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };

  format = format.replace(/([yMdhHmsqS])+/g, (all, t) => {
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = `0${v}`;
        v = v.substr(v.length - 2);
      }
      return v;
    }
    if (t === 'y') {
      return date
        .getFullYear()
        .toString()
        .substr(4 - all.length);
    }

    return all;
  });

  return format;
};

export default dateFormat;
