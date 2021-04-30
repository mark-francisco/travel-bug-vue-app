<template>
  <div class="home">
    <section
      class="ftco-intro img"
      id="destination-section"
      style="background-image: url(/ecoland-master/images/destination-single.jpg)"
    >
      <div class="overlay"></div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-9 text-center mt-4">
            <h1>Welcome to Travel Bug</h1>
            <p class="py-2 my-5">
              <router-link to="/signup">
                <button class="btn btn-white btn-lg mx-5 py-2 px-4">Sign Up</button>
              </router-link>
              <router-link to="/login">
                <button class="btn btn-black btn-lg mx-5 py-2 px-4">Log In</button>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
h1 {
  font-size: 70px;
  color: white;
}
</style>

<script>
export default {
  data: function () {
    return {};
  },
  created: function () {},
  methods: {},
};
</script>
