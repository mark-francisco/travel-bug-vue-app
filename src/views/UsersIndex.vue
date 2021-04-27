<template>
  <div id="stops-new">
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error.id">
        {{ error }}
      </li>
    </ul>

    <form v-on:submit.prevent="updateTripCollaborator()">
      <h1>Update Trip Collaborator!</h1>
      <router-link v-bind:to="`/trips/${this.$route.params.id}`">
        <button>Go back to Trip page</button>
      </router-link>
      <div id="form-group">
        <label for="collaborator">User:</label>
        <input id="collaborator" type="text" v-if="selectedUser" v-model="selectedUser.username" disabled />
      </div>
      <input type="button" v-on:click="indexUsers()" value="Select a User" />
      <input type="submit" value="Save Changes!" />
    </form>
    <!-- modal that shows the list of available Users -->
    <dialog id="users-index">
      <form method="dialog">
        <h1>Users:</h1>
        <div v-for="user in this.users" v-bind:key="user.id">
          <li>
            {{ user.first_name }} {{ user.last_name }} -
            <em>{{ user.username }}</em>
            <button v-on:click="setUser(user)">Select</button>
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
      selectedUser: null,
      users: [],
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
          // return Trip's current collaborator (User object) and set as selectedUser. If there's no current collaborator, set selectedUser to " " instead.
          this.selectedUser = res.data.collaborator || " ";
          // console.log(res.data.collaborator);
          // console.log(this.selectedUser);
        })
        .catch(() => {
          this.errors = ["Unable to get this Trip."];
        });
    },
    indexUsers: function () {
      axios.get("/api/users").then((res) => {
        // populate the users array on the front-end
        this.users = res.data;
        // open up the modal on Vue template
        document.querySelector("#users-index").showModal();
      });
    },
    setUser: function (user) {
      return (this.selectedUser = user);
    },
    updateTripCollaborator: function () {
      let params = {
        collaborator_id: this.selectedUser.id,
      };
      axios
        .patch(`/api/trips/${this.$route.params.id}`, params)
        .then((res) => {
          // console.log(res);
          this.$router.push(`/trips/${res.data.id}`);
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        });
    },
  },
};
</script>
