var express     = require('express')
var router      = express.Router()
var asyncMiddleware = require('../middleware/async')


/**
 * Google Authenticator
 */
var googleAuth  = require( '../controller/googleauth' )
router.post( '/generate_key', asyncMiddleware( googleAuth.generate_key) )
router.post( '/verify', asyncMiddleware( googleAuth.verify) )

module.exports = router