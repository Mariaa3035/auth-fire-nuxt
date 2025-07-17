import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3681915f = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _0da93534 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _18514346 = () => interopDefault(import('..\\pages\\signup.vue' /* webpackChunkName: "pages/signup" */))
const _4401921d = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _3681915f,
    name: "dashboard"
  }, {
    path: "/login",
    component: _0da93534,
    name: "login"
  }, {
    path: "/signup",
    component: _18514346,
    name: "signup"
  }, {
    path: "/",
    component: _4401921d,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
