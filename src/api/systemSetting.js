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
// 删除权限 
export function deleteAuth(data) {
  return request({
    url: 'api/auth/delete',
    method: 'post',
    data
  })
}

// 获取角色列表
export function getAllRoleList(data) {
  return request({
    url: 'api/role/getAll',
    method: 'get',
    params:data
  })
}
// 创建角色
export function createdRole(data) {
  return request({
    url: 'api/role/created',
    method: 'post',
    data
  })
}
// 修改角色
export function updateRole(data) {
  return request({
    url: 'api/role/update',
    method: 'post',
    data
  })
}
// 删除角色
export function deleteRole(data) {
  return request({
    url: 'api/role/delete',
    method: 'post',
    data
  })
}

// 编辑角色权限
export function addRoleAuth(data) {
  return request({
    url: 'api/role/addAuth',
    method: 'post',
    data
  })
}