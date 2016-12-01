import Vue from 'vue'
import Vuex from 'vuex'
import { state, mutations } from './mutations'
import project from './modules/project'
import projects from './modules/projects'
import plugins from './plugins'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  modules: {
    project,
    projects
  },
  plugins,
  strict: debug
})
