<template>
<graph />
</template>

<script>
import graph from '~/components/Graph.vue'

export default {
  head () {
    return {
      title: `ClimaScience Graphing`
    }
  },
  components: {
    graph
  }
}
</script>
