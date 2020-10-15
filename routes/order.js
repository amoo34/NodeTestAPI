const express = require('express')
const router = express.Router()
const checkAuth = require('../middlewares/checkAuth')
const OrderController = require('../controller/order')

    const {orders_get_all,orders_post} = OrderController
    
    // Get All Orders 
    router.get('/',checkAuth,orders_get_all)

    // Post an Order
    router.post('/',checkAuth,orders_post)

module.exports = router