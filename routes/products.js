const express = require('express')
const router = express.Router()
const checkAuth = require('../middlewares/checkAuth')
const ProductController = require('../controller/products')

    const {Get_ALL_PRODUCTS,Get_BY_ID,ADD_PRODUCT,DELETE_PRODUCT,UPDATE_NAME} = ProductController

    // Get All Products
    router.get('/',Get_ALL_PRODUCTS)

    // Get a Specific Product By ID
    router.get('/:_id',Get_BY_ID)

    // Add a Product 
    router.post('/',checkAuth,ADD_PRODUCT) 

    // Delete Product by ID
    router.delete('/:_id',checkAuth,DELETE_PRODUCT)

    // Patch request updating Name
    router.patch('/:_id',checkAuth,UPDATE_NAME)

module.exports = router