<template>
  <div class="container mt-5">
    <h1 class="mb-4">Welcome to Our App</h1>
    <div v-if="!isAuthenticated">
      <b-button variant="primary" to="/signin" class="mr-2">Sign In</b-button>
      <b-button variant="success" to="/signup">Sign Up</b-button>
    </div>
    <div v-else>
      <b-button variant="info" to="/dashboard">Go to Dashboard</b-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    }
  }
}
</script>