'use strict';
 
var authenticator = require('authenticator');
 
var formattedKey = authenticator.generateKey();
// "acqo ua72 d3yf a4e5 uorx ztkh j2xl 3wiz"
 
var formattedToken = authenticator.generateToken(formattedKey);
// "957 124"
 
authenticator.verifyToken(formattedKey, formattedToken);
// { delta: 0 }
 
authenticator.verifyToken(formattedKey, '000 000');
// null
 
authenticator.generateTotpUri(formattedKey, "john.doe@email.com", "ACME Co", 'SHA1', 6, 30);
//
// otpauth://totp/ACME%20Co:john.doe@email.com?secret=HXDMVJECJJWSRB3HWIZR4IFUGFTMXBOZ&issuer=ACME%20Co&algorithm=SHA1&digits=6&period=30