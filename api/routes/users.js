/* eslint-disable */
const { Router } = require('express')

const request = require('request')
const bodyParser = require('body-parser')

const router = Router()
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

/* GET weather data based on lat/long--a way of bypassing CORS.. */
router.get('/loc/:latlng', function(req, res, next) {
  let latlng = req.params.latlng
  request({
    uri:
      'https://api.darksky.net/forecast/f69b34e59a6ce824a619446dcdeb0996/' +
      latlng
  }).pipe(res)
})

router.get('/two/', function(req, res, next) {
  request({
    url: 'https://www.ncdc.noaa.gov/cdo-web/api/v2/datasets',
    headers: { token: rNQjHCAegOQyxyoXVDrUiKXwWHIOmECF },
    function(result) {
      console.log(result)
    }
  }).pipe(res)
})

const db = require('../models')

// get route for data saves.
router.get('/data', (req, res) => {
  db.save.findAll().then(allData => {
    res.json(allData)
  })
})

// post route for data saves.
router.post('/data', (req, res) => {
  db.save
    .create({
      data: req.body.data,
      label: req.body.label
    })
    .then(dbPost => {
      res.json(dbPost)
    })
})

db.sequelize.sync({ force: true }).then(() => {
  console.log('synced.')
})

module.exports = router
