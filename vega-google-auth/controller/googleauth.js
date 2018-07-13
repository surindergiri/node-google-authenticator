var speakeasy   = require('speakeasy');
var QRCode      = require('qrcode')


var googleAuth = {
    
    generate_key: async function(req,res){

        var label = "surinder.k@antech.in"
        var issuer = 'Vega-Exchange'
        var algo = "SHA1"
        var secret = speakeasy.generateSecret();
        var secretAscii = secret.ascii;
        
        var url = await speakeasy.otpauthURL({ secret: secret.ascii, label: label, type: '', counter: '', issuer: issuer, algorithm: algo });

        QRCode.toDataURL(url, function(err, data_url) {
            var resObj = {"status":"1","secret":secretAscii,"qrImgUrl":data_url}
            res.send(resObj)
        });    
    },
    verify: async function(req,res){

        var userToken = req.body.token
        var secret = req.body.secret
        var secretAscii = secret
        var verified = await speakeasy.totp.verifyDelta({ 
            secret: secretAscii,
            token: userToken,
            window: 10
        });
        var resJson
        if(typeof verified === "undefined"){
            console.log(verified)
            resJson = {"status":false,"token":"invalid"}            
        }else if(verified === null){
            resJson = {"status":false,"token":"invalid"}
        }else if(verified.delta){
            resJson = {"status":true,"token":"valid"}
        }else{
            resJson = {"status":false,"token":"invalid"}
        }
        res.send(resJson)
    }
}

module.exports = googleAuth