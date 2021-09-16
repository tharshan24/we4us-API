const express = require('express');
const requestController = require('../controllers/request_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();


router.post('/createRequest', authMiddleware.verifyToken, requestController.createRequest);
router.post('/createReqSession', authMiddleware.verifyToken, requestController.createReqSession);
router.get('/acceptReqSession/:req_ses_id', authMiddleware.verifyToken, requestController.acceptReqSession);
router.get('/cancelReqSession/:req_ses_id', authMiddleware.verifyToken, requestController.cancelReqSession);
router.get('/rejectReqSession/:req_ses_id', authMiddleware.verifyToken, requestController.rejectReqSession);
// router.get('/deliverReqSession/:req_ses_id', authMiddleware.verifyToken, requestController.deliverReqSession);

router.get('/getRequestType/', authMiddleware.verifyToken, requestController.getRequestType);



module.exports  = router;