<template>
  <div id="stops-new">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>

    <section class="ftco-section">
      <div class="container">
        <div class="row justify-content-center pb-0 pb-mb-5 pt-5 pt-md-0">
          <div class="col-md-12 heading-section">
            <form class="search-property-1" v-on:submit.prevent="createStop()">
              <h2 class="mb-2">Add a Stop to your Trip!</h2>
              <router-link v-bind:to="`/trips/${this.$route.params.id}`">
                <button class="btn btn-outline-primary py-2 px-2.5 mb-4">Go back to Trip page</button>
              </router-link>
              <div class="form-group my-3">
                <label for="destination-id">Destination:</label>
                <input
                  id="destination-id"
                  class="mx-2"
                  type="text"
                  size="28"
                  v-model="selectedDestination.name"
                  disabled
                />

                <input type="button" class="btn btn-primary" v-on:click="indexDestinations()" value="Choose Dest." />
              </div>
              <div class="form-group">
                <label for="start-date">Start Date:</label>
                <input id="start-date" class="mx-2" type="date" v-model="startDate" />
              </div>
              <div class="form-group">
                <label for="end-date">End Date:</label>
                <input id="end-date" type="date" class="mx-2" v-model="endDate" />
              </div>
              <div class="form-group mt-5">
                <input type="submit" class="btn btn-outline-success py-3 px-4" value="Save Stop" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- modal that shows the list of available Destinations -->
    <dialog id="destinations-index">
      <form method="dialog">
        <h1>Destinations:</h1>
        <div class="col-sm-12 day-wrap" v-for="destination in sortedDestinations" v-bind:key="destination.id">
          <li>
            {{ destination.name }}, {{ destination.country }}
            <button class="btn btn-outline-dark btn-sm float-right" v-on:click="setDestination(destination)">
              Select
            </button>
          </li>
        </div>
        <input type="submit" class="btn btn-outline-secondary" value="Close" />
      </form>
    </dialog>
  </div>
</template>

<style scoped>
.error-messages {
  color: red;
}
dialog {
  width: 50%;
}
.day-wrap {
  margin-bottom: 0.6rem;
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
  computed: {
    sortedDestinations: function () {
      return this.destinations.slice().sort(function (a, b) {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    },
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
          // console.log(res);
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
    setDestination: function (dest) {
      return (this.selectedDestination = dest);
    },
  },
};
</script>
