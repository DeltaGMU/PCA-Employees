<template>
  <div>

    <span class="pcaNav" v-if="isLoggedIn">
      <div class="centerInDiv">
        <p class="text-white">Signed in as {{getName}}</p>
      </div>
      <div class="centerInDiv">
        <div class="dropdown">
          <div class="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <!--<p class="profileBox">{{getInitials}}</p>-->
            <p class="profileBox"><i class="fas fa-user fa-2xl"></i></p>
          </div>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Submit Leave Request</a></li>
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
    getInitials: function() {
      let fullName = this.$store.getters.StateName.split(' ');
      let initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
      return initials.toUpperCase();
    },
    ...mapGetters({Name: "StateName"}),
  },
  methods: {
    async logout() {
      await this.$store.dispatch("LogOut");
      this.$router.push("/");
    },
    ...mapActions(["GetName"]),
  },
};
</script>