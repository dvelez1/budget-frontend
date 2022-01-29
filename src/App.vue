<template>
  <!-- <Budget /> -->
  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/budget">Budget</router-link> 
  </div>
  <router-view />
</template>

<script>
// import Budget from './components/Budget.vue'

export default {
  name: 'App',
  components: {
    // Budget,
  }
}
</script>

<style>

</style>
