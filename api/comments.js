import request from '../utils/request'

export function createComments(data) {
  return request({
    url: '/comments/create',
    method: 'post',
    data
  })
}

export function getAllComments() {
  return request({
    url: '/comments/all',
    method: 'get'
  })
}
