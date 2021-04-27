<template>
  <div id="stops-edit">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>

    <form v-if="stopToEdit" v-on:submit.prevent="updateStop()">
      <h1>Edit Stop:</h1>
      <router-link v-bind:to="`/trips/${this.$route.params.id}`">
        <button>Go back to Trip page</button>
      </router-link>
      <div id="form-group">
        <label for="destination-id">Destination:</label>
        <input id="destination-id" type="text" v-model="selectedDestination.name" disabled />
      </div>
      <input type="button" v-on:click="indexDestinations()" value="Choose a Destination" />
      <div id="form-group">
        <label for="start-date">Start Date:</label>
        <input id="start-date" type="date" v-model="stopToEdit.start_date" />
      </div>
      <div id="form-group">
        <label for="end-date">End Date:</label>
        <input id="end-date" type="date" v-model="stopToEdit.end_date" />
      </div>
      <button type="submit">Save Stop!</button>
      <button type="button" v-on:click="deleteStop()">Delete Stop!</button>
    </form>

    <!-- modal that shows the list of available Destinations -->
    <dialog id="destinations-index">
      <form method="dialog">
        <h1>Destinations:</h1>
        <div v-for="destination in this.destinations" v-bind:key="destination.id">
          <li>
            {{ destination.name }}, {{ destination.country }}
            <button v-on:click="setDestination(destination)">Select</button>
          </li>
        </div>
        <input type="submit" value="Close" />
      </form>
    </dialog>
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
      stopToEdit: null,
      selectedDestination: {},
      destinations: [],
      errors: [],
    };
  },
  created: function () {
    this.showStop();
  },
  methods: {
    showStop: function () {
      axios
        .get(`/api/stops/${this.$route.params.stopID}`)
        .then((res) => {
          this.stopToEdit = res.data;
          this.selectedDestination = res.data.destination;
          // console.log(res.data);
          // console.log(res.data.destination);
        })
        .catch(() => {
          this.errors = ["Unable to get this Stop."];
        });
    },
    indexDestinations: function () {
      axios.get("/api/destinations").then((res) => {
        // populate the destinations array on the front-end
        this.destinations = res.data;
        // open up the modal on Vue template
        document.querySelector("#destinations-index").showModal();
      });
    },
    setDestination: function (dest) {
      return (this.selectedDestination = dest);
    },
    updateStop: function () {
      let params = {
        destination_id: this.selectedDestination.id,
        start_date: this.stopToEdit.start_date,
        end_date: this.stopToEdit.end_date,
      };
      axios
        .patch(`/api/stops/${this.stopToEdit.id}`, params)
        .then((res) => {
          // console.log(res);
          this.$router.push(`/trips/${res.data.trip_id}`);
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        });
    },
    deleteStop: function () {
      axios
        .delete(`/api/stops/${this.stopToEdit.id}`)
        .then(() => {
          // console.log(res);
          this.$router.push(`/trips/${this.$route.params.id}`);
        })
        .catch(() => {
          this.errors = ["Unable to delete this Stop."];
        });
    },
  },
};
</script>
