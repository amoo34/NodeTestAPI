const express = require('express')
const router = express.Router()
const Product = require('../models/productModel')
const mongoose = require('mongoose')
const { update } = require('../models/productModel')
const checkAuth = require('../middlewares/checkAuth')


    // Get All Products
    module.exports.Get_ALL_PRODUCTS=async(req,res,next)=>{
        try{
            const allProduct = await Product.find()
            res.send(allProduct)
        }
        catch(error){
            res.send(error)
        }
    }

    //---------------------------------------------------------//
    
    //Get A Specific Product
    module.exports.Get_BY_ID=async(req,res,next)=>{
     
        const {_id} = req.params
        
        try{
            const result = await Product.findById(_id)
            res.status(200).json(`Product Found ${result}`)
        }
        catch(error)
        {
            res.status(404).send("Product Not Found")
        }
    }
    
    //---------------------------------------------------------//

    // Add a Product
    module.exports.ADD_PRODUCT = async(req,res,next)=>{

        const {name,price} = req.body

        const product = new Product({
            _id:mongoose.Types.ObjectId(),
            name,
            price
        })
        try{
        const saveProd = await product.save()
        console.log(saveProd)
        return res.status(200).send("Successfully Uploaded")
    }
        catch{(error)=>{
            console.log(error)
            return res.status(500).send("Not Succesully UPloaded")
        }}
    }

    //---------------------------------------------------------//
    
    // Delete a Product
    module.exports.DELETE_PRODUCT=async(req,res)=>{
        const {_id} = req.params
        try{
            const deleteProd = await Product.deleteOne({_id})
            res.send(deleteProd)
        }
       
        catch(error){
            res.send("Error")
        }
    }

    //---------------------------------------------------------//
    
    // Update Product name
    exports.UPDATE_NAME=async(req,res,next)=>{

        const {_id} = req.params
        const {name} = req.body

        // Check whether Name is written on request Body
      if(!name && name != null)
      {
         return res.send("Name doesnot Exist or must have some value in it")
      }
       // Check ID exist or not in Database 
      try{
        const updatedProduct = await Product.findById(_id)
        console.log(updatedProduct)
        const result = await Product.updateOne({_id},{
        $set:{
            name:name
        }
    })
        res.send(result)
        }
      catch(error){ 
          res.send(error)
        }
   
 
    }