import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _f3f41d56 = () => import('../pages/two.vue' /* webpackChunkName: "pages/two" */).then(m => m.default || m)
const _798a9eca = () => import('../pages/graphing.vue' /* webpackChunkName: "pages/graphing" */).then(m => m.default || m)
const _0eadf1d6 = () => import('../pages/about.vue' /* webpackChunkName: "pages/about" */).then(m => m.default || m)
const _7d68111b = () => import('../pages/historicalData.vue' /* webpackChunkName: "pages/historicalData" */).then(m => m.default || m)
const _6d9e406f = () => import('../pages/one.vue' /* webpackChunkName: "pages/one" */).then(m => m.default || m)
const _2e65cc9b = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



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
			component: _f3f41d56,
			name: "two"
		},
		{
			path: "/graphing",
			component: _798a9eca,
			name: "graphing"
		},
		{
			path: "/about",
			component: _0eadf1d6,
			name: "about"
		},
		{
			path: "/historicalData",
			component: _7d68111b,
			name: "historicalData"
		},
		{
			path: "/one",
			component: _6d9e406f,
			name: "one"
		},
		{
			path: "/",
			component: _2e65cc9b,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
