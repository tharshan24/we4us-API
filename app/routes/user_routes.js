const express = require('express');
const userController = require('../controllers/user_controller');
const authMiddleware = require('../middlewares/auth');
const app = express();
const router = express.Router();

//user registration
router.post("/publicRegister", userController.publicRegister);
router.post("/orgRegister", userController.orgRegister);

//user login
router.post("/login", userController.login);

//test middleware
router.get('/test',authMiddleware.verifyToken,userController.test);

module.exports  = router;