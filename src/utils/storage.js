import Cookies from 'js-cookie'
const TokenKey = 'win10-Admin-Token'
/**
 * 对cookie操作
 */
export function _setCookie (value, params, type) {
  if (!TokenKey) return
  if (type === 'JSONStr') {
    value = JSON.stringify(value)
  }
  Cookies.set(TokenKey, value, params)
}
export function _getCookie (type) {
  if (!Cookies.get(TokenKey)) {
    return
  }
  if (type === 'JSONStr') {
    return JSON.parse(Cookies.get(TokenKey))
  } else {
    return Cookies.get(TokenKey)
  }
}
export function _removeCookie (TokenKey) {
  return Cookies.remove(TokenKey)
}

/**
 * 对sessionStorage操作
 */
export const _setSessionStore = (value, type) => {
  if (!TokenKey) return
  if (type === 'JSONStr') {
    value = JSON.stringify(value)
  }
  sessionStorage.setItem(TokenKey, value)
}

export const _getSessionStore = (type) => {
  if (!sessionStorage.getItem(TokenKey)) {
    return
  }
  if (type === 'JSONStr') {
    return JSON.parse(sessionStorage.getItem(TokenKey))
  } else {
    return sessionStorage.getItem(TokenKey)
  }
}

export const _removeSessionStore = () => {
  console.log("1111")
  sessionStorage.removeItem(TokenKey)
  console.log(_getSessionStore())
}

/**
 * 对localStorage操作
 */
export const _setLocalStore = (type, value) => {
  let settings = JSON.parse(_getLocalStore()) || {
    color: 31,
    taskbarMode: 'bottom',
    bgSrc: '/static/img/bg_02.f6c87e91.jpg'
  }
  switch(type) {
    case 'bgSrc':
      settings.bgSrc = value
      break
    case 'color':
      settings.color = value
      break
    case 'taskbarMode':
      settings.taskbarMode = value
      break
  }
  settings = JSON.stringify(settings)
  localStorage.setItem(TokenKey, settings)
}
export const _getLocalStore = (type) => {
  if (!localStorage.getItem(TokenKey)) {
    return
  }
  if (type === 'JSONStr') {
    return JSON.parse(localStorage.getItem(TokenKey))
  } else {
    return localStorage.getItem(TokenKey)
  }
}
export const _removeLocalStore = key => {
  if (!key) return
  localStorage.removeItem(key)
}

export const dispatchSetLocalStore = (type, value) => {

  let settings = _getLocalStore('JSONStr') || {
    color: 31,
    taskbarMode: 'bottom',
    bgSrc: '/static/img/bg_02.f6c87e91.jpg'
  }
  switch(type) {
    case 'bgSrc':
      settings.bgSrc = value
      break
    case 'color':
      settings.color = value
      break
    case 'taskbarMode':
      settings.taskbarMode = value
      break
  }
  settings = JSON.stringify(settings)
    // 创建一个StorageEvent事件
  let newStorageEvent = document.createEvent('StorageEvent');
  const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val)

          // 初始化创建的事件
          newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null)

          // 派发对象
          window.dispatchEvent(newStorageEvent)
      }
  }
  return storage.setItem(TokenKey, settings)
}
