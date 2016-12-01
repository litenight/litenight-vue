import { PROJECT_STORAGE_KEY } from './mutations'
import createLogger from 'vuex/dist/logger'

const localStoragePlugin = store => {
  store.subscribe((mutation, { project }) => {
    window.localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(project))
  })
}

export default process.env.NODE_ENV !== 'procuction'
  ? [createLogger(), localStoragePlugin]
  : [localStoragePlugin]
