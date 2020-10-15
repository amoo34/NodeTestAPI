const express = require('express')
const router = express.Router()
const userModel = require('../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {getToken} = require('../utils/token')

    // User Signup
exports.USER_SIGNUP=async(req,res,next)=>{

    const {email,password} = req.body

    // If Email Already Exists then return User Already Registered
    try{
        let userss = await userModel.findOne({ email });
        if (userss) return res.status(400).send('User already registered.');
            
    // Else Hash the password and store the User Data in Database
        bcrypt.hash(password,10,async(err,hash)=>{
        if(err){
            res.status(500).json({
            error:err
        })
        }
        else{    
            const product = new userModel({
            _id:mongoose.Types.ObjectId(),
            email:email,
            password:hash
                 })
        // Saving Data in Database
            const response = await product.save()
            return res.send(`Response is ${response}`)
            }
                })
        }
    catch(error){
        return res.send(error)
        }}

  //---------------------------------------------------------//
  
  // User Signin
exports.USER_SIGNIN=async(req,res,next)=>{
    
    const {email,password} = req.body

    try{

        // Check whether User exists Or Not
        const user = await userModel.findOne({email})   
        if (!user) return res.status(400).send('Invalid Email.');

        // If user Exists Validate its Password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send('Invalid password.');

        // Create a JWTToken and return
        const token = getToken(user)
        res.header('x-auth-token',token).send(token)

    }
    catch(error){
        res.status(400).send(error)
    } 
}

  //---------------------------------------------------------//

  // User Delete
exports.USER_DELETE=async(req,res,next)=>{

    const {userId} = req.params

    try{
    // Delete User through its ID
        const deleteUser = await userModel.deleteOne({ _id: userId })
        res.status(200).json({message: "User deleted"})
    
    }
    catch(error) {

      res.status(500).json({error});
    
    }
}