import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";
axios.defaults.baseURL =
  process.env.NODE_ENV === "production" ? "https://travel-bug-mark-francisco.herokuapp.com" : "/";

// when the user's logged in to an active session, read the jwt from localStorage
var jwt = localStorage.getItem("jwt");
// set the jwt so that it gets passed with axios requests
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
