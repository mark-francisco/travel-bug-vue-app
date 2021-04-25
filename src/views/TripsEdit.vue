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
      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="tripToEdit.description" />
      </div>
      <div class="form-group">
        <label for="isComplete">Completed?:</label>
        <input type="checkbox" id="isComplete" v-model="tripToEdit.isComplete" true-value="true" false-value="false" />
      </div>
      <div class="form-group">
        <label>Logistics:</label>

        <div v-for="(logistic, index) in tripToEdit.logistics" v-bind:key="logistic.id">
          <input type="text" v-model="tripToEdit.logistics[index]" />
          <input type="button" v-on:click="removeFromLogistics(index)" value="X" />
        </div>
        <input type="button" v-on:click="addToLogistics()" value="Add another" />
      </div>
      <div class="form-group">
        <label>Ideas:</label>

        <div v-for="(idea, index) in tripToEdit.ideas" v-bind:key="idea.id">
          <input type="text" v-model="tripToEdit.ideas[index]" />
          <input type="button" v-on:click="removeFromIdeas(index)" value="X" />
        </div>
        <input type="button" v-on:click="addToIdeas()" value="Add another" />
      </div>
      <br />
      <br />
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
    addToLogistics: function () {
      this.tripToEdit.logistics = this.tripToEdit.logistics || [];
      this.tripToEdit.logistics.push("");
    },
    removeFromLogistics: function (index) {
      this.tripToEdit.logistics.splice(index, 1);
    },
    addToIdeas: function () {
      this.tripToEdit.ideas = this.tripToEdit.ideas || [];
      this.tripToEdit.ideas.push("");
    },
    removeFromIdeas: function (index) {
      this.tripToEdit.ideas.splice(index, 1);
    },
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
    updateTrip: function (trip) {
      let params = {
        title: this.tripToEdit.title,
        description: this.tripToEdit.description,
        isComplete: this.tripToEdit.isComplete,
        logistics:
          this.tripToEdit.logistics !== null
            ? this.tripToEdit.logistics.filter((logistic) => {
                return logistic !== "";
              })
            : [],
        ideas:
          this.tripToEdit.ideas !== null
            ? this.tripToEdit.ideas.filter((idea) => {
                return idea !== "";
              })
            : [],
      };
      axios
        .patch(`/api/trips/${trip.id}`, params)
        .then(() => {
          // console.log(res.data);
          this.$router.push(`/trips/${this.tripToEdit.id}`);
        })
        .catch((err) => {
          // console.log(err.response);
          this.errors = err.response.data.errors;
        });
    },
  },
};
</script>
