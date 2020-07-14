// 获取用户列表
import request from '@/utils/request'
// 登陆
export function loginApi(data) {
  return request({
    url: 'api/user/login',
    method: 'post',
    data
  })
}

export function logOut(data) {
  return request({
    url: 'api/user/logOut',
    method: 'get',
    params:data
  })
}
export function getInfo(data) {
  return request({
    url: 'api/user/getInfo',
    method: 'get',
    params:data
  })
}
export function getUserList(data) {
  return request({
    url: 'api/user/getList',
    method: 'get',
    params:data
  })
}
// 获取全部用户列表
export function getAllUserList(data) {
  return request({
    url: 'api/user/getAll',
    method: 'get',
    params:data
  })
}
// 创建用户
export function createdUser(data) {
  return request({
    url: 'api/user/registered',
    method: 'post',
    data
  })
}
// 修改用户
export function updateUser(data) {
  return request({
    url: 'api/user/update',
    method: 'post',
    data
  })
}
// 删除用户
export function deleteUser(data) {
  return request({
    url: 'api/user/delete',
    method: 'post',
    data
  })
}