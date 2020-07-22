import Cookies from 'js-cookie'
//const key = 'win10-Admin-Token'
/**
 * 对cookie操作
 */
export function _setCookie (key, value, params, type) {
  if (!key) return
  if (type === 'JSONStr') {
    value = JSON.stringify(value)
  }
  Cookies.set(key, value, params)
}
export function _getCookie (key, type) {
  if (!Cookies.get(key)) {
    return
  }
  if (type === 'JSONStr') {
    return JSON.parse(Cookies.get(key))
  } else {
    return Cookies.get(key)
  }
}
export function _removeCookie (key) {
  return Cookies.remove(key)
}

/**
 * 对sessionStorage操作
 */
export const _setSessionStore = (key, value, type) => {
  if (!key) return
  if (type === 'JSONStr') {
    value = JSON.stringify(value)
  }
  sessionStorage.setItem(key, value)
}

export const _getSessionStore = (key, type) => {
  if (!sessionStorage.getItem(key)) {
    return
  }
  if (type === 'JSONStr') {
    return JSON.parse(sessionStorage.getItem(key))
  } else {
    return sessionStorage.getItem(key)
  }
}

export const _removeSessionStore = (key) => {
  sessionStorage.removeItem(key)
}

/**
 * 对localStorage操作
 */
export const _setLocalStore = (key, type, value) => {
  if (!key) return
  if (type === 'JSONStr') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}
export const _getLocalStore = (key, type) => {
  if (!localStorage.getItem(key)) {
    return
  }
  if (type === 'JSONStr') {
    return JSON.parse(localStorage.getItem(key))
  } else {
    return localStorage.getItem(key)
  }
}
export const _removeLocalStore = key => {
  if (!key) return
  localStorage.removeItem(key)
}

export const dispatchSetLocalStore = (key, type, value) => {
  let settings = _getLocalStore(key,'JSONStr') || {
    theme: 11,
    taskbarMode: 'bottom',
    bgSrc: ''
  }
  switch(type) {
    case 'bgSrc':
      settings.bgSrc = value
      break
    case 'theme':
      settings.theme = value
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
  return storage.setItem(key, settings)
}
