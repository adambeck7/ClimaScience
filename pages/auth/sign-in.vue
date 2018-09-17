<template>
  <div class="container">
    <div class="row">
      <div class="col m6 l6 s12">
        <h1 class="center">Sign Up & Do More.</h1>
        <p class="flow-text center">In order to take full advantage of ClimaScience, you must log in.</p>
        <p class="flow-text center">Registration grants access to data saving, trends, and all future updates. Take a moment to sign up and view all of ClimaScience's data for free.</p>
      </div>
      <div class="col m6 l6 s12 z-depth-3" id="auth">
        <div id="auth0-lock"/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'anonymous',
    mounted () {
      const showLogin = require('~/utils/lock').showLogin
      showLogin('auth0-lock')
    }
  }
</script>

<style scoped>

.container {
  margin-top: 20px;
  margin-bottom: 20px;
}

.col {
  padding: 30px;
}

#auth0-lock {
  z-index: 1 !important;
  position: relative;
}
</style>

