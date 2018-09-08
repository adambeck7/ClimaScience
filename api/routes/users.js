/* eslint-disable */
const {
  Router
} = require('express')

const request = require('request');
const bodyParser = require('body-parser');
const geoip = require('geoip-lite');

let geo = geoip.lookup(ip);



const router = Router();
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



// Mock Users
const users = [{
    name: 'Alexandre'
  },
  {
    name: 'Pooya'
  },
  {
    name: 'Sébastien'
  }
]

const vars = [{
  var1: 'var1'
}]


/* GET users listing. */
router.get('/users', function (req, res, next) {
  console.log(geo);
  request({
    uri: 'https://api.darksky.net/forecast/f69b34e59a6ce824a619446dcdeb0996/39.7392,104.9903',
  }).pipe(res);
})


router.get('/vars', function (req, res, next) {
  res.json(vars);
})

router.get('/vars/:id', function (req, res, next) {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < vars.length) {
    res.json(vars[id]);
  } else {
    res.sendStatus(404);
  }
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

module.exports = router