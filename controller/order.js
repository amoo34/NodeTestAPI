const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const orderModel = require('../models/orderModel')


    // Get All Orders from Database
exports.orders_get_all =async(req,res,next)=>{
    try{
    const OrdersData = await orderModel.find({},{}) 

    res.json({
        count:OrdersData.length,
        orders:OrdersData.map(order=>{
            return {
                id:order._id,
                productID:order.product,
                quantity:order.quantity
            }
        })
    })
}
    catch(error){
        res.send(error)
    }
}

   //---------------------------------------------------------//

   // Post an Order in Database
exports.orders_post = async(req,res,next)=>{

    const order = new orderModel({
        _id:mongoose.Types.ObjectId(),
        product:req.body.productId,
        quantity:req.body.quantity
    })

    // Saving Order in Database
    try{
        const orderConfirm = await order.save()
        res.send(orderConfirm)
    }
    catch(error){
        res.send(error)
    }
}