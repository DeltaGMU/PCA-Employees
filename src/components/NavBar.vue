<template>
  <div>

    <span class="pcaNav" v-if="isLoggedIn">
      <p class="text-white">Signed in as {{getName}}</p>
      <a class="text-white" id="signOut" @click="logout">Sign Out</a>
    </span>

    <span class="pcaNav" v-else>
      <p class="text-white">Providence Christian Academy</p>
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