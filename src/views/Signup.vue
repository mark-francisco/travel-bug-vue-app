<template>
  <div class="signup">
    <!-- on submit, prevent the browser from refreshing the page. instead, run the custom submit() method defined below. -->
    <form v-on:submit.prevent="submit()">
      <h1>Sign Up!</h1>
      <ul>
        <li class="error-messages" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label for="first-name">First Name:</label>
        <input id="first-name" type="text" v-model="firstName" autofocus />
      </div>
      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" v-model="lastName" />
      </div>
      <div class="form-group">
        <label>Username:</label>
        <input type="text" v-model="username" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="email" />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="password" />
      </div>
      <div class="form-group">
        <label>Password Confirmation:</label>
        <input type="password" v-model="passwordConfirmation" />
      </div>
      <input type="submit" value="Sign Up!" />
    </form>
  </div>
</template>

<style scoped>
.error-messages {
  color: red;
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
