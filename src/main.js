import '../semantic/dist/semantic.css'
import '../semantic/dist/components/dropdown'
import '../semantic/dist/components/sidebar'
import '../semantic/dist/components/transition'
import './sass/styles.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Auth0Lock from 'auth0-lock'

import store from './store'

import App from './App'
import Issues from './components/Issues'

Vue.use(VueRouter)
Vue.use(VueResource)

const cid = '5B1s0FHEOKVYiU6fLeFtrFubMu3xQ4xY'
const domain = 'litenight.auth0.com'

// Intercept the responses and logout user if something is unauthorized
Vue.http.interceptors.push({
  response: function (response) {
    if (response.status === 401) {
      this.logout()
      this.authenticated = false
    }
  }
})

// Private reoutes can be viewed only when authenticated
const Private = {
  template: '<p>This is a private reoute</p>'
}

// Utitlity function to check the auth status
function checkAuth () {
  return !!localStorage.getItem('idToken')
}

// map the routes to components
const routes = [
  {
    path: '/issues',
    component: Issues
  },
  {
    path: '/private',
    component: Private,
    beforeEnter: function (to, from, next) {
      if (checkAuth()) {
        next()
      } else {
        next(false)
        app.login()
      }
    }
  }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  el: '#app',
  template: '<App/>',
  data: {
    authenticated: false,
    lock: new Auth0Lock(cid, domain)
  },
  methods: {
    login: function () {
      this.lock.show()
    },
    logout: function () {
      localStorage.removeItem('idToken')
      localStorage.removeItem('profile')
      this.authenticated = false
    }
  },
  components: {
    App
  },
  mounted: function () {
    $('.ui.dropdown').dropdown()

    this.authenticated = checkAuth()
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('idToken', authResult.idToken)
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log(error.stack)
          return
        }

        localStorage.setItem('profile', JSON.stringify(profile))
        this.authenticated = true
      })
    })
    this.lock.on('autherization_error', (error) => {
      if (error) {
        console.log(error.stack)
      }
    })
  },
  store,
  router
})
