import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _11419e59 = () => import('../pages/two.vue' /* webpackChunkName: "pages/two" */).then(m => m.default || m)
const _02123212 = () => import('../pages/mysaves.vue' /* webpackChunkName: "pages/mysaves" */).then(m => m.default || m)
const _5ad4d997 = () => import('../pages/historicalData.vue' /* webpackChunkName: "pages/historicalData" */).then(m => m.default || m)
const _8c9b244c = () => import('../pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _42168617 = () => import('../pages/graphing.vue' /* webpackChunkName: "pages/graphing" */).then(m => m.default || m)
const _0e4c251a = () => import('../pages/one.vue' /* webpackChunkName: "pages/one" */).then(m => m.default || m)
const _842ceb5c = () => import('../pages/auth/signed-in.vue' /* webpackChunkName: "pages/auth/signed-in" */).then(m => m.default || m)
const _4043d4de = () => import('../pages/auth/sign-in.vue' /* webpackChunkName: "pages/auth/sign-in" */).then(m => m.default || m)
const _4e97aab3 = () => import('../pages/auth/sign-off.vue' /* webpackChunkName: "pages/auth/sign-off" */).then(m => m.default || m)
const _4d2b6ec2 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/two",
			component: _11419e59,
			name: "two"
		},
		{
			path: "/mysaves",
			component: _02123212,
			name: "mysaves"
		},
		{
			path: "/historicalData",
			component: _5ad4d997,
			name: "historicalData"
		},
		{
			path: "/about",
			component: _8c9b244c,
			name: "about"
		},
		{
			path: "/graphing",
			component: _42168617,
			name: "graphing"
		},
		{
			path: "/one",
			component: _0e4c251a,
			name: "one"
		},
		{
			path: "/auth/signed-in",
			component: _842ceb5c,
			name: "auth-signed-in"
		},
		{
			path: "/auth/sign-in",
			component: _4043d4de,
			name: "auth-sign-in"
		},
		{
			path: "/auth/sign-off",
			component: _4e97aab3,
			name: "auth-sign-off"
		},
		{
			path: "/",
			component: _4d2b6ec2,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
