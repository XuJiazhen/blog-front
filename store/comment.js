import {
  createComment,
  getCommentsByArticleID,
  updateComment,
  submitLike
} from '../api/comment'

import Vue from 'vue'

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
  },

  UPDATE_CMITEM(state, res) {
    const replyList = state.data.find(item => Object.is(item._id, res.id))
      .replyList.data
    Vue.set(replyList, replyList.length, res.data)
  },

  SUBMIT_LIKE(state, res) {}
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
  },

  async updateComment({ commit }, replyForm) {
    const res = await updateComment(replyForm)
    if (res && res.data) {
      commit('UPDATE_CMITEM', res.data)
    }

    return res
  },

  async submitLike({ commit }, data) {
    const res = await submitLike(data)

    if (res && res.data) {
      commit('SUBMIT_LIKE', res.data)
    }

    return res.data
  }
}
