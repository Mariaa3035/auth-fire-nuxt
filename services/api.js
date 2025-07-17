import axios from 'axios'

const api = axios.create({
  baseURL:process.env.API_BASE_URL || 'http://localhost:3000/api',
  // Other configurations...
})

export const authApi = {
  signUp(email, password) {
    return api.post('/signup', { email, password })
  },
  signIn(email, password) {
    return api.post('/signin', { email, password })
  },
  signOut() {
    return api.post('/signout')
  },
  // Other auth-related API calls...
}