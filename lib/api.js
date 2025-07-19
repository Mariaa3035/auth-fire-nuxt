// lib/api.js
import axios from 'axios'

const apiKey = process.env.FIREBASE_API_KEY

const axiosInstance = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1', // for Firebase Auth
})

export const authApi = {
  signUp(email, password) {
    return axiosInstance.post(`/accounts:signUp?key=${apiKey}`, {
      email,
      password,
      returnSecureToken: true
    })
  },
  signIn(email, password) {
    return axiosInstance.post(`/accounts:signInWithPassword?key=${apiKey}`, {
      email,
      password,
      returnSecureToken: true
    })
  }
}
