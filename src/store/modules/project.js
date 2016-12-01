import * as types from '../mutation-types'

const PROJECT_STORAGE_KEY = 'litenight-project'

// state
const state = JSON.parse(window.localStorage.getItem(PROJECT_STORAGE_KEY || {
  issues: [],
  members: []
}))

// getters
const getters = {
  allIssues: state => state.issues,
  allMembers: state => state.members
}

// actions
const actions = {}

// Mutations
const mutations = {
  [types.ADD_ISSUE] (state, { text }) {
    state.issues.push({
      text: text
    })
  },
  [types.DELETE_ISSUE] (state, { issue }) {
    state.issues.splice(state.issues.indexOf(issue), 1)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
