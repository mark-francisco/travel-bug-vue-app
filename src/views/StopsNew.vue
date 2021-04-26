<template>
  <div id="stops-new">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>

    <form v-on:submit.prevent="createStop()">
      <h1>Add a Stop to your Trip!</h1>
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
        <input id="start-date" type="date" v-model="startDate" />
      </div>
      <div id="form-group">
        <label for="end-date">End Date:</label>
        <input id="end-date" type="date" v-model="endDate" />
      </div>
      <input type="submit" value="Add Stop!" />
    </form>

    <!-- modal that shows the list of available Destinations -->
    <dialog id="destinations-index">
      <form method="dialog">
        <h1>Destinations:</h1>
        <div v-for="destination in this.destinations" v-bind:key="destination.id">
          <li>
            {{ destination.name }}, {{ destination.country }}
            <button v-on:click="this.selectedDestination = destination">Select</button>
          </li>
        </div>
        <input type="button" value="Close" />
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
      selectedDestination: {},
      startDate: null,
      endDate: null,
      destinations: [],
      errors: [],
    };
  },
  methods: {
    createStop: function () {
      let params = {
        trip_id: this.$route.params.id,
        destination_id: this.selectedDestination.id,
        start_date: this.startDate,
        end_date: this.endDate,
      };
      axios
        .post("/api/stops", params)
        .then((res) => {
          console.log(res);
          this.$router.push(`/trips/${res.data.trip_id}`);
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
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
  },
};
</script>
