import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/Login";
import Timesheet from "../views/Timesheet";
import ForgotPassword from "../views/ForgotPassword";
import ResetPassword from "../views/ResetPassword";
import LeaveRequest from "../views/LeaveRequest";
import AdminDashboard from "../views/AdminDashboard";
import EmployeeInfo from "../views/EmployeeInfo";
import ManageAdmin from "../views/ManageAdmin";
import ManageEmployees from "../views/ManageEmployees";
import ManageStudents from "../views/ManageStudents";
import EditEmployee from "../views/EditEmployee";
import EditStudent from "../views/EditStudent";
import CreateEmployee from "../views/CreateEmployee";
import CreateStudent from "../views/CreateStudent";


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
    path: "/admindashboard",
    name: "AdminDashboard",
    component: AdminDashboard,
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
  {
    path: "/employeeinfo",
    name: "EmployeeInfo",
    component: EmployeeInfo,
    meta: { requiresAuth: true },
  },
  {
    path: "/manageadmin",
    name: "ManageAdmin",
    component: ManageAdmin,
    meta: { requiresAuth: true },
  },
  {
    path: "/manageemployees",
    name: "ManageEmployees",
    component: ManageEmployees,
    meta: { requiresAuth: true },
  },
  {
    path: "/managestudents",
    name: "ManageStudents",
    component: ManageStudents,
    meta: { requiresAuth: true },
  },
  {
    path: "/editemployee",
    name: "EditEmployee",
    component: EditEmployee,
    meta: { requiresAuth: true },
  },
  {
    path: "/editstudent",
    name: "EditStudent",
    component: EditStudent,
    meta: { requiresAuth: true },
  },
  {
    path: "/createEmployee",
    name: "CreateEmployee",
    component: CreateEmployee,
    meta: { requiresAuth: true },
  },
  {
    path: "/createStudent",
    name: "CreateStudent",
    component: CreateStudent,
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