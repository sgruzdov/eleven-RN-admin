const { Router } = require('express')
const controller = require('../controllers/scootersController')

const router = new Router()

router.get('/getScooters', controller.getScooters)
router.post('/changeStatusActive', controller.changeStatusActive)
router.get('/getScootersPagination', controller.getScootersPagination)

// router.get('/addScooter', controller.addScooter)

module.exports = router