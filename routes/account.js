const express = require('express')
const router = express.Router()
const { read, update, remove } = require('../controllers/account')
// const { authCheck, adminCheck } = require('../middlewares/authCheck')


router.get('/account/:id', read)
router.put('/account/:id', update)
router.delete('/account/:id', remove)

module.exports = router