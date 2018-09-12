<template>
  <div class="card white">
    <div class="card-content black-text">
      <span class="card-title black-text">{{data}}86, {{label}}</span>
      <p>{{ozoneDiff}}</p>
      <p>
        Ozone 
      </p>
      <div class="card-action">
        <a href="#">LINK</a>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  props: ['data', 'label'],
  data () {
    return {
      averageHighTemp: 77,
      averageLowTemp: 86,
      ozone: {
        check: false,
        high: 500,
        low: 300,
        average: 400
      }
    }
  },
  computed: {
    ozoneDiff () {
      return this.ozoneAverage - this.data
    }
  },
  updated () {
    this.checkType()
  },
  methods: {
    checkType () {
      console.log(this.label)
    }
  }
}
</script>

<style>
</style>