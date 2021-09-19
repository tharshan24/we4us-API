const express = require('express');
const requestController = require('../controllers/request_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();


router.post('/createRequest', authMiddleware.verifyToken, requestController.createRequest);
router.get('/cancelRequest/:reqId', authMiddleware.verifyToken, requestController.cancelRequest);
router.post('/createReqSession', authMiddleware.verifyToken, requestController.createReqSession);
router.get('/acceptReqSession/:req_ses_id', authMiddleware.verifyToken, requestController.acceptReqSession);
router.get('/cancelReqSession/:req_ses_id', authMiddleware.verifyToken, requestController.cancelReqSession);
router.get('/rejectReqSession/:req_ses_id', authMiddleware.verifyToken, requestController.rejectReqSession);
router.get('/deliverReqSession/:req_ses_id', authMiddleware.verifyToken, requestController.deliverReqSession);

router.get('/getRequestType/', authMiddleware.verifyToken, requestController.getRequestType);

router.get('/exploreRequest/',authMiddleware.verifyToken,requestController.exploreRequest);
router.get('/exploreMyRequest/',authMiddleware.verifyToken,requestController.exploreMyRequest);
router.get('/exploreRequestById/:reqId',authMiddleware.verifyToken,requestController.exploreRequestById);
router.get('/getSessions/:reqId',authMiddleware.verifyToken,requestController.getSessions);
router.get('/getSession/:ses_id',authMiddleware.verifyToken,requestController.getSession);
router.get('/exploreRequestByMySessions',authMiddleware.verifyToken,requestController.exploreRequestByMySessions);
router.get('/exploreRequestByMySession/:ses_id',authMiddleware.verifyToken,requestController.exploreRequestByMySession);

module.exports  = router;