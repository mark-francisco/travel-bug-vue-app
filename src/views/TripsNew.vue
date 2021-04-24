<template>
  <div id="trips-new">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>
    <form v-on:submit.prevent="createTrip()">
      <h1>Create New Trip:</h1>
      <div class="form-group">
        <label for="title">Title:</label>
        <input id="title" type="text" v-model="title" autofocus />
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input id="description" type="text" v-model="description" />
      </div>
      <div class="form-group">
        <label for="isComplete">Completed?:</label>
        <input id="isComplete" type="checkbox" value="true" v-model="isComplete" />
      </div>
      <button type="submit">Add Trip!</button>
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
      title: "",
      description: "",
      isComplete: false,
      errors: "",
    };
  },
  methods: {
    createTrip: function () {
      let params = {
        title: this.title,
        description: this.description,
        isComplete: this.isComplete,
      };
      axios
        .post("/api/trips/", params)
        .then((res) => {
          // re-direct to Trip Show page
          this.$router.push(`/trips/${res.data.id}`);
        })
        .catch((err) => {
          // console.log(err.response.data);
          this.errors = err.response.data.errors;
        });
    },
  },
};
</script>
