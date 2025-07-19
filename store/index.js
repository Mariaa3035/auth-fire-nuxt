export const actions = {
  async nuxtClientInit({ dispatch }) {
    console.log('nuxtClientInit called')
    if (process.client) {
      console.log('Initializing auth from nuxtClientInit')
      await dispatch('auth/initAuth')
      console.log('Auth initialization completed from nuxtClientInit')
    }
  }
}
