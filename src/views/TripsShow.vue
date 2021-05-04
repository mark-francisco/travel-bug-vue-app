<template>
  <div class="trips-show">
    <section
      class="hero-wrap"
      style="background-image: url('/ecoland-master/images/destination-single.jpg')"
      data-stellar-background-ratio="0.5"
    ></section>

    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <div class="container">
      <router-link to="/trips">
        <button class="btn btn-outline-secondary py-2 px-2.5">Back to All Trips</button>
      </router-link>
    </div>
    <section class="ftco-section ftco-services-2 ftco-no-pt">
      <div class="container current-trip" v-if="currentTrip">
        <div class="row justify-content-center pb-2">
          <div class="col-md-12 heading-section text-center">
            <span class="subheading">ID: {{ currentTrip.id }}</span>
            <h2 class="mb-4">{{ currentTrip.title }}</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 tour-wrap">
            <div class="day-wrap">
              <h3 class="pl-5">Description:</h3>
              <p>
                {{ currentTrip.description }}
              </p>
            </div>
          </div>

          <div class="col-md-12 tour-wrap">
            <br />
            <router-link v-bind:to="`/trips/${this.$route.params.id}/edit`">
              <button class="btn btn-outline-info py-2 px-4">Edit this Trip:</button>
            </router-link>
            <button
              class="btn btn-outline-danger py-2 px-2.5 float-right"
              v-if="currentTrip.owner_id === currentTrip.current_user.id"
              v-on:click="destroyTrip(currentTrip)"
            >
              Delete This Trip:
            </button>
            <br />
            <br />
          </div>

          <div class="col-md-12 tour-wrap">
            <br />
            <router-link
              v-if="currentTrip.owner_id === currentTrip.current_user.id"
              v-bind:to="`/trips/${currentTrip.id}/users/new`"
            >
              <button class="btn btn-outline-info py-2 px-2.5">Edit Collaborator:</button>
            </router-link>
            <br />

            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">
                    <p>Trip Owner:</p>
                    <p>Trip Collaborator:</p>
                  </th>
                  <td>
                    <p>
                      {{ currentTrip.owner.first_name }} {{ currentTrip.owner.last_name }} -
                      <em>"{{ currentTrip.owner.username }}"</em>
                    </p>
                    <p v-if="currentTrip.collaborator !== null">
                      {{ currentTrip.collaborator.first_name }}
                      {{ currentTrip.collaborator.last_name }} -
                      <em>"{{ currentTrip.collaborator.username }}"</em>
                    </p>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Completed?</th>
                  <td>
                    <p>{{ currentTrip.isComplete }}</p>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Logistics</th>
                  <td>
                    <ul>
                      <li v-for="logistic in currentTrip.logistics" v-bind:key="logistic.id">
                        {{ logistic }}
                      </li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <th scope="row">Ideas</th>
                  <td>
                    <ul>
                      <li v-for="idea in currentTrip.ideas" v-bind:key="idea.id">
                        {{ idea }}
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <section class="ftco-section bg-light">
              <div class="container">
                <div class="row justify-content-center mb-2 pb-2">
                  <div class="col-md-7 heading-section text-center">
                    <h3 class="mb-3">List of Stops:</h3>
                    <router-link v-bind:to="`/trips/${this.$route.params.id}/stops/new`">
                      <input type="button" class="btn btn-primary py-2 px-4" value="Add Stop" />
                    </router-link>
                  </div>
                </div>
                <div class="row d-flex">
                  <div class="col-md-6 col-lg-4 d-flex" v-for="stop in currentTrip.stops" v-bind:key="stop.id">
                    <div class="blog-entry justify-content-end">
                      <router-link v-bind:to="`/trips/${currentTrip.id}/stops/${stop.id}/edit`">
                        <a class="block-20" style="background-image: url('/ecoland-master/images/bg_3.jpg')"></a>
                        <div class="text float-right d-block">
                          <div class="d-flex align-items-center pt-2 mb-4 topp">
                            <div class="two">
                              <span class="yr">{{ stop.start_date }}</span>
                              <span class="text-center yr">-</span>
                              <span class="yr">{{ stop.end_date }}</span>
                            </div>
                          </div>

                          <h3 class="heading">
                            <p>
                              Destination: {{ stop.destination.name }}, {{ stop.destination.country }} [{{
                                stop.destination.lat
                              }}, {{ stop.destination.lng }}]
                            </p>
                          </h3>
                          <div class="d-flex align-items-center mt-4 meta">
                            <p class="mb-0">
                              <button class="btn btn-outline-info py-2 px-3">
                                Edit Stop:
                                <span class="ion-ios-arrow-round-forward"></span>
                              </button>
                            </p>
                            <p class="ml-auto mb-0">
                              <a class="meta-chat">ID: {{ stop.id }}</a>
                            </p>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="ftco-section ftco-no-pt ftco-no-pb">
              <div id="map" class="bg-white">Map under construction</div>
            </section>
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
* {
  word-wrap: break-word;
}

table {
  table-layout: fixed;
  width: 100%;
}
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      currentTrip: null,
      errors: [],
    };
  },
  created: function () {
    this.showTrip();
  },
  methods: {
    showTrip: function () {
      axios
        .get(`/api/trips/${this.$route.params.id}`)
        .then((res) => {
          this.currentTrip = res.data;
        })
        .catch(() => {
          this.errors = ["Unable to get this Trip"];
          // console.log(err.response);
        });
    },
    destroyTrip: function (trip) {
      axios
        .delete(`/api/trips/${trip.id}`)
        .then(() => {
          // console.log(res);
          this.$router.push("/trips");
        })
        .catch((err) => {
          // console.log(err.response.data);
          this.errors = err.response.data;
        });
    },
  },
};
</script>
