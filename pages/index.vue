<!-- index page -->
<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <h1 class="text-center">Welcome to the Auth App</h1>
        <p v-if="user" class="text-center mt-4">
          Hello, {{ user.email }}! You are logged in.
        </p>
        <p v-else class="text-center mt-4">
          Please <nuxt-link to="/login">login</nuxt-link> or <nuxt-link to="/signup">sign up</nuxt-link> to continue.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  }
}
</script>