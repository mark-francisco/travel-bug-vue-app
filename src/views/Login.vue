<template>
  <div class="login">
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center pb-0 pb-mb-5 pt-5 pt-md-0">
          <div class="col-md-12 heading-section">
            <h2 class="mb-4">Log In!</h2>
            <form v-on:submit.prevent="submit()">
              <ul>
                <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
                  {{ error }}
                </li>
              </ul>
              <div class="row">
                <div class="col-md-12 tour-wrap">
                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input id="email" type="email" class="form-control" v-model="email" autofocus />
                  </div>
                  <div class="form-group">
                    <label for="password">Password:</label>
                    <input id="password" type="password" class="form-control" v-model="password" />
                  </div>
                  <div class="form-group mt-5">
                    <input type="submit" class="btn btn-outline-success py-3 px-4" value="Log In!" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.error-messages {
  color: red;
}
form {
  color: black;
}
.form-control {
  width: 50%;
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

          // make it so that all future axios requests on this session will include the "jwt" in the header. axios headers are accessed by axios requests (think an equivalent to an Insomnia header).
          // set axios request header: "Authorization" = "Bearer _[your-jwt]_"
          axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.jwt;
          // the "jwt" is what gets returned as part of this request, whether made through Insomnia, axios, or otherwise.
          // save your newly created jwt that comes back in "res" to localStorage. localStorage can be accessed by the front-end browser.
          localStorage.setItem("jwt", res.data.jwt);

          // route the User to their Trips index page once they're logged in
          this.$router.push("/trips");
        })
        .catch((err) => {
          // the Sessions create controller action only generates a single error with the key of "message", which is why we only need to return .data
          console.log(err.response.data);
          this.errors = err.response.data;
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
