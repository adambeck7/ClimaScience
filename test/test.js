const { Router } = require('express')

const request = require('request')
const bodyParser = require('body-parser')

const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

router.get('/two', function (req, res, next) {
  request({
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/data',
    data: data,
    headers: { token: rNQjHCAegOQyxyoXVDrUiKXwWHIOmECF },
    function (result) {
      return result
    }
  }).pipe(res)
})
