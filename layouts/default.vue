<template>
  <div>
    <my-header/>
    <nuxt />
    <my-footer/>
  </div>
</template>

<script>
import myHeader from '~/components/Navbar.vue'
import MyFooter from '~/components/Footer.vue'

export default {
  components: {
    MyFooter,
    myHeader
  }
}
</script>

