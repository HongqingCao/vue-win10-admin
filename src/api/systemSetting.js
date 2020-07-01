import request from '@/utils/request'
// 获取权限列表
export function getAuthList(data) {
  return request({
    url: 'api/auth/getList',
    method: 'get',
    data
  })
}