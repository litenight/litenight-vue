<template>
  <div class="issues">
    <h2 class="u dividing header">Issues</h2>
    <div class="ui divided relaxed list">
      <div class="ui item issue" v-for="issue in issues">
        <i class="bug icon"></i>
        <div class="content">
          <p class="header">{{ issue.text }}</p>
        </div>
      </div>
    </div>
    <div class="issue-editor">
      <form class="ui form">
        <div class="field">
          <input type="text" @keyup.enter="addIssue" placeholder="Add a new issue"/>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as types from '../store/mutation-types'

export default {
  name: 'issues',
  computed: {
    issues () {
      return this.$store.getters.allIssues
    }
  },
  methods: {
    addIssue (e) {
      let text = e.target.value
      if (text.trim()) {
        this.$store.commit(types.ADD_ISSUE, { text })
      }
      e.target.value = ''
    }
  }
}
</script>
