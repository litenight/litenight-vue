<template>
    <div class="ui menu">
        <a href="#" class="item" v-on:click.stop="toggleSidebar"><i class="bars icon"></i></a>
        <a href="#" class="header item">
            <img src="../assets/logo-nav.png" />
            LiteNight
        </a>

        <projects-menu></projects-menu>

        <div class="right menu">
            <div class="borderless item">
                <div class="ui icon input">
                    <input placeholder="Search..." type="text">
                    <i class="search link icon"></i>
                </div>
            </div>

            <div class="ui dropdown item">
                <i class="user icon"></i> Account <i class="dropdown icon"></i>
                <div class="menu">
                    <a class="item" href="#">Profile</a>
                    <a class="item" href="#">Settings</a>
                    <div class="divider"></div>
                    <a class="item" href="#" v-on:click="logout()">Logout</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectsMenu from './ProjectsMenu'

export default {
  components: {
    ProjectsMenu
  },
  methods: {
    toggleSidebar: function () {
      jQuery('.ui.sidebar').sidebar('toggle')
    }
  }
}
</script>
