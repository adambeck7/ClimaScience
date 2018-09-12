<template>
    <div class="container">
        <h2 class='center header text_h2'>historical data</h2>
       <!-- <input v-model='lat'/>
        <input v-model='lng'/>-->
        <button @click='go3'>GO</button> 
          <p>{{ data }}</p>
    </div>
</template>

<script>
/* eslint-disable no-undef */
import axios from '~/plugins/axios'

export default {
  data () {
    return {
      data: null
    }
  },
  methods: {
    go () {
      console.log('go works!')
      axios.get('/api/two/').then((res) => {
        console.log('axios works!')
        this.data = res.data
      }).catch((error) => {
        error({ statusCode: 404, message: 'Data not found' })
      })
    },
    go2 () {
      axios.get('https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets?stationid=WBAN:94075', { 'headers': { token: 'rNQjHCAegOQyxyoXVDrUiKXwWHIOmECF' } }).then(response => {
        console.log(response.data)
        this.data = response.data
      })
    },
    go3 () {
      axios.get('https://www.ncdc.noaa.gov/access-data-service/api/v1/data?dataset=global-summary-of-the-year&dataTypes=DP01,DP05,DP10,DSND,DSNW,DT00,DT32,DX32,DX70,DX90,SNOW,PRCP&stations=ASN00084027&startDate=1952-01-01&endDate=1970-12-31&includeAttributes=true&format=json').then(response => {
        console.log(response.data)
        this.data = response.data
      })
    }
  }
}
</script>