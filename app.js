const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan  = require('morgan')
const product = require('./routes/products')
const order = require('./routes/order')
const user = require('./routes/user')
const mongoose = require('mongoose')


// MongoDB Connection
mongoose.connect('mongodb+srv://moiz:123@cluster0.sndel.mongodb.net/moiz?retryWrites=true&w=majority',{
  useUnifiedTopology:true
})
.then(() => console.log('Connected…'))
.catch(err => console.error('Connection failed…'))

// Adding Middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// Adding CORS
app.use((req,res,next)=>{
 
    res.header('Access-Control-Allow-Origin','*')
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
})

// Adding Routes
app.use('/api/user',user)
app.use('/api/product',product)
app.use('/api/order',order)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

module.exports = app