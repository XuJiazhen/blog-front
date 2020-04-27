import request from '../utils/request'

export function createComment(data) {
  return request({
    url: '/comments/create',
    method: 'post',
    data
  })
}

export function getCommentsByArticleID(id) {
  return request({
    url: `/comments/${id}`,
    method: 'get'
  })
}

export function updateComment(data) {
  return request({
    url: `/comments/update`,
    method: 'put',
    data
  })
}
