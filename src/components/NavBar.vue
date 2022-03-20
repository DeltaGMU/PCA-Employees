<template>
  <div>

    <span class="pcaNav" v-if="isLoggedIn">
      <div class="centerInDiv">
        <p class="text-white">Signed in as {{getName}}</p>
      </div>
      <div class="centerInDiv">
        <div class="dropdown">
          <div class="profileBox" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fa-solid fa-user"></i>
            <i class="dropdown-caret fa-solid fa-angle-down" ></i>
          </div>
          <ul class="dropdown-menu">
            <li v-if=" getRole != 'administrator' && getCurrentPage() == '/timesheet' "><a class="dropdown-item" @click="goToLeaveRequest">Submit Leave Request</a></li>
            <li v-if=" getRole != 'administrator' && getCurrentPage() == '/leaverequest' "><a class="dropdown-item" @click="goToTimesheet">Submit Timesheet</a></li>
            <li><a class="dropdown-item" @click="logout">Sign Out</a></li>
          </ul>
        </div>
      </div>    
    </span>

    <span class="pcaNav" v-else>
      <p class="text-white navSection">Providence Christian Academy</p>
    </span>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NavBar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
    },
    getName: function() {
      return this.$store.getters.StateName;
    },
    getRole: function() {
      return this.$store.getters.StateRole;
    },
    ...mapGetters({Name: "StateName"}),
    ...mapGetters({Name: "StateRole"}),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/");
    },
    goToLeaveRequest() {
      this.$router.push("/leaverequest");
    },
    goToTimesheet() {
      this.$router.push("/timesheet");
    },
    getCurrentPage() {
      return window.location.pathname
    },
    ...mapActions(["GetName"]),
    ...mapActions(["GetRole"]),
  },
};
</script>