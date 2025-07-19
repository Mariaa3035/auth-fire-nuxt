<!-- signup.vue -->
<template>
  <AuthGuard>
    <b-container class="mt-5">
      <b-row align-h="center">
        <b-col cols="12" md="6">
          <h2 class="mb-4">Sign Up</h2>
          <b-form @submit.prevent="handleSignUp">
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
                <span v-if="!$v.form.email.required">Email is required.</span>
                <span v-if="!$v.form.email.email">Please enter a valid email address.</span>
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
                <span v-if="!$v.form.password.required">Password is required.</span>
                <span v-if="!$v.form.password.minLength">Password must be at least 6 characters long.</span>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Confirm Password" label-for="confirmPassword">
              <b-form-input
                id="confirmPassword"
                v-model.trim="$v.form.confirmPassword.$model"
                type="password"
                :state="!$v.form.confirmPassword.$error && $v.form.confirmPassword.$dirty"
                required
                @blur="$v.form.confirmPassword.$touch()"
              />
              <b-form-invalid-feedback v-if="$v.form.confirmPassword.$error && $v.form.confirmPassword.$dirty">
                <span v-if="!$v.form.confirmPassword.required">Please confirm your password.</span>
                <span v-if="!$v.form.confirmPassword.sameAsPassword">Passwords do not match.</span>
              </b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="loading || $v.$invalid">
              {{ loading ? 'Signing Up...' : 'Sign Up' }}
              <span v-if="$v.$invalid && $v.$dirty" class="ml-2 text-danger small">Please fix form errors</span>
            </b-button>

            <b-alert variant="danger" v-if="error" class="mt-3" show>
              {{ error }}
            </b-alert>
          </b-form>

          <p class="mt-3">Already have an account?
            <NuxtLink to="/signin">Sign In</NuxtLink>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </AuthGuard>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import AuthGuard from '@/components/AuthGuard.vue'

export default {
  components: {
    AuthGuard
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      loading: false,
      error: ''
    }
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required, minLength: minLength(6) },
        confirmPassword: {
          required,
          sameAsPassword: sameAs(function () {
            return this.form.password
          })
        }
      }
    }
  },
  methods: {
    async handleSignUp() {
      console.log('=== SIGNUP FORM SUBMITTED ===')
      console.log('Form data:', this.form)
      
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('Form is invalid. Validation errors:', this.$v.form)
        return
      }
      
      console.log('Form is valid. Making API call...')
      this.loading = true
      this.error = ''
      try {
        console.log('Calling store action auth/signUp')
        await this.$store.dispatch('auth/signUp', {
          email: this.form.email,
          password: this.form.password
        })
        console.log('Store action completed successfully')
        this.$router.push('/dashboard')
      } catch (error) {
        console.error('Sign up error:', error)
        switch(error.code) {
          case 'auth/email-already-in-use':
            this.error = 'This email is already in use. Please try another one.'
            break
          case 'auth/invalid-email':
            this.error = 'The email address is not valid.'
            break
          case 'auth/operation-not-allowed':
            this.error = 'Sign up is currently disabled. Please contact support.'
            break
          case 'auth/weak-password':
            this.error = 'The password is too weak. Please choose a stronger password.'
            break
          default:
            this.error = error.message || 'Sign up failed. Please try again.'
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>