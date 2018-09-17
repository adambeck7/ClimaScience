<template>
  <div>
    <div id='side-nav'>
      <div class="container" id='side-nav-header'>
        <h1><i class="fas fa-atom"></i></h1>
        <h5>ClimaScience</h5>
      </div>
      <div id="side-nav-links">
        <ul>
          <li><a href="/" class="navbar-link tab waves-effect waves-teal">Home</a></li>
          <li><a href="/graphing" class="navbar-link tab waves-effect waves-teal">Data</a></li>
          <li><a href="/mysaves" class="navbar-link tab waves-effect waves-teal">Climate Lab</a></li>
          <li><a href="/historicalData" class="navbar-link tab waves-effect waves-teal">Historical</a></li>
          <li v-if="isAuthenticated"><a href="/secret" class="navbar-link tab waves-effect waves-teal">Secret</a></li>
          <li v-if="!isAuthenticated"><a href="auth/sign-in" class="navbar-link tab waves-effect waves-teal">Sign in</a></li>
          <li v-else><a href="/auth/sign-off" class="navbar-link tab waves-effect waves-teal">Sign off</a></li>
        </ul>
      </div>
      <div id="side-nav-footer">
      </div>
    </div>
    <div id="greyout" @click='sideNavReduce()'></div>
    <div class="navbar-fixed">
      <nav id="nav_f" class="default_color" role="navigation">
        <div class="container">
          <div class="nav-wrapper">
            <a href="#" id="logo-container" class="brand-logo">ClimaScience</a>
            <ul class="right hide-on-med-and-down">
              <li><a href="/">Home</a></li>
              <li><a href="./graphing">Data</a></li>
              <li><a href="./about">Team</a></li>
              <li><a href="#contact">Contact</a></li>
              <li v-if="isAuthenticated"><a href="/secret">Secret</a></li>
              <li v-if="!isAuthenticated"><a href="auth/sign-in">Sign in</a></li>
              <li v-else><a href="/auth/sign-off">Sign off</a></li>
            </ul>
            <a @click='burgerDeploy()' href="#" data-activates="nav-mobile" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
export default {
  methods: {
    burgerDeploy () {
      let sideNav = document.getElementById('side-nav')
      sideNav.classList.add('nav-active')
      sideNav.classList.remove('nav-inactive')
      let grey = document.getElementById('greyout')
      grey.style.visibility = 'visible'
      $('#side-nav').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        sideNav.classList.remove('nav-active')
        sideNav.classList.add('nav-out')
        sideNav.classList.remove('nav-in')
      })
    },
    sideNavReduce () {
      let sideNav = document.getElementById('side-nav')
      let grey = document.getElementById('greyout')
      grey.style.visibility = 'hidden'
      sideNav.classList.add('nav-inactive')
      sideNav.classList.remove('nav-active')
      $('#side-nav').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        sideNav.classList.remove('nav-inactive')
        sideNav.classList.add('nav-in')
        sideNav.classList.remove('nav-out')
      })
    }
  },
  head () {
    return {
      link: [
        {rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.3.1/css/all.css'}
      ]
    }
  },
  computed: mapGetters(['isAuthenticated'])
}
</script>

<style>
@keyframes sidenavin {
  0% {margin-left: -300px;}
  100% {margin-left: 0px;}
}

@keyframes sidenavout {
  0% {margin-left: 0px;}
  100% {margin-left: -300px;}
}

#side-nav {
  margin-left: -300px;
  position: fixed;
  z-index: 500000; 
  background-color: white;
  width: 300px;
  height: 100%;
  border-right: 1px lightgray solid;
}

.nav-active {
  animation-name: sidenavin;
  animation-duration: 1s;
}

.nav-inactive {
  animation-name: sidenavout;
  animation-duration: 1s;
}

.nav-out {
  margin-left: 0px !important;
}

.nav-in {
  margin-left: -300px !important;
}

.tab {
  display: block !important;
  float: none !important;
  font-size: 16px;
  padding: 20px;
  color: black;
}

#side-nav i {
  -webkit-test-stroke: 2px white;
}

.tab:hover { 
  background-color: lightgray;
}

#side-nav-header {
  text-align: center;
  color: #1c263b;
  border-bottom: 1px lightgray solid;
}

#greyout {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #7f7f7f;
  z-index: 50000;
  opacity: .5;
  visibility: hidden;
}
</style>
