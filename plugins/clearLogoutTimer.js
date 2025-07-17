export default ({ store }) => {
  if (process.client) {
    window.addEventListener('beforeunload', () => {
      store.dispatch('auth/clearLogoutTimer')
    })
  }
}