<template>
  <div id="trips-index">
    <section class="ftco-section">
      <ul>
        <li class="error-messages" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="row justify-content-center pb-5 pt-5" v-if="trips.length > 0">
        <div class="col-md-12 heading-section text-center">
          <span class="subheading">Welcome!</span>
          <h2 class="mb-4">Adding a new Trip?</h2>
          <p>
            <router-link to="/trips/new">
              <button class="btn btn-primary px-3 py-2">Add New Trip!</button>
            </router-link>
          </p>
        </div>
      </div>

      <div class="container" v-if="trips.length > 0">
        <div class="row justify-content-center pb-5">
          <div class="col-md-12 heading-section text-center">
            <span class="subheading">Trips</span>
            <h2 class="mb-4">Here is your current list of Trips:</h2>
            <p>Select one below to see more info and make edits:</p>
          </div>
        </div>
        <div class="row">
          <div v-for="trip in trips" v-bind:key="trip.id" class="col-md-6 col-lg-4">
            <div class="project">
              <router-link v-bind:to="`/trips/${trip.id}`">
                <div class="img">
                  <a>
                    <img src="ecoland-master/images/destination-1.jpg" class="img-fluid" alt="Colorlib Template" />
                  </a>
                </div>
                <div class="text">
                  <h4 class="price">ID: {{ trip.id }}</h4>
                  <span>
                    {{ trip.owner.first_name }} {{ trip.owner.last_name }}
                    <span v-if="trip.collaborator !== null">
                      | {{ trip.collaborator.first_name }} {{ trip.collaborator.last_name }}
                    </span>
                  </span>
                  <h3>
                    <a>{{ trip.title }}</a>
                  </h3>
                </div>
              </router-link>
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
</style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      trips: [],
      errors: [],
    };
  },
  created: function () {
    this.indexTrips();
  },
  methods: {
    indexTrips: function () {
      axios
        .get("/api/trips")
        .then((res) => {
          this.trips = res.data;
        })
        .catch((err) => {
          // the authenticate_user method used by the trips_controller only generates a single error with the key of "message", which is why we only need to return .data
          this.errors = err.response.data;
          console.log(err.response.data);
        });
    },
  },
};
</script>
