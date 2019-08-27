<template>
  <div id="app">
    <router-view/>
  </div>
</template>



<script>

  import home from '@/views/Home.vue'

  export default {
    name: "app",
    components: {
      home
    }
  }
</script>


<style lang="sass">
  body, html
    margin: 0
    padding: 0
  body
    background-color: #EFEFF4
  hr
    margin: 1rem 0 0
  *
    font-family: "Colibri", sans-serif
  button::-moz-focus-inner
    border: 0 !important
</style>