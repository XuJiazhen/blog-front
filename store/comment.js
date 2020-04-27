import { createComment, getCommentsByArticleID } from '../api/comment'

export const state = () => {
  return {
    data: []
  }
}

export const mutations = {
  ADD_CMITEM(state, res) {
    state.data.unshift(res)
  },

  GET_CMLIST(state, res) {
    state.data = res
  }
}

export const actions = {
  async createComment({ commit }, comment) {
    const res = await createComment(comment)
    if (res && res.data) {
      commit('ADD_CMITEM', res.data)
    }
    return res
  },

  async getCommentsByArticleID({ commit }, articleID) {
    const res = await getCommentsByArticleID(articleID)

    if (res && res.data) {
      commit('GET_CMLIST', res.data)
    }
    return res
  }
}
