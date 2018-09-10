/* eslint-disable */
const { Router } = require('express')

const request = require('request')
const bodyParser = require('body-parser')

const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

/* GET users listing. */
router.get('/loc/:latlng', function(req, res, next) {
  let latlng = req.params.latlng
  request({
    uri:
      'https://api.darksky.net/forecast/f69b34e59a6ce824a619446dcdeb0996/' +
      latlng
  }).pipe(res)
})

module.exports = router
