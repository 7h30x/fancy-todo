var express = require('express');
var router = express.Router();
const taskController = require('../controllers/task');
const verifyJWT = require('../middlewares/verifyJWT');

router.use(verifyJWT);
router.post('/', taskController.create)
router.get('/', taskController.read)
router.put('/', taskController.update)
router.delete('/', taskController.delete)
module.exports = router;
