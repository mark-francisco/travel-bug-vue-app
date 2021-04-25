<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      <span v-if="isLoggedIn()">
        |
        <router-link to="/trips">My Trips</router-link>
      </span>
      <span v-if="!isLoggedIn()">
        |
        <router-link to="/signup">Sign Up</router-link>
      </span>
      <span v-if="!isLoggedIn()">
        |
        <router-link to="/login">Log In</router-link>
      </span>
      <span v-if="isLoggedIn()">
        |
        <router-link to="/logout">Log Out</router-link>
      </span>
    </div>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  methods: {
    isLoggedIn: function () {
      // "jwt" is set in localStorage in Login.vue component.
      return localStorage.getItem("jwt");
    },
  },
};
</script>
