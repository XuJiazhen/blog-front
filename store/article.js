import { likeArticle } from '../api/article'

export const state = () => {
  return {
    articleLikes: []
  }
}

export const mutations = {
  SUBMIT_LIKE(state, id) {
    const articleLikes = JSON.parse(localStorage.getItem('ArticleLikes'))
    if (articleLikes) {
      articleLikes.push(id)
      localStorage.setItem('ArticleLikes', JSON.stringify(articleLikes))
    } else {
      state.articleLikes.push(id)
      localStorage.setItem('ArticleLikes', JSON.stringify(state.articleLikes))
    }
  }
}

export const actions = {
  async submitLike({ commit }, articleId) {
    const res = await likeArticle(articleId)
    if (res && res.data) {
      commit('SUBMIT_LIKE', articleId)
    }
    return res.data
  }
}
