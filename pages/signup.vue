
<template>
  <b-container class="mt-5">
    <b-row>
      <b-col cols="12" md="6" offset-md="3">
        <h2 class="text-center mb-4">Sign Up</h2>
        <b-form @submit.prevent="signup">
          <b-form-group label="Email" label-for="email">
            <b-form-input
              id="email"
              v-model="$v.email.$model"
              :state="!$v.email.$error"
              type="email"
              placeholder="Enter your email"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.email.required">
              Email is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.email.email">
              Please enter a valid email
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Password" label-for="password">
            <b-form-input
              id="password"
              v-model="$v.password.$model"
              :state="!$v.password.$error"
              type="password"
              placeholder="Enter your password"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.password.required">
              Password is required
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.password.minLength">
              Password must be at least 6 characters
            </b-form-invalid-feedback>
          </b-form-group>
          <b-form-group label="Confirm Password" label-for="confirmPassword">
            <b-form-input
              id="confirmPassword"
              v-model="$v.confirmPassword.$model"
              :state="!$v.confirmPassword.$error"
              type="password"
              placeholder="Confirm your password"
            ></b-form-input>
            <b-form-invalid-feedback v-if="!$v.confirmPassword.required">
              Please confirm your password
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.confirmPassword.sameAsPassword">
              Passwords must match
            </b-form-invalid-feedback>
          </b-form-group>
          <b-alert v-if="error" show variant="danger">{{ error }}</b-alert>
          <b-button type="submit" variant="primary" block :disabled="$v.$invalid">Sign Up</b-button>
        </b-form>
        <p class="mt-3 text-center">
          Already have an account? <nuxt-link to="/login">Login</nuxt-link>
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      error: null
    }
  },
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { 
      required,
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    async signup() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      try {
        await this.$store.dispatch('auth/signUp', {
          email: this.email,
          password: this.password
        })
        this.$router.push('/dashboard')
      } catch (error) {
        this.error = error.message || 'Signup failed. Please try again.'
      }
    }
  }
}
</script>