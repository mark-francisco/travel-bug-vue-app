<template>
  <div id="app">
    <!-- ECOLAND NAVBAR -->
    <nav
      class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light site-navbar-target"
      id="ftco-navbar"
    >
      <div class="container">
        <a class="navbar-brand" href="index.html">Travel Bug</a>
        <button
          class="navbar-toggler js-fh5co-nav-toggle fh5co-nav-toggle"
          type="button"
          data-toggle="collapse"
          data-target="#ftco-nav"
          aria-controls="ftco-nav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="oi oi-menu"></span>
          Menu
        </button>
        <div id="nav">
          <span v-if="!isLoggedIn()">
            <router-link to="/">Home</router-link>
            |
          </span>
          <router-link to="/about">About</router-link>
          <span v-if="isLoggedIn()">
            |
            <router-link to="/trips">My Trips</router-link>
          </span>
          <span v-if="!isLoggedIn()">
            |
            <router-link to="/signup">Sign Up</router-link>
          </span>
          <span v-if="!isLoggedIn()">
            |
            <router-link to="/login">Log In</router-link>
          </span>
          <span v-if="isLoggedIn()">
            |
            <router-link to="/logout">Log Out</router-link>
          </span>
        </div>
        <div class="collapse navbar-collapse" id="ftco-nav">
          <ul class="navbar-nav nav ml-auto">
            <li class="nav-item">
              <a href="#contact-section" class="nav-link">
                <span v-if="!isLoggedIn()">
                  <!-- Home -->
                  <router-link to="/">Home</router-link>
                </span>
              </a>
            </li>
            <li class="nav-item">
              <a href="#home-section" class="nav-link"><span>Home</span></a>
            </li>
            <!-- <li class="nav-item">
              <a href="#services-section" class="nav-link"><span>Services</span></a>
            </li> -->
            <li class="nav-item">
              <a href="#about-section" class="nav-link"><span>About</span></a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />

    <footer class="ftco-footer ftco-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">
                About
                <span><a href="index.html">Travel Bug</a></span>
              </h2>
              <p>
                Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the
                blind texts.
              </p>
              <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                <li class="ftco-animate">
                  <a href="#"><span class="icon-twitter"></span></a>
                </li>
                <li class="ftco-animate">
                  <a href="#"><span class="icon-facebook"></span></a>
                </li>
                <li class="ftco-animate">
                  <a href="#"><span class="icon-instagram"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4 ml-md-4">
              <h2 class="ftco-heading-2">Information</h2>
              <ul class="list-unstyled">
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    Online Enquiry
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    General Enquiry
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    Booking
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    Call Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Experience</h2>
              <ul class="list-unstyled">
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    Adventure
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    Hotel and Restaurant
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    Beach
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    Nature
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    Camping
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon-long-arrow-right mr-2"></span>
                    Party
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Have a Questions?</h2>
              <div class="block-23 mb-3">
                <ul>
                  <li>
                    <span class="icon icon-map-marker"></span>
                    <span class="text">203 Fake St. Mountain View, San Francisco, California, USA</span>
                  </li>
                  <li>
                    <a href="#">
                      <span class="icon icon-phone"></span>
                      <span class="text">+2 392 3929 210</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span class="icon icon-envelope"></span>
                      <span class="text">info@yourdomain.com</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 text-center">
            <p>
              <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
              Copyright &copy;
              {{ new Date().getFullYear() }}
              All rights reserved | This template is made with
              <i class="icon-heart color-danger" aria-hidden="true"></i>
              by
              <a href="https://colorlib.com" target="_blank">Colorlib</a>
              <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style></style>

<script>
export default {
  methods: {
    isLoggedIn: function () {
      // "jwt" is set in localStorage in Login.vue component.
      return localStorage.getItem("jwt");
    },
  },
};
</script>
