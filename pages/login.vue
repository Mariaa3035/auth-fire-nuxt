<template>
  <b-container class="mt-5">
    <b-row>
      <b-col cols="12" md="6" offset-md="3">
        <b-card title="Login" class="p-3">
          <b-form @submit.prevent="login">
            <b-form-group label="Email" label-for="email">
              <b-form-input
                id="email"
                v-model="$v.email.$model"
                :state="$v.email.$dirty ? !$v.email.$invalid : null"
                type="email"
                placeholder="Enter your email"
              ></b-form-input>
              <b-form-invalid-feedback v-if="$v.email.$dirty && !$v.email.required">
                Email is required.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="$v.email.$dirty && !$v.email.email">
                Please enter a valid email.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="Password" label-for="password">
              <b-form-input
                id="password"
                v-model="$v.password.$model"
                :state="$v.password.$dirty ? !$v.password.$invalid : null"
                type="password"
                placeholder="Enter your password"
              ></b-form-input>
              <b-form-invalid-feedback v-if="$v.password.$dirty && !$v.password.required">
                Password is required.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="$v.password.$dirty && !$v.password.minLength">
                Password must be at least 6 characters.
              </b-form-invalid-feedback>
            </b-form-group>
            <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>
            <b-button type="submit" variant="primary" block :disabled="$v.$invalid">Login</b-button>
          </b-form>
        </b-card>
        <p class="mt-3 text-center">
          Don't have an account? <nuxt-link to="/signup">Sign up</nuxt-link>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) }
  },
  methods: {
    async login() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      try {
        await this.$store.dispatch('auth/signIn', {
          email: this.email,
          password: this.password
        })
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = error.message || 'Login failed. Please try again.'
      }
    }
  }
}
</script>