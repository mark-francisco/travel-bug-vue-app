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
            <form class="search-property-1" v-on:submit.prevent="updateTripCollaborator()">
              <h2 class="mb-2">Update Trip Collaborator:</h2>
              <router-link v-bind:to="`/trips/${this.$route.params.id}`">
                <button class="btn btn-outline-primary py-2 px-2.5 mb-4">Back to Trip page</button>
              </router-link>
              <div class="form-group my-3">
                <label for="collaborator">User:</label>
                <input
                  id="collaborator"
                  class="mx-2"
                  type="text"
                  size="28"
                  v-if="selectedUser"
                  v-model="selectedUser.username"
                  disabled
                />

                <input type="button" class="btn btn-primary" v-on:click="indexUsers()" value="Select a User" />
              </div>

              <div class="form-group mt-5">
                <!-- only show the "Remove Collaborator" button if the current Trip has a collaborator -->
                <button
                  type="button"
                  class="btn btn-outline-danger py-3 px-4 float-right"
                  v-if="currentTrip && currentTrip.collaborator_id"
                  v-on:click="removeCollaborator(currentTrip)"
                >
                  Remove Collaborator:
                </button>

                <input type="submit" class="btn btn-outline-success py-3 px-4" value="Save Changes!" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- modal that shows the list of available Users -->
    <dialog id="users-index">
      <form method="dialog">
        <h1>Users:</h1>
        <input type="submit" class="btn btn-outline-secondary mb-3" value="Close" />
        <div class="col-sm-12 day-wrap" v-for="user in this.users" v-bind:key="user.id">
          <li>
            {{ user.first_name }} {{ user.last_name }} -
            <em>{{ user.username }}</em>
            <button class="btn btn-outline-dark btn-sm float-right" v-on:click="setUser(user)">Select</button>
          </li>
        </div>
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
      selectedUser: null,
      currentUser: null,
      users: [],
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
          // return Trip's current collaborator (User object) and set as selectedUser. If there's no current collaborator, set selectedUser to " " instead.
          this.selectedUser = res.data.collaborator || " ";
          this.currentUser = res.data.current_user;
          this.currentTrip = res.data;
        })
        .catch(() => {
          this.errors = ["Unable to get this Trip."];
        });
    },
    indexUsers: function () {
      axios.get("/api/users").then((res) => {
        // populate the users array on the front-end. we want to filter out the currently logged in User.
        // console.log(res.data);
        this.users = res.data.filter((eachUser) => {
          return eachUser.id !== this.currentUser.id;
        });
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
          this.$router.push(`/trips/${res.data.id}`);
        })
        .catch((err) => {
          this.errors = err.response.data.errors;
        });
    },
    removeCollaborator: function (trip) {
      let params = {
        collaborator_id: "",
      };
      if (confirm("Are you sure you want to remove your Trip's Collaborator?")) {
        axios
          .patch(`/api/trips/${trip.id}`, params)
          .then(() => {
            this.$router.push(`/trips/${trip.id}`);
          })
          .catch((err) => {
            this.errors = err.response.data.errors;
          });
      }
    },
  },
};
</script>
