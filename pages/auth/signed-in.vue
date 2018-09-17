<template>
  <p>Signing in...</p>
</template>

<script>
import { setToken, checkSecret, extractInfoFromHash } from '~/utils/auth'

export default {
  mounted () {
    const {token, secret} = extractInfoFromHash()
    if (!checkSecret(secret) || !token) {
      console.error('Something went wrong with the sign in request.')
    }
    setToken(token)
    this.$router.replace('/')
  }
}
</script>
