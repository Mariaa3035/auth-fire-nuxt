// store auth1.js
import { auth } from '~/plugins/firebase'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

export const state = () => ({
  user: null,
  authenticated: false,
  loading: true,
  logoutTimer: null,
  sessionTimeout: 10000, // 1 minute in milliseconds
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user ? {
      uid: user.uid,
      email: user.email,
      // Add any other user properties you want to store
    } : null
    state.loading = false
  },
  CLEAR_USER(state) {
    state.user = null
    state.loading = false
  },
  SET_LOGOUT_TIMER(state, timer) {
    state.logoutTimer = timer
  },
  UPDATE_LAST_ACTIVITY(state) {
    state.lastActivity = Date.now()
  }
}

export const actions = {
  async signUp({ commit }, { email, password }) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      commit('SET_USER', userCredential.user)
    } catch (error) {
      console.error('Sign up error:', error)
      throw error
    }
  },


async signIn({ commit, dispatch }, { email, password }) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    commit('SET_USER', userCredential.user)
    
    // Start the auto-logout timer with the session timeout from state
    dispatch('setAutoLogout', state.sessionTimeout)
    
    return '/dashboard'
  } catch (error) {
    console.error('Sign in error:', error)
    throw error
  }

},


async signOut({ commit, dispatch }) {
  try {
    await signOut(auth)
    commit('CLEAR_USER')
    dispatch('clearLogoutTimer')
    return '/' // Return the redirect path
  } catch (error) {
    console.error('Sign out error:', error)
    throw error
  }
},
async initAuth({ commit }) {
    return new Promise((resolve) => {
      if (process.client) {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            commit('SET_USER', user)
          }
          unsubscribe()
          resolve()
        })
      } else {
        resolve()
      }
    })
  },
setAutoLogout({ dispatch, commit, state }, expirationTime) {
    // Clear any existing timer
    dispatch('clearLogoutTimer')
    
    // Set new timer
    const timer = setTimeout(async () => {
      const now = Date.now()
      const timeSinceLastActivity = now - state.lastActivity
      
      if (timeSinceLastActivity >= state.sessionTimeout) {
        await dispatch('signOut')
        // Redirect to login page after auto logout
        if (window) {
          window.$nuxt.$router.push('/login')
        }
      } else {
        // If there was activity, reset the timer with remaining time
        dispatch('setAutoLogout', state.sessionTimeout - timeSinceLastActivity)
      }
    }, expirationTime || state.sessionTimeout)
    
    commit('SET_LOGOUT_TIMER', timer)
  },
  
  updateActivity({ commit, dispatch, state }) {
    commit('UPDATE_LAST_ACTIVITY')
    // Reset the auto-logout timer
    dispatch('setAutoLogout', state.sessionTimeout)
  },
clearLogoutTimer({ state, commit }) {
  if (state.logoutTimer) {
    clearTimeout(state.logoutTimer)
    commit('SET_LOGOUT_TIMER', null)
  }

}}