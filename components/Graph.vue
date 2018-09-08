<template>
    <div class="container">
        <h2 class='center header text_h2'>The next 48 hours of weather data, visualized.</h2>
        <p>{{ data }}</p>
        
    </div>
</template>

<script>
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      data: null
    }
  },
  mounted () {
    axios.get('/api/users').then((res) => {
      this.data = res.data
    }).catch((error) => {
      error({statusCode: 404, message: 'Data not found'})
    })
  }
}
</script>