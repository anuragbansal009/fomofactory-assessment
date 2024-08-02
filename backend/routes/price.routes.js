// Initialize express router
const express = require('express')

// Importing controllers
const { PriceList } = require('../controllers/price.controllers')

// Create a new router
const router = express.Router()

// Create a route for getting the price list
router.get('/', PriceList)

module.exports = router