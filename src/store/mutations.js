export const SETTINGS_STORAGE_KEY = 'litenight-app-settings'
export const PROJECT_STORAGE_KEY = 'litenight-project'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const state = {
  project: JSON.parse(window.localStorage.getItem(PROJECT_STORAGE_KEY || {}))
}

export const mutations = {

}
