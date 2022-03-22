import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import https from 'https'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "./css/style.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://jjservers.ddns.net:56709/";
axios.defaults.httpsAgent = new https.Agent({ 
  rejectUnauthorized: false,
  requestCert: true,
})

axios.interceptors.response.use(undefined, function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("LogOut");
      return router.push("/");
    }
  }
});

Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");