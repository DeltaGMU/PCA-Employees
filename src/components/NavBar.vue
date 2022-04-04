<template>
  <div>
    <span class="pcaNav" v-if="signed_in">
      <div class="ms-3 ms-md-4 centerInDiv">
        <p class="text-white">Signed in as {{name}}</p>
      </div>
      <div class="me-3 me-md-4 centerInDiv">
        <div class="dropdown" v-if="current_page !== '/kiosk/checkinmultiple'">
          <div class="profileBox" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-user"></i>
            <i class="dropdown-caret fa-solid fa-angle-down" ></i>
          </div>
          <ul class="dropdown-menu" v-if="role === 'administrator' && current_page !== '/kiosk/checkinmultiple'">
            <li><a class="dropdown-item" @click="goToLeaveRequest">Submit Leave Request</a></li>
            <li><a class="dropdown-item" @click="goToTimesheet">Submit Timesheet</a></li>
            <li><a class="dropdown-item" @click="logout">Sign Out</a></li>
          </ul>
          <ul class="dropdown-menu" v-else>
            <li v-if="current_page == '/timesheet'"><a class="dropdown-item" @click="goToLeaveRequest">Submit Leave Request</a></li>
            <li v-if="current_page == '/leaverequest'"><a class="dropdown-item" @click="goToTimesheet">Submit Timesheet</a></li>
            <li><a class="dropdown-item" @click="logout">Sign Out</a></li>
          </ul>
        </div>
        <div v-if="current_page === '/kiosk/checkinmultiple'">
          <button type="button" class="btn formBtn p-1" @click="logout">Sign Out</button>
        </div>
      </div>    
    </span>

    <span class="pcaNav" v-else>
      <p class="ms-3 ms-md-4 text-white navSection">Providence Christian Academy</p>
      <div v-if="kioskGuestPaths.includes(current_page)">
        <button type="button" class="btn formBtn p-1" @click="goToKioskHome">Cancel</button>
      </div>
    </span>

  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    signed_in: Boolean,
    name: String,
    role: String,
    current_page: String
  },
  data() {
    return {
      kioskGuestPaths: ["/kiosk/studentfinder", "/kiosk/checkinandcheckout", "/kiosk/careoptions"],
    }
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      if (this.current_page == "/kiosk/checkinmultiple") {
        this.$router.push("/kiosk")
      }
      else {
        this.$router.push("/");
      }
      // this.current_page = "/";
    },
    goToLeaveRequest() {
      this.$router.push("/leaverequest");
      // this.current_page = window.location.pathname;
    },
    goToTimesheet() {
      this.$router.push("/timesheet");
      // this.current_page = window.location.pathname;
    },
    goToKioskHome() {
      this.$router.push("/kiosk");
    }
  },
};
</script>