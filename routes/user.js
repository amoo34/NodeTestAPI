const express = require('express')
const router = express.Router()
const UserController = require('../controller/user')

    const {USER_DELETE,USER_SIGNIN,USER_SIGNUP} = UserController

    //Signup
    router.post('/signup',USER_SIGNUP)

    //Signin
    router.post('/login',USER_SIGNIN)

    //Delete
    router.delete("/:userId",USER_DELETE);

module.exports = router