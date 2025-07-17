<!-- default.js -->

<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Auth App</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="!$store.state.auth.user" to="/login">Login</b-nav-item>
          <b-nav-item v-if="!$store.state.auth.user" to="/signup">Sign Up</b-nav-item>
          <b-nav-item v-if="$store.state.auth.user" to="/dashboard">Dashboard</b-nav-item>
          <b-nav-item v-if="$store.state.auth.user" @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container class="py-3">
      <nuxt />
    </b-container>
  </div>
</template>
<script>
export default {
  name: 'DefaultLayout',
  mounted() {
    if (process.client) {
      // Add event listeners for user activity
      const activities = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']
      activities.forEach(activity => {
        document.addEventListener(activity, this.handleUserActivity)
      })
    }
  },
  beforeDestroy() {
    if (process.client) {
      // Remove event listeners
      const activities = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart']
      activities.forEach(activity => {
        document.removeEventListener(activity, this.handleUserActivity)
      })
    }
    this.$store.dispatch('auth/clearLogoutTimer')
  },
  methods: {
    handleUserActivity() {
      if (this.$store.state.auth.user) {
        this.$store.dispatch('auth/updateActivity')
      }
    }
  }
}
</script>