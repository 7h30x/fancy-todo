var express = require('express');
var router = express.Router();
const groupController = require('../controllers/group');
const verifyToken = require('../middlewares/verifyJWT');
router.use('/', verifyToken);
router.post('/', groupController.create);
router.get('/', groupController.read);
router.delete('/', groupController.delete);
router.put('/', groupController.updateMembers)
module.exports = router;
