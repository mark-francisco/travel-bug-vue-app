<template>
  <div class="login">
    <form v-on:submit.prevent="submit()">
      <h1>Log In!</h1>
      <ul>
        <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" />
      </div>
      <input type="submit" value="Log In!" />
    </form>
  </div>
</template>

<style>
.error-messages {
  color: red;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function () {
      let params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((res) => {
          // WE SET A JWT IN 2 PLACES: axios request headers & localStorage

          // make it so that any future axios request headers on this session include the "jwt". axios headers can be accessed by axios requests (think an equivalent to an Insomnia header).
          // set axios request header: "Authorization" = "Bearer _[your-jwt]_"
          axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.jwt;
          // the "jwt" is what gets returned as part of this request, whether made through Insomnia, axios, or otherwise.
          // save your newly created jwt that comes back in "res" to localStorage. localStorage can be accessed by the front-end browser.
          localStorage.setItem("jwt", res.data.jwt);

          // route the User to their Trips index page once they're logged in
          this.$router.push("/trips");
        })
        .catch((err) => {
          // console.log(err.response);
          // in the back-end, the User create action's error handling already generates an array.
          // however, the Sessions create action's error handling just generates a single string, which is why we must convert it into an array to be parsed here.
          this.errors = [err.response.data.message];
        });
    },
  },
};
</script>
