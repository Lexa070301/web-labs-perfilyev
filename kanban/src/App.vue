<template>
  <div id="app">
    <kanban/>
  </div>
</template>

<script>
import kanban from './components/kanban'

export default {
  name: 'App',
  components: {
      kanban
  }
}
</script>

<style>
#app {
  font-family: 'Gilroy', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
