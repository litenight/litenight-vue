<template>
  <div class="app">
    <topbar></topbar>

    <div class="ui main">
      <div class="ui grid">
        <div class="three wide column">
          <div class="ui fluid vertical pointing menu">
            <router-link to="/issues" class="item">Issues</router-link>
            <router-link to="/private" class="item">Private</router-link>
          </div>
        </div>
        <div class="ten wide column">
          <router-view></router-view>
        </div>
        <div class="three wide column"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from './components/Topbar'

export default {
  name: 'app',
  components: {
    Topbar
  },
  created () {
    this.$store.dispatch('getAllProjects')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
