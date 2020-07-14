/*
 * @Author: your name
 * @Date: 2020-07-04 15:12:59
 * @LastEditTime: 2020-07-11 21:49:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \home-worlkf:\github\vue-win10-admin\src\dictionary\index.js
 */ 
// 权限类型
const authorityType = [
  {
    value: 0,
    label: '菜单'
  },
  {
    value: 1,
    label: '操作和功能'
  }
]
// 性别类型
const sexType = [
  {
    value: 1,
    label: '男'
  },
  {
    value: 2,
    label: '女'
  }
]

const userStatusType = [
  {
    value: 0,
    label: '冻结'
  },
  {
    value: 1,
    label: '正常'
  }
]

export {
  authorityType,
  sexType,
  userStatusType
}