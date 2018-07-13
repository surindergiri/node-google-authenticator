//'use strict';
var express = require('express')
var routes = require('./routes/routes')
var bodyParser = require('body-parser')
const app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(routes)

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/"+"index.html")
})

var server = app.listen(3000,()=>{
    console.log('server started at port 3000')
})