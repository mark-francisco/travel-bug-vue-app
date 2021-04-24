<template>
  <div class="trips-show">
    <h2>Trip Details:</h2>
    <div class="current-trip">
      <p>ID: {{ currentTrip.id }}</p>
      <p>Title: {{ currentTrip.title }}</p>
      <p>Owner ID: {{ currentTrip.owner_id }}</p>
      <p>Collaborator ID: {{ currentTrip.collaborator_id }}</p>
      <p>Description: {{ currentTrip.description }}</p>
      <p>Completed?: {{ currentTrip.isComplete }}</p>
      <p>Logistics: {{ currentTrip.logistics }}</p>
      <p>Ideas: {{ currentTrip.ideas }}</p>
    </div>
  </div>
</template>

<style scoped></style>
<script>
import axios from "axios";

export default {
  data: function () {
    return {
      currentTrip: "",
      errors: [],
    };
  },

  methods: {
    showTrip: function () {
      console.log("this is your trip.");
    },
  },
};
</script>
