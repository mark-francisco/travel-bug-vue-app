<template>
  <div class="signup">
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center pb-0 pb-mb-5 pt-5 pt-md-0">
          <div class="col-md-12 heading-section">
            <!-- on submit, prevent the browser from refreshing the page. instead, run the custom submit() method defined below. -->
            <h2 class="mb-4">Sign Up!</h2>
            <form v-on:submit.prevent="submit()">
              <ul>
                <li class="error-messages" v-for="error in errors" v-bind:key="error">
                  {{ error }}
                </li>
              </ul>
              <div class="row">
                <div class="col-md-12 tour-wrap">
                  <div class="form-group">
                    <label for="first-name">First Name:</label>
                    <input id="first-name" type="text" class="form-control" v-model="firstName" autofocus />
                  </div>
                  <div class="form-group">
                    <label>Last Name:</label>
                    <input type="text" class="form-control" v-model="lastName" />
                  </div>
                  <div class="form-group">
                    <label>Username:</label>
                    <input type="text" class="form-control" v-model="username" />
                  </div>
                  <div class="form-group">
                    <label>Email:</label>
                    <input type="email" class="form-control" v-model="email" />
                  </div>
                  <div class="form-group">
                    <label>Password:</label>
                    <input type="password" class="form-control" v-model="password" />
                  </div>
                  <div class="form-group">
                    <label>Password Confirmation:</label>
                    <input type="password" class="form-control" v-model="passwordConfirmation" />
                  </div>
                  <div class="form-group mt-5">
                    <input type="submit" class="btn btn-outline-success py-3 px-4" value="Sign Up!" />
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
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: [],
    };
  },
  created: function () {},
  methods: {
    submit: function () {
      let params = {
        // params must follow the Rails variable naming conventions (snake_case)
        first_name: this.firstName,
        last_name: this.lastName,
        username: this.username,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
      };
      axios
        .post("/api/users/", params)
        .then((res) => {
          console.log(res.data);
          // you can use the global variable "$router" to reference this Vue app's router (var declared in index.js from "vue-router" library).
          this.$router.push("/login");
        })
        .catch((err) => {
          // the Users create controller action can generate an array of multiple errors, which is why we return .errors, then display each array item
          this.errors = err.response.data.errors;
        });
    },
  },
};
</script>
