<template>
  <div id="stops-new">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>

    <form v-on:submit.prevent="createStop()">
      <h1>Add a Stop to your Trip!</h1>
      <div id="form-group">
        <label for="destination-id">Destination ID:</label>
        <input id="destination-id" type="text" v-model="destinationID" autofocus />
      </div>
      <div id="form-group">
        <label for="start-date">Start Date:</label>
        <input id="start-date" type="date" v-model="startDate" />
      </div>
      <div id="form-group">
        <label for="end-date">End Date:</label>
        <input id="end-date" type="date" v-model="endDate" />
      </div>
    </form>
  </div>
</template>

<style scoped>
.error-messages {
  color: red;
}
</style>

<script>
// import axios from "axios";

export default {
  data: function () {
    return {
      destinationID: this.destinationID,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  },
  // methods: {
  //   createStop: function () {
  //     let params = {
  //       // we want this to default to current Trip
  //       tripID: this.tripID,
  //       destinationID: this.destinationID,
  //       startDate: this.startDate,
  //       endDate: this.endDate,
  //     };
  //     axios
  //       .post("/api/stops")
  //       .then((res) => {
  //         this.$router.push(`/api/trips/${tripID}`);
  //       })
  //       .catch((err) => {});
  //   },
  // },
};
</script>
