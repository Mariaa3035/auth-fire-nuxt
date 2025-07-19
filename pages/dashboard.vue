<!-- dashboard.vue -->
<template>
  <AuthGuard mode="auth">
    <b-container class="mt-5">
      <h2>Welcome to your Dashboard!</h2>
      <p>You are logged in as: <strong>{{ userEmail }}</strong></p>
      <b-button @click="signOut" variant="outline-danger">Sign Out</b-button>
    </b-container>
  </AuthGuard >
</template>

<script>
import AuthGuard from '@/components/AuthGuard.vue'
export default {
  components: { AuthGuard },
  computed: {
    userEmail() {
      return this.$store.getters['auth/getUserEmail']
    }
  },
  methods: {
    async signOut() {
      try {
        await this.$store.dispatch('auth/signOut')
        this.$router.push('/signin')
      } catch (error) {
        console.error('Sign out error:', error)
      }
    }
  }
}
</script>
