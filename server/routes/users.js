var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const verifyToken = require('../middlewares/verifyToken');
const verifyJWT = require('../middlewares/verifyJWT');

/* GET users listing. */
router.post('/signin', userController.signIn)
router.post('/signup', userController.signUp)
router.post('/gsignin', verifyToken, userController.gSignIn)

module.exports = router;
