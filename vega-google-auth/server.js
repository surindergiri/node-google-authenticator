'use strict';
var authenticator = require('authenticator');
var QRCode = require('qrcode')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/"+"index.html")
})

app.post('/enable', (req,res)=>{
    var formattedToken = req.body.key
    //console.log(formattedToken)

    //var formattedKey = authenticator.generateKey();
    // "acqo ua72 d3yf a4e5 uorx ztkh j2xl 3wiz"
    // var formattedToken = authenticator.generateToken(formattedKey);    
    var formattedKey = "lezv gpej hbot mksp qlx4 pgvx jhzu 4hpa"
    var verify = authenticator.verifyToken(formattedKey, formattedToken)
    res.send(verify)

    console.log(formattedKey)
    console.log(formattedToken)
    console.log(verify)
    //res.sendStatus(200)
})

app.post('/generate_key',async (req,res)=>{
    //var action = req.body.action    
        try {
            var userEmail = "surinder.k@antech.in"
            var label = "Vega-Exchange"
            var algo = "SHA1"
            var digits = 6
            var period = 30 //seconds
            //var formattedKey = authenticator.generateKey();    
            var formattedKey = "lezv gpej hbot mksp qlx4 pgvx jhzu 4hpa"
            var otpUri = authenticator.generateTotpUri(formattedKey, userEmail, label, algo, digits, period);            
            var qrImgurl = await QRCode.toDataURL(otpUri)
            var resObj = {"status":"1","qrImgUrl":qrImgurl}
            res.send(resObj)
            //res.sendStatus(200)

        } catch (err) {
            res.sendStatus(500)
            return console.error(err)
        }
})




var server = app.listen(3000,()=>{
    console.log('server started at port 3000')
})