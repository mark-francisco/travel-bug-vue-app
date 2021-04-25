<template>
  <div class="trips-edit">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>

    <h2>Edit this Trip:</h2>
    <router-link v-bind:to="`/trips/${this.$route.params.id}`">
      <button>Back to Trip page:</button>
    </router-link>
    <router-link to="/trips">
      <button>Back to All Trips</button>
    </router-link>

    <form class="trip-to-edit" v-if="tripToEdit" v-on:submit.prevent="updateTrip(tripToEdit)">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="tripToEdit.title" />
      </div>
      <div class="form-group">Description: {{ tripToEdit.description }}</div>
      <div class="form-group">Completed?: {{ tripToEdit.isComplete }}</div>
      <div class="form-group">
        Logistics:
        <li v-for="logistic in tripToEdit.logistics" v-bind:key="logistic.id">
          {{ logistic }}
        </li>
      </div>
      <div class="form-group">
        Ideas:
        <li v-for="idea in tripToEdit.ideas" v-bind:key="idea.id">
          {{ idea }}
        </li>
      </div>
      <input type="submit" value="Save Changes" />
    </form>
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
      tripToEdit: null,
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
          this.tripToEdit = res.data;
        })
        .catch(() => {
          this.errors = ["Unable to get this Trip"];
          // console.log(err.response);
        });
    },
    updateTrip: function () {
      // let params = {

      // };
      // axios.patch().then().catch();
      console.log(`edited trip "${this.tripToEdit.title}"!`);
      this.$router.push(`/trips/${this.tripToEdit.id}`);
    },
  },
};
</script>
