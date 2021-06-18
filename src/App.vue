<template>
  <div id="app">
    <!-- ECOLAND NAVBAR -->
    <nav
      class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-light ftco-navbar-light site-navbar-target"
      id="ftco-navbar"
    >
      <div class="container">
        <router-link to="/">
          <a class="navbar-brand" id="travel-bug-brand">Travel Bug</a>
        </router-link>
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
        <div class="collapse navbar-collapse" id="ftco-nav">
          <ul class="navbar-nav nav ml-auto">
            <li class="nav-item">
              <a class="nav-link">
                <span v-if="!isLoggedIn()">
                  <router-link to="/">Home</router-link>
                </span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <span>
                  <router-link to="/about">About</router-link>
                </span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <span v-if="isLoggedIn()">
                  <router-link to="/trips">My Trips</router-link>
                </span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <span v-if="!isLoggedIn()">
                  <router-link to="/signup">Sign Up</router-link>
                </span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <span v-if="!isLoggedIn()">
                  <router-link to="/login">Log In</router-link>
                </span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link">
                <span v-if="isLoggedIn()">
                  <router-link to="/logout">Log Out</router-link>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view />

    <footer class="ftco-footer ftco-section">
      <div class="container">
        <div class="row mb-3">
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">
                Thanks for stopping by
                <p>Our goal is to inspire a desire to explore.</p>
              </h2>
            </div>
          </div>
          <div class="col-md">
            <div class="ftco-footer-widget mb-4">
              <h2 class="ftco-heading-2">Have a Question?</h2>
              <div class="block-23 mb-3">
                <ul>
                  <li>
                    <span class="icon icon-map-marker"></span>
                    <span class="text">Western Hemisphere, Planet Earth</span>
                  </li>
                  <li>
                    <a href="https://github.com/mark-francisco">
                      <span class="icon icon-envelope"></span>
                      <span class="text">github.com/mark-francisco</span>
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

<style>
.nav-link a {
  color: black;
}
.nav-link a:hover {
  text-decoration: none;
  color: #e2c0bb;
  outline: none !important;
}

a #travel-bug-brand {
  color: black;
}
a #travel-bug-brand:hover {
  color: #e2c0bb !important;
}

.btn.btn-primary {
  background: #e2c0bb;
  border: 1px solid #e2c0bb !important;
  color: #fff !important;
}
.btn.btn-primary:hover {
  background: #fff !important;
  color: #e2c0bb !important;
}

.btn.btn-white {
  background: #fff !important;
  border: 1px solid #fff !important;
  color: #000000 !important;
}
.btn.btn-white:hover {
  background: #000 !important;
  color: #fff !important;
}

.btn.btn-black {
  background: #000000 !important;
  border: 1px solid #000000 !important;
  color: #fff !important;
}
.btn.btn-black:hover {
  background: #fff !important;
  color: #000000 !important;
}

.bg-light {
  background: #fff !important;
}
.ftco-navbar-light {
  -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
}

.ftco-navbar-light.scrolled {
  background: #fff !important;
}
.ftco-navbar-light .navbar-toggler {
  color: rgba(0, 0, 0, 0.5) !important;
}
</style>

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
