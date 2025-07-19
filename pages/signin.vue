<!-- signin.vue -->
<template>
  <AuthGuard>
    <b-container class="mt-5">
      <b-row align-h="center">
        <b-col cols="12" md="6">
          <h2 class="mb-4">Sign In</h2>
          <b-form @submit.prevent="handleSignIn">
            <b-form-group label="Email" label-for="email">
              <b-form-input
                id="email"
                v-model.trim="$v.form.email.$model"
                type="email"
                :state="!$v.form.email.$error && $v.form.email.$dirty"
                required
                @blur="$v.form.email.$touch()"
              />
              <b-form-invalid-feedback v-if="$v.form.email.$error && $v.form.email.$dirty">
                Email is required and must be valid.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Password" label-for="password">
              <b-form-input
                id="password"
                v-model.trim="$v.form.password.$model"
                type="password"
                :state="!$v.form.password.$error && $v.form.password.$dirty"
                required
                @blur="$v.form.password.$touch()"
              />
              <b-form-invalid-feedback v-if="$v.form.password.$error && $v.form.password.$dirty">
                Password is required.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="loading || $v.$invalid">
              {{ loading ? 'Signing In...' : 'Sign In' }}
            </b-button>

            <b-alert variant="danger" v-if="error" class="mt-3" show>
              {{ error }}
            </b-alert>
          </b-form>

          <p class="mt-3">Don't have an account?
            <NuxtLink to="/signup">Sign Up</NuxtLink>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </AuthGuard>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import AuthGuard from '@/components/AuthGuard.vue'
export default {
  components: {
    AuthGuard
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      error: ''
    }
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required }
      }
    }
  },
  methods: {
    async handleSignIn() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      
      this.loading = true
      this.error = ''
      try {
        await this.$store.dispatch('auth/signIn', {
          email: this.form.email,
          password: this.form.password
        })
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Sign in error:', error)
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          switch(error.response.status) {
            case 401:
              this.error = 'Invalid email or password. Please try again.'
              break
            case 403:
              this.error = 'This account has been disabled. Please contact support.'
              break
            case 429:
              this.error = 'Too many failed login attempts. Please try again later.'
              break
            default:
              this.error = 'An unexpected error occurred. Please try again later.'
          }
        } else if (error.request) {
          // The request was made but no response was received
          this.error = 'Unable to connect to the server. Please check your internet connection.'
        } else {
          // Something happened in setting up the request that triggered an Error
          this.error = 'An unexpected error occurred. Please try again later.'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>