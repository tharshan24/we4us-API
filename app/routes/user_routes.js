const express = require('express');
const userController = require('../controllers/user_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

//user registration
router.post("/publicRegister", userController.publicRegister);
router.post("/orgRegister", userController.orgRegister);
router.post("/updateAccount", authMiddleware.verifyToken, userController.updateAccount);
router.get("/userVerification/:userId", userController.userVerification);
router.get("/forgotPassword/", userController.forgotPassword);
router.post("/sendPasswordEmail/", userController.sendPasswordEmail);
router.get("/changePasswordForm/", userController.changePasswordForm);
router.post("/passwordChange/", userController.passwordChange);

//user login
router.post("/login", userController.login);

//realtime user
router.post('/updateRealUser', authMiddleware.verifyToken, userController.updateRealUser);
router.get('/getRealUser/:userId', authMiddleware.verifyToken, userController.getRealUser);

//test middleware
router.get('/test',authMiddleware.verifyToken,userController.test);

router.get('/getUserDetails/:userId', authMiddleware.verifyToken, userController.getUserDetails);

module.exports  = router;