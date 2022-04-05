import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import config from "./server_config";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "./css/style.css";
import "./css/kiosk_style.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${config.python_server.https ? 'https' : 'http'}://${config.python_server.host}:${config.python_server.port}/`;

axios.interceptors.response.use(undefined, function(error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (store.getters.StateLastPage !== undefined) {
        if (store.getters.StateLastPage.startsWith("/kiosk")) {
          localStorage.clear()
          return router.push("/kiosk")
        }
      }
      else {
        localStorage.clear()
        return router.push("/")
      }
      // localStorage.clear();
      // store.dispatch("LogOut")
      // return router.push("/")
    }
  }
});

Vue.config.productionTip = false;
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");