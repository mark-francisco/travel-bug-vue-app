<template>
  <div class="trips-edit">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>

    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center pb-0 pb-mb-5 pt-5 pt-md-0">
          <div class="col-md-12 heading-section">
            <h2 class="mb-4">Edit this Trip:</h2>
            <router-link v-bind:to="`/trips/${this.$route.params.id}`">
              <button class="btn btn-outline-primary py-2 px-2.5 mr-4">Back to Trip page</button>
            </router-link>
            <router-link to="/trips">
              <button class="btn btn-outline-secondary py-2 px-2.5">Back to All Trips</button>
            </router-link>
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 tour-wrap">
            <div>
              <div class="comment-form-wrap">
                <form class="pt-5 bg-light trip-to-edit" v-if="tripToEdit" v-on:submit.prevent="updateTrip(tripToEdit)">
                  <div class="form-group">
                    <label for="title">Title:</label>
                    <input type="text" id="title" class="form-control" v-model="tripToEdit.title" />
                  </div>
                  <div class="form-group">
                    <label for="description">Description:</label>
                    <textarea
                      cols="30"
                      rows="5"
                      id="description"
                      class="form-control"
                      v-model="tripToEdit.description"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="isComplete">Completed?:</label>
                    <input
                      type="checkbox"
                      id="isComplete"
                      class="mx-2"
                      v-model="tripToEdit.isComplete"
                      true-value="true"
                      false-value="false"
                    />
                  </div>
                  <div class="search-wrap-1 p-4">
                    <div class="search-property-1">
                      <div class="row">
                        <div class="col-lg align-items-end mb-3">
                          <div class="form-group mb-4">
                            <label>Logistics:</label>
                            <div
                              class="py-2"
                              v-for="(logistic, index) in tripToEdit.logistics"
                              v-bind:key="logistic.id"
                            >
                              <input type="text" class="form-control" v-model="tripToEdit.logistics[index]" />
                              <input
                                type="button"
                                class="btn btn-outline-danger mb-1 py-2"
                                v-on:click="removeFromLogistics(index)"
                                value="X"
                              />
                            </div>
                            <input
                              type="button"
                              class="btn btn-primary py-2 px-4"
                              v-on:click="addToLogistics()"
                              value="Add another"
                            />
                          </div>
                        </div>
                        <div class="col-lg align-items-end mb-3">
                          <div class="form-group mb-4">
                            <label>Ideas:</label>
                            <div class="py-2" v-for="(idea, index) in tripToEdit.ideas" v-bind:key="idea.id">
                              <input type="text" class="form-control" v-model="tripToEdit.ideas[index]" />
                              <input
                                type="button"
                                class="btn btn-outline-danger mb-1 py-2"
                                v-on:click="removeFromIdeas(index)"
                                value="X"
                              />
                            </div>
                            <input
                              type="button"
                              class="btn btn-primary py-2 px-4"
                              v-on:click="addToIdeas()"
                              value="Add another"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="form-group mt-5">
                        <input type="submit" class="btn btn-outline-success py-3 px-4" value="Save Changes" />
                      </div>
                    </div>
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
.search-property-1 .form-group .form-control {
  display: inline !important;
  width: 90%;
  color: rgba(0, 0, 0, 1) !important;
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
      tripToEdit: null,
      errors: [],
    };
  },
  created: function () {
    this.showTrip();
  },
  methods: {
    addToLogistics: function () {
      this.tripToEdit.logistics = this.tripToEdit.logistics || [];
      this.tripToEdit.logistics.push("");
    },
    removeFromLogistics: function (index) {
      this.tripToEdit.logistics.splice(index, 1);
    },
    addToIdeas: function () {
      this.tripToEdit.ideas = this.tripToEdit.ideas || [];
      this.tripToEdit.ideas.push("");
    },
    removeFromIdeas: function (index) {
      this.tripToEdit.ideas.splice(index, 1);
    },
    showTrip: function () {
      axios
        .get(`/api/trips/${this.$route.params.id}`)
        .then((res) => {
          this.tripToEdit = res.data;
        })
        .catch(() => {
          this.errors = ["Unable to get this Trip"];
          // console.log(err.response);
        });
    },
    updateTrip: function (trip) {
      let params = {
        title: this.tripToEdit.title,
        description: this.tripToEdit.description,
        isComplete: this.tripToEdit.isComplete,
        logistics:
          this.tripToEdit.logistics !== null
            ? this.tripToEdit.logistics.filter((logistic) => {
                return logistic !== "";
              })
            : [],
        ideas:
          this.tripToEdit.ideas !== null
            ? this.tripToEdit.ideas.filter((idea) => {
                return idea !== "";
              })
            : [],
      };
      axios
        .patch(`/api/trips/${trip.id}`, params)
        .then(() => {
          // console.log(res.data);
          this.$router.push(`/trips/${this.tripToEdit.id}`);
        })
        .catch((err) => {
          // console.log(err.response);
          this.errors = err.response.data.errors;
        });
    },
  },
};
</script>
