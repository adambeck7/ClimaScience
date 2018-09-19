<template>
  <div>
    <div class="row">
      <div class="col s12">
        <h5>UV Index</h5>
        <div class="w3-border w3-round w3-xlarge" style="height:30px;">
          <div :style='uvIndexProg.css' class="w3-round w3-center w3-container"></div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12" v-if='value <=2'>
        <p>This is a low ultraviolet index. Wear sunglasses if it's bright.</p>
        <div class="card white">
          <div class="card-content black-text">
            <span class="card-title green-text"><h4><i class="fas fa-sun"></i></h4></span>
            <p>Apply SPF 30+ sunscreen and cover up if you burn easily.</p>
          </div>
        </div>
      </div>
      <div class="col s12" v-if='value > 2 && value <= 5'>
        <p>This is a moderate ultraviolet index. Try to keep out of the sun during the midday hours.</p>
        <div class="card white">
          <div class="card-content black-text">
            <span class="card-title yellow-text"><h4><i class="fas fa-sun"></i></h4></span>
            <p>Apply SPF 30+ sunscreen every two hours, even when cloudy.</p>
          </div>
        </div>
      </div>
      <div class="col s12" v-if='value > 5 && value <=7'>
        <p>This is a high ultraviolet index. Unprotected skin and eyes are subject to damage.</p>
        <div class="card white">
          <div class="card-content black-text">
            <span class="card-title orange-text"><h4><i class="fas fa-sun"></i></h4></span>
            <p>Generouly apply SPF 30+ sunscreen every two hours, even on cloudy days. Wear UV-blocking sunglasses.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col s12" v-if='value > 7 && value <= 10'>
      <p>This is a very high ultraviolet index. Take extra precaution as skin and eyes can burn very quickly. Minimize sun exposure during daylight hours.</p>
      <div class="card white">
        <div class="card-content black-text">
          <span class="card-title red-text"><h4><i class="fas fa-sun"></i></h4></span>
          <p>Generouly apply broad spectrum SPF 30+ sunscreen every two hours, even if cloudy.</p>
        </div>
      </div>
    </div>
    <div class="col s12" v-if='value > 10'>
    <p>This is an extreme ultraviolet index. Take all precautions as skin and eyes can burn within minutes. Avoid any sun exposure.</p>
      <div class='card white'>
        <div class="card-content black-text">
          <span class="card-title purple-text"><h4><i class="fas fa-sun"></i></h4></span>
          <p>Generouly apply broad spectrum SPF 30+ sunscreen every two hours, even if cloudy. Wear protective clothing and sunglasses.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['value', 'label', 'time', 'stamp'],
    computed: {
      uvIndexProg () {
        let ind = this.value - 1
        let colors = ['#4b9229', '#4b9229', '#f5e34c', '#f5e34c', '#f5e34c', '#e7632a', 'e7632a', '#c72923', '#c72923', 'c72923', '#654fc1']
        let color = colors[ind]
        return {
          css: 'height:24px;width:' + this.value.toString() + '0%;background-color:' + color + ';height:30px;'
        }
      }
    }
  }
</script>

<style scoped>
  .row {
    margin-bottom: 5px !important;
  }
</style>