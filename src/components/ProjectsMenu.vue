<template>
  <div class="ui dropdown item">
    <i class="circle icon"></i> Projects <i class="dropdown icon"></i>
    <div class="menu transition">
      <a class="item" href="#" v-for="project in projects">{{project.name}}</a>
      <div class="divider"></div>
      <a class="item" href="#" v-on:click="showProjectForm()">Create project</a>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    projects () {
      return this.$store.getters.allProjects
    }
  }
}
</script>
