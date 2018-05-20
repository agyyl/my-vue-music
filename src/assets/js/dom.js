export function hasClass (el, className) {
  return el.classList.contains(className)
}

export function addClass (el, className) {
  el.classList.add(className)
}

export function removeClass (el, className) {
  el.classList.remove(className)
}

export function getData (el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle (style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export function isDOMContains (parentEle, ele, container) {
  // parentEle: 要判断节点的父级节点
  // ele:要判断的子节点
  // container : 二者的父级节点

  // 如果parentEle h和ele传的值一样，那么两个节点相同
  if (parentEle === ele) {
    return true
  }
  if (!ele || !ele.nodeType || ele.nodeType !== 1) {
    return false
  }
  // 如果浏览器支持contains
  if (parentEle.contains) {
    return parentEle.contains(ele)
  }
  // 火狐支持
  if (parentEle.compareDocumentPosition) {
    return !!(parentEle.compareDocumentPosition(ele) & 16)
  }

  // 获取ele的父节点
  var parEle = ele.parentNode
  while (parEle && parEle !== container) {
    if (parEle === parentEle) {
      return true
    }
    parEle = parEle.parentNode
  }
  return false
}
