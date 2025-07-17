// middleware/auth.js
export default function ({ store, redirect, route }) {
  // If the route is protected and user isn't authenticated
  if (route.meta.protected && !store.state.auth.user) {
    return redirect('/')
  }
  
  // If user is authenticated but trying to access auth pages
  if ((route.path === '/login' || route.path === '/signup') && store.state.auth.user) {
    return redirect('/dashboard')
  }

  // If user is not authenticated and trying to access the dashboard
  if (route.path === '/dashboard' && !store.state.auth.user) {
    return redirect('/')
  }

  // If user is not authenticated and trying to access the index page
  if (route.path === '/' && !store.state.auth.user) {
    return redirect('/login')
  }
}