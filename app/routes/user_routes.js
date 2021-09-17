const express = require('express');
const userController = require('../controllers/user_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

//user registration
router.post("/publicRegister", userController.publicRegister);
router.post("/orgRegister", userController.orgRegister);
router.post("/updateAccount", authMiddleware.verifyToken, userController.updateAccount);
router.get("/userVerification/:userId", userController.userVerification);

//user login
router.post("/login", userController.login);

//realtime user
router.post('/updateRealUser', authMiddleware.verifyToken, userController.updateRealUser);
router.get('/getRealUser/:userId', authMiddleware.verifyToken, userController.getRealUser);

//test middleware
router.get('/test',authMiddleware.verifyToken,userController.test);

module.exports  = router;