import * as types from '../mutation-types'

// state
const state = {
  all: []
}

// getters
const getters = {
  allProjects: state => state.all
}

// actions
const actions = {
  getAllProjects ({ commit }) {
    const projects = {
      '1': {
        id: '1',
        name: 'LiteNight'
      },
      '2': {
        id: '2',
        name: 'Tuitionix'
      }
    }
    commit(types.RECEIVE_PROJECTS, { projects })
  }
}

// Mutations
const mutations = {
  [types.RECEIVE_PROJECTS] (state, { projects }) {
    state.all = projects
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
