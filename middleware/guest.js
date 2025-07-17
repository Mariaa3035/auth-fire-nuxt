// guest.js
export default function ({ store, redirect }) {
  if (store.state.auth.user && !store.state.auth.loading) {
    return redirect('/dashboard')
  }
}