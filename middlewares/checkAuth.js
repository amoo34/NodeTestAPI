const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');
  
    try{
        const decoded =  jwt.verify(token,"Secret Key",(err,resd)=>{
            if(err)
            {
            return res.json(err)
            }
        })
        console.log(decoded)
        req.userData = decoded
        next()
    }
    catch{(error)=>{
        console.log("Catch")
        return res.status(401).send("Auth Failed")
    }}
    
}