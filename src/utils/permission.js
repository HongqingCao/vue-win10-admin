/*
 * @Author: your name
 * @Date: 2020-07-18 21:20:59
 * @LastEditTime: 2020-07-18 22:20:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-win10-admin\src\utils\permission.js
 */ 
import store from '@/store'
import utils from '@/utils/utils'
// 控制接口，可以用来控制按钮
export function hasDataPermission(permission) {
    const myAuth = store.getters.dataPermission
    return (myAuth.indexOf(permission) > -1)
  }

// 页面权限

export function hasPagePermission(path) {
  let menuList = []
  store.getters.menuList.forEach(item => {
    menuList.push(item.authority_url)
  })
  console.log("menuList")
  console.log(menuList)
  console.log(path)
  let nowpath = utils.splitRouter(path)
  console.log("menuList")
  console.log(nowpath)
  return menuList.includes(nowpath, 0)
}