export default function ({ store, redirect, route }) {
  // Ensure auth is initialized
  if (!store.state.auth.authInitialized) {
    return store.dispatch('auth/initAuth').then(() => {
      checkAuth(store, redirect, route)
    })
  } else {
    checkAuth(store, redirect, route)
  }
}

function checkAuth(store, redirect, route) {
  const isAuthenticated = store.getters['auth/isAuthenticated']

  // Redirect authenticated users away from signin and signup pages
  if (isAuthenticated && (route.path === '/signin' || route.path === '/signup')) {
    return redirect('/dashboard')
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && route.meta.protected) {
    return redirect('/signin')
  }
}