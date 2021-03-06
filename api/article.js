import request from '../utils/request'

export function getAllArticles() {
  return request({
    url: '/article',
    method: 'get'
  })
}

export function getArticleById(id) {
  return request({
    url: `/article/${id}`,
    method: 'get'
  })
}

export function likeArticle(id) {
  return request({
    url: `/article/like/${id}`,
    method: 'put'
  })
}
