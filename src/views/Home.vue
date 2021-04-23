<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <router-link to="/signup">
      <button>SIGN UP</button>
    </router-link>
    <router-link to="/login">
      <button>LOG IN</button>
    </router-link>
  </div>
</template>

<style scoped>
h1 {
  font-size: 70px;
}
button {
  background-color: #112;
  border: none;
  border-radius: 10px;
  color: white;
  padding: 15px 32px;
  margin: 30px;
  width: 250px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 26px;
}
</style>

<script>
export default {
  data: function () {
    return {
      message: "Welcome to Travel Bug",
    };
  },
  created: function () {},
  methods: {},
};
</script>
