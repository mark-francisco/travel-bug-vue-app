<template>
  <div class="trips-show">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <h2>Trip Details:</h2>
    <router-link to="/trips"><button>Back to All Trips</button></router-link>
    <div class="current-trip" v-if="currentTrip">
      <router-link v-bind:to="`/trips/${this.$route.params.id}/edit`"><button>Edit this Trip:</button></router-link>
      <br />
      <br />
      <button v-if="currentTrip.owner_id === currentTrip.current_user.id" v-on:click="destroyTrip(currentTrip)">
        Delete This Trip:
      </button>
      <br />
      <br />
      <p>ID: {{ currentTrip.id }}</p>
      <p>Title: {{ currentTrip.title }}</p>
      <p>
        Trip Owner: {{ currentTrip.owner.first_name }} {{ currentTrip.owner.last_name }} -
        <em>"{{ currentTrip.owner.username }}"</em>
      </p>
      <p v-if="currentTrip.collaborator !== null">
        Trip Collaborator: {{ currentTrip.collaborator.first_name }} {{ currentTrip.collaborator.last_name }} -
        <em>"{{ currentTrip.collaborator.username }}"</em>
      </p>
      <!-- use router-link -->
      <button>Add Collaborator:</button>
      <!-- use router-link -->
      <button>Remove Collaborator:</button>
      <p>Description: {{ currentTrip.description }}</p>
      <p>Completed?: {{ currentTrip.isComplete }}</p>
      <p>Logistics:</p>
      <li v-for="logistic in currentTrip.logistics" v-bind:key="logistic.id">
        {{ logistic }}
      </li>
      <p>Ideas:</p>
      <li v-for="idea in currentTrip.ideas" v-bind:key="idea.id">
        {{ idea }}
      </li>
      <ul>
        <router-link v-bind:to="`/trips/${this.$route.params.id}/stops/new`">
          <input type="button" value="Add Stop" />
        </router-link>
        <p>Stops:</p>

        <li v-for="stop in currentTrip.stops" v-bind:key="stop.id">
          <p>ID: {{ stop.id }}</p>
          <p>
            Destination ID: {{ stop.destination.id }} - {{ stop.destination.name }}, {{ stop.destination.country }} [{{
              stop.destination.lat
            }}, {{ stop.destination.lng }}]
          </p>
          <p>Start Date: {{ stop.start_date }}</p>
          <p>End Date: {{ stop.end_date }}</p>
          <!-- use router-link -->
          <!-- open up a modal? (SPA) -->
          <button>Edit this Stop:</button>
          <hr />
        </li>
      </ul>
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
