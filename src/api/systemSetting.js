import request from '@/utils/request'
// 获取权限列表
export function getAuthList(data) {
  return request({
    url: 'api/auth/getList',
    method: 'get',
    params:data
  })
}
// 获取全部权限列表
export function getAllAuthList(data) {
  return request({
    url: 'api/auth/getAll',
    method: 'get',
    params:data
  })
}
// 创建权限
export function createdAuth(data) {
  return request({
    url: 'api/auth/created',
    method: 'post',
    data
  })
}
// 修改权限 
export function updateAuth(data) {
  return request({
    url: 'api/auth/update',
    method: 'post',
    data
  })
}