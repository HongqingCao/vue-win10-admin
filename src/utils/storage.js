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
export const _setLocalStore = (key, value, type) => {
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
