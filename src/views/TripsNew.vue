<template>
  <div id="trips-new">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>

    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center pb-0 pb-mb-5 pt-5 pt-md-0">
          <div class="col-md-12 heading-section">
            <h2 class="mb-4">Create New Trip:</h2>
            <router-link to="/trips">
              <button class="btn btn-outline-secondary py-2 px-2.5">Back to All Trips</button>
            </router-link>

            <div class="row">
              <div class="col-md-12 tour-wrap">
                <form class="pt-5 bg-light trip-to-edit" v-on:submit.prevent="createTrip()">
                  <div class="form-group">
                    <label for="title">Title:</label>
                    <input id="title" type="text" class="form-control" v-model="title" autofocus />
                  </div>
                  <div class="comment-form-wrap">
                    <div class="form-group">
                      <label for="description">Description:</label>
                      <textarea
                        id="description"
                        class="form-control"
                        v-model="description"
                        cols="30"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="isComplete">Completed?:</label>
                    <input id="isComplete" class="mx-2" type="checkbox" value="true" v-model="isComplete" />
                  </div>
                  <div class="form-group mt-5">
                    <button type="submit" class="btn btn-outline-success py-3 px-4">Add Trip!</button>
                  </div>
                </form>
              </div>
            </div>
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
