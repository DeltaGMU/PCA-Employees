import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import "./css/style.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://jjservers.ddns.net:56709/";

/*
try {
  let retrieved_cert = '';
  axios.get("https://localhost:8080/cert.pem").then(
    resp => {
      retrieved_cert = resp.data;
    }
  ).then(() => {
    console.log(retrieved_cert);
    axios.defaults.httpsAgent = axios.defaults.httpsAgent = new https.Agent({ 
      rejectUnauthorized: false,
      requestCert: false,
      agent: false,
      ca: retrieved_cert
    })
  })
} catch(err) {
  console.log("Error retrieving CA cert");
}
*/

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