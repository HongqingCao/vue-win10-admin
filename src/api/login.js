import request from '@/utils/request'
// 登陆
export function loginApi(data) {
  return request({
    url: 'api/user/login',
    method: 'post',
    data
  })
}