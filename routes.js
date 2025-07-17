// routes.js
export default [
  {
    path: '/',
    component: 'pages/index.vue'
  },
  {
    path: '/login',
    component: 'pages/login.vue',
    meta: {
      guest: true
    }
  },
  {
    path: '/signup',
    component: 'pages/signup.vue',
    meta: {
      guest: true
    }
  },
  {
    path: '/protected',
    component: 'components/ProtectedComponent.vue',
    meta: {
      protected: true
    }
  },
  {
    path: '/dashboard',
    component: 'pages/dashboard.vue',
    meta: {
      protected: true
    }
  }
]