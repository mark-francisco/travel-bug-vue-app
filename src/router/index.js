import Vue from "vue";
import VueRouter from "vue-router";
// this is where you will import the new Vue components that you create in ../views
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import TripsIndex from "../views/TripsIndex.vue";
import TripsNew from "../views/TripsNew.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    component: About,
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: Signup,
  },
  {
    path: "/login",
    name: "Log In",
    component: Login,
  },
  {
    path: "/logout",
    name: "Log Out",
    component: Logout,
  },
  {
    path: "/trips",
    name: "Trips Index",
    component: TripsIndex,
  },
  {
    path: "/trips/new",
    name: "Trips New",
    component: TripsNew,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
