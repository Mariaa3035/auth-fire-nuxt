<template>
  <div v-if="!isLoading">
    <slot v-if="isAllowed" />
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: 'guest', // 'auth' or 'guest'
      validator: (val) => ['auth', 'guest'].includes(val)
    }
  },
  data() {
    return {
      isLoading: true
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']
    },
    isAllowed() {
      return (this.mode === 'auth' && this.isAuthenticated) ||
             (this.mode === 'guest' && !this.isAuthenticated)
    }
  },
  async mounted() {
    await this.$store.dispatch('auth/initAuth')
    this.isLoading = false

    if (!this.isAllowed) {
      this.$router.replace(this.mode === 'auth' ? '/signin' : '/dashboard')
    }
  }
}
</script>
