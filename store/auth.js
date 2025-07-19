import { authApi } from '@/lib/api'

export const state = () => ({
  user: null,
  authInitialized: false,
  authenticated: false,
  logoutTimer: null
})

export const getters = {
  isAuthenticated: state => state.authenticated,
  getUserEmail: state => state.user ? state.user.email : null,
  isAuthInitialized: state => state.authInitialized
}

export const mutations = {
  SET_USER(state, user) {
    state.user = user
    if (process.client) {
      if (user) {
        localStorage.setItem('auth_user', JSON.stringify(user))
      } else {
        localStorage.removeItem('auth_user')
      }
    }
  },
  SET_AUTH_INITIALIZED(state, value) {
    state.authInitialized = value
  },
  SET_AUTHENTICATED(state, authenticated) {
    state.authenticated = authenticated
    if (process.client) {
      localStorage.setItem('auth_authenticated', JSON.stringify(authenticated))
    }
  },
  SET_LOGOUT_TIMER(state, timer) {
    state.logoutTimer = timer
  }
}

export const actions = {
  async signUp({ commit, dispatch }, { email, password }) {
    try {
      const { data } = await authApi.signUp(email, password)
      commit('SET_USER', data)
      commit('SET_AUTHENTICATED', true)
      dispatch('setLogoutTimer')
      return data
    } catch (error) {
      console.error('Signup error:', error.response?.data?.error?.message || error.message)
      throw error
    }
  },

  async signIn({ commit, dispatch }, { email, password }) {
    try {
      const { data } = await authApi.signIn(email, password)
      commit('SET_USER', data)
      commit('SET_AUTHENTICATED', true)
      dispatch('setLogoutTimer')
      return data
    } catch (error) {
      console.error('Sign in error:', error.response?.data?.error?.message || error.message)
      throw error
    }
  },

async signOut({ commit, state }, { redirect = true } = {}) {
  try {
    commit('SET_USER', null)
    commit('SET_AUTHENTICATED', false)
    if (state.logoutTimer) {
      clearTimeout(state.logoutTimer)
      commit('SET_LOGOUT_TIMER', null)
    }

    if (process.client) {
      localStorage.removeItem('auth_user')
      localStorage.removeItem('auth_authenticated')
    }

    // Manual redirect if requested
    if (redirect && process.client) {
      window.location.href = '/signin' // hard redirect to clear all state
    }
  } catch (error) {
    console.error('Sign out error:', error)
    throw error
  }
}
,

setLogoutTimer({ commit, dispatch }, duration) {
  let timeout = duration

  if (process.client && !duration) {
    const parsed = parseInt(process.env.AUTH_LOGOUT_TIMEOUT_MS, 10)
    timeout = isNaN(parsed) ? 3600000 : parsed // default to 1 hour
  }

  const timer = setTimeout(() => {
    dispatch('signOut')
  }, timeout)

  commit('SET_LOGOUT_TIMER', timer)
},

  clearLogoutTimer({ commit, state }) {
    if (state.logoutTimer) {
      clearTimeout(state.logoutTimer)
      commit('SET_LOGOUT_TIMER', null)
    }
  },

  initAuth({ commit, dispatch }) {
    return new Promise((resolve) => {
      if (process.client) {
        const storedUser = localStorage.getItem('auth_user')
        const storedAuthenticated = localStorage.getItem('auth_authenticated')

        if (storedUser && storedAuthenticated === 'true') {
          const user = JSON.parse(storedUser)
          commit('SET_USER', user)
          commit('SET_AUTHENTICATED', true)
          dispatch('setLogoutTimer')
        }
      }

      commit('SET_AUTH_INITIALIZED', true)
      resolve()
    })
  }
}
