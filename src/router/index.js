import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/Login";
import Timesheet from "../views/Timesheet";
import ForgotPassword from "../views/ForgotPassword";
import ResetPassword from "../views/ResetPassword";
import LeaveRequest from "../views/LeaveRequest";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },
  {
    path: "/timesheet",
    name: "Timesheet",
    component: Timesheet,
    meta: { requiresAuth: true },
  },
  {
    path: "/forgotpassword",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: { guest: true },
  },
  {
    path: "/resetpassword",
    name: "ResetPassword",
    component: ResetPassword,
    meta: { requiresAuth: true },
  },
  {
    path: "/leaverequest",
    name: "LeaveRequest",
    component: LeaveRequest,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/timesheet");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;