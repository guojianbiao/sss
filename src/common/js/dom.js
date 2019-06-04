/* eslint-disable no-useless-return */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
// 获取索引
export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.serAttribute(prefix + name, val)
  } else {
    return el.getAttribute(prefix + name)
  }
}