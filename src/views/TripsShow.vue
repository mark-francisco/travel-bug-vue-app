<template>
  <div class="trips-show">
    <section
      class="hero-wrap"
      style="background-image: url('/ecoland-master/images/destination-single.jpg')"
      data-stellar-background-ratio="0.5"
    >
      <div class="overlay"></div>
      <div class="container">
        <div class="row no-gutters slider-text align-items-center justify-content-start">
          <div class="col-md-9 pb-4">
            <h1 class="mb-3 bread">Trip Title</h1>
          </div>
        </div>
      </div>
    </section>

    <!--  -->
    <ul>
      <li class="error-messages" v-for="error in errors" v-bind:key="error">
        {{ error }}
      </li>
    </ul>
    <div class="col-md-9 pb-4">
      <p>
        <a href="#" class="btn btn-primary py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-outline-primary py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-info py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-success py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-secondary py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-danger py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-warning py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-outline-dark py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-outline-secondary py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-outline-success py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-outline-info py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-outline-warning py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-outline-danger py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-outline-dark py-2 px-4">Book this tour</a>
        <a href="#" class="btn btn-black py-2 px-4">Watch Video</a>
      </p>
    </div>

    <section class="ftco-section ftco-services-2 ftco-no-pt">
      <div class="container">
        <div class="row justify-content-center pb-5">
          <div class="col-md-12 heading-section text-center">
            <span class="subheading">ID: Trip ID</span>
            <h2 class="mb-4">Trip Title</h2>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-12 tour-wrap">
            <div class="day-wrap">
              <h3 class="pl-5">Description:</h3>
              <p>
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language
                ocean.
              </p>
            </div>
          </div>
          <div class="col-md-12 tour-wrap">
            <br />
            <router-link
              v-if="currentTrip.owner_id === currentTrip.current_user.id"
              v-bind:to="`/trips/${currentTrip.id}/users/new`"
            >
              <button class="btn btn-outline-info py-2 px-2.5">Edit Collaborator:</button>
            </router-link>
            <br />

            <table class="table">
              <tbody>
                <tr>
                  <th scope="row">
                    <p>Trip Owner:</p>
                    <p>Trip Collaborator:</p>
                  </th>
                  <td>
                    <p>First Name + Last Name - username</p>
                    <p>First Name + Last Name - username</p>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Completed?</th>
                  <td>
                    <p>True</p>
                  </td>
                </tr>
                <tr>
                  <th scope="row">Logistics</th>
                  <td>
                    <ul>
                      <li>Airfare</li>
                      <li>5 star accomodation</li>
                    </ul>
                    <ul>
                      <li>Local transportation</li>
                      <li>Private Professional Guide</li>
                    </ul>
                  </td>
                </tr>

                <tr>
                  <th scope="row">Ideas</th>
                  <td>
                    <ul>
                      <li>Departure Taxes</li>
                      <li>Departure Taxes</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-md-12 tour-wrap">
            <div class="pt-5 mt-5">
              <div class="comment-form-wrap pt-5">
                <h3 class="mb-5">Leave a comment</h3>
                <form action="#" class="p-5 bg-light">
                  <div class="form-group">
                    <label for="name">Name *</label>
                    <input type="text" class="form-control" id="name" />
                  </div>
                  <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" class="form-control" id="email" />
                  </div>
                  <div class="form-group">
                    <label for="website">Website</label>
                    <input type="url" class="form-control" id="website" />
                  </div>

                  <div class="form-group">
                    <label for="message">Message</label>
                    <textarea name="" id="message" cols="30" rows="10" class="form-control"></textarea>
                  </div>
                  <div class="form-group">
                    <input type="submit" value="Post Comment" class="btn py-3 px-4 btn-primary" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- .section -->

    <h2>Trip Details:</h2>

    <router-link to="/trips">
      <button class="btn btn-outline-secondary py-2 px-2.5">Back to All Trips</button>
    </router-link>
    <div class="current-trip" v-if="currentTrip">
      <router-link v-bind:to="`/trips/${this.$route.params.id}/edit`">
        <button class="btn btn-outline-info py-2 px-4">Edit this Trip:</button>
      </router-link>
      <br />
      <br />
      <button
        class="btn btn-outline-danger py-2 px-2.5"
        v-if="currentTrip.owner_id === currentTrip.current_user.id"
        v-on:click="destroyTrip(currentTrip)"
      >
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
      <router-link
        v-if="currentTrip.owner_id === currentTrip.current_user.id"
        v-bind:to="`/trips/${currentTrip.id}/users/new`"
      >
        <button class="btn btn-outline-info py-2 px-2.5">Edit Collaborator:</button>
      </router-link>

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

      <h1>BIG ASS MAP GOES HERE</h1>
      <h1>JUST IMAGINE FOR NOW</h1>
      <h1>IT'S UNDER CONSTRUCTION</h1>

      <ul>
        <router-link v-bind:to="`/trips/${this.$route.params.id}/stops/new`">
          <input type="button" class="btn btn-primary py-2 px-4" value="Add Stop" />
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
          <router-link v-bind:to="`/trips/${currentTrip.id}/stops/${stop.id}/edit`">
            <button class="btn btn-outline-info py-2 px-4">Edit this Stop:</button>
          </router-link>
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
* {
  word-wrap: break-word;
}

table {
  table-layout: fixed;
  width: 100%;
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
