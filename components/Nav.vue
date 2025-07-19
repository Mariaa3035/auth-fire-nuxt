<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">MyApp</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <template v-if="isAuthenticated">
          <b-nav-text class="text-white mr-3">{{ userEmail }}</b-nav-text>
          <b-button variant="outline-light" @click="signOut">Sign Out</b-button>
        </template>
        <template v-else>
          <b-nav-item to="/signin">Sign In</b-nav-item>
          <b-nav-item to="/signup">Sign Up</b-nav-item>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    userEmail() {
      return this.$store.getters['auth/getUserEmail']
    }
  },
  methods: {
    async signOut() {
      try {
        await this.$store.dispatch('auth/signOut')
        this.$router.push('/')
      } catch (error) {
        console.error('Error signing out:', error)
      }
    }
  }
}
</script>