const db = require('../models')

module.exports = router => {
  router.get('/api/data', (req, res) => {
    db.Save.findAll({})
      .then(allData => {
        res.json(allData)
      })
  })
}
