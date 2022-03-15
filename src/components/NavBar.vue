<template>
  <div>

    <span class="pcaNav" v-if="isLoggedIn">
      <p class="text-white">Signed in as {{Name}}</p>
      <a class="text-white" @click="logout">Sign Out</a>
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
  created: function() {
    this.GetName();
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isAuthenticated;
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