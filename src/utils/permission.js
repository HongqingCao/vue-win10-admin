/*
 * @Author: your name
 * @Date: 2020-07-18 21:20:59
 * @LastEditTime: 2020-07-18 22:20:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-win10-admin\src\utils\permission.js
 */ 
import store from '@/store'
// 控制接口，可以用来控制按钮
export function hasDataPermission(permission) {
    const myAuth = store.getters.dataPermission
    return (myAuth.indexOf(permission) > -1)
  }

// 路由权限
