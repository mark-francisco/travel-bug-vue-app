<template>
  <div id="trips-index">
    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center pb-5">
          <div class="col-md-12 heading-section text-center ftco-animate">
            <span class="subheading">Welcome, _current user_</span>
            <h2 class="mb-4">Here is your list of Trips:</h2>
            <p>Select a Trip to see more details and make edits:</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-4 ftco-animate">
            <div class="project">
              <div class="img">
                <a href="destination.html">
                  <img src="ecoland-master/images/destination-1.jpg" class="img-fluid" alt="Colorlib Template" />
                </a>
              </div>
              <div class="text">
                <h4 class="price">ID: 1</h4>
                <span>Trip Owner + Trip Collaborator</span>
                <h3><a href="destination.html">Trip Title</a></h3>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 ftco-animate">
            <div class="project">
              <div class="img">
                <a href="destination.html">
                  <img src="ecoland-master/images/destination-2.jpg" class="img-fluid" alt="Colorlib Template" />
                </a>
              </div>
              <div class="text">
                <h4 class="price">ID: 2</h4>
                <span>Trip Owner + Trip Collaborator</span>
                <h3><a href="destination.html">Trip Title</a></h3>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 ftco-animate">
            <div class="project">
              <div class="img">
                <a href="destination.html">
                  <img src="ecoland-master/images/destination-3.jpg" class="img-fluid" alt="Colorlib Template" />
                </a>
              </div>
              <div class="text">
                <h4 class="price">$400</h4>
                <span>Trip Owner + Trip Collaborator</span>
                <h3><a href="destination.html">Trip Title</a></h3>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-lg-4 ftco-animate">
            <div class="project">
              <div class="img">
                <a href="destination.html">
                  <img src="ecoland-master/images/destination-4.jpg" class="img-fluid" alt="Colorlib Template" />
                </a>
              </div>
              <div class="text">
                <h4 class="price">$400</h4>
                <span>Trip Owner + Trip Collaborator</span>
                <h3><a href="destination.html">Trip Title</a></h3>
              </div>
              <a
                href="images/destination-4.jpg"
                class="icon image-popup d-flex justify-content-center align-items-center"
              >
                <span class="icon-expand"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- /////////////////////////////////// -->

    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <h1>Your Trips:</h1>
    <router-link to="/trips/new">
      <button>Add New Trip!</button>
    </router-link>
    <div v-for="trip in trips" v-bind:key="trip.id">
      <p>Trip ID: {{ trip.id }}</p>
      <p>Trip Title: {{ trip.title }}</p>
      <p>
        Trip Owner: {{ trip.owner.first_name }} {{ trip.owner.last_name }} -
        <em>"{{ trip.owner.username }}"</em>
      </p>
      <p v-if="trip.collaborator !== null">
        Trip Collaborator: {{ trip.collaborator.first_name }} {{ trip.collaborator.last_name }} -
        <em>"{{ trip.collaborator.username }}"</em>
      </p>
      <p>Trip Description: {{ trip.description }}</p>
      <p>Completed?: {{ trip.isComplete }}</p>
      <p>Logistics:</p>
      <li v-for="logistic in trip.logistics" v-bind:key="logistic.id">{{ logistic }}</li>
      <p>Ideas:</p>
      <li v-for="idea in trip.ideas" v-bind:key="idea.id">{{ idea }}</li>
      <router-link v-bind:to="`/trips/${trip.id}`">
        <button>More Info:</button>
      </router-link>
      <hr />
    </div>
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
