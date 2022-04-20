<template>
  <!-- Code was commented / We ere using now routing
    <Budget /> -->
<!-- NAV added to handle vue router 4 -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Budget</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link active" aria-current="page"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link active" aria-current="page"
              >About</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/budget" class="nav-link active" aria-current="page"
              >Budget</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <router-view />
</template>

<script>
// import Budget from './components/Budget.vue'


export default {
  name: "App",
  components: {
    // Budget,
  },
};
</script>

<style>
</style>
