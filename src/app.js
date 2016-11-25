import '../semantic/dist/semantic.min.css'
import '../semantic/dist/semantic.min.js'
import './sass/styles.scss'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import Auth0Lock from 'auth0-lock'

import Sidebar from './components/Sidebar.vue'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Vuex)

//Vue.use(require('vue-semantic'))

const cid = '5B1s0FHEOKVYiU6fLeFtrFubMu3xQ4xY'
const domain = 'litenight.auth0.com'

// Intercept the responses and logout user if something is unauthorized
Vue.http.interceptors.push({
    response: function(response) {
        if(response.status == 401) {
            this.logout()
            this.authenticated = false
        }
    }
})

// Public reoutes can be viewed at any time
const Public = {
    template: '<p>This is a public reoute</p>'
}

// Private reoutes can be viewed only when authenticated
const Private = {
    template: '<p>This is a private reoute</p>',
}

// Utitlity function to check the auth status
function checkAuth() {
    return !!localStorage.getItem('idToken')
}

// map the routes to components
const routes = [
    {
        path: '/public',
        component: Public
    },
    {
        path: '/private',
        component: Private,
        beforeEnter: function(to, from, next) {
            if(checkAuth()) {
                next();
            } else {
                next(false)
                App.login()
            }
        }
    }
]

const router = new VueRouter({
    routes
})

const App = new Vue({
    data: {
        authenticated: false,
        lock: new Auth0Lock(cid, domain)
    },
    methods: {
        login: function() {
            this.lock.show()
        },
        logout: function() {
            localStorage.removeItem('idToken')
            localStorage.removeItem('profile')
            this.authenticated = false
        },
        toggleSidebar: function() {
            $('.ui.sidebar').sidebar('toggle');
        }
    },
    components: {
        Sidebar
    },
    mounted: function() {
        this.authenticated = checkAuth()
        this.lock.on('authenticated', (authResult) => {
            localStorage.setItem('idToken', authResult.idToken)
            this.lock.getProfile(authResult.idToken, (error, profile) => {
                if(error) {
                    // handle error
                    return
                }

                localStorage.setItem('profile', JSON.stringify(profile))
                this.authenticated = true
            })
        })
        this.lock.on('autherization_error', (error) => {
            // handle error when autherization fails
        })
    },
    router,

}).$mount('#app')
