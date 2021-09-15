const express = require('express');
const orgController = require('../controllers/organization_controller');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.get("/viewProfile/:userId", authMiddleware.verifyToken, orgController.viewProfile);
router.get("/viewProfile/", authMiddleware.verifyToken, orgController.viewProfile);
//new change...
router.post("/updateProfile", authMiddleware.verifyToken, orgController.updateProfile);
//.....
router.get("/getMembers/:names", authMiddleware.verifyToken, orgController.getMembers);
router.post("/addMembers", authMiddleware.verifyToken, orgController.addMembers);

//collection points
router.post("/createCollectionPoint", authMiddleware.verifyToken, orgController.createCollectionPoint);
router.post("/getCollectionPoints", authMiddleware.verifyToken, orgController.getCollectionPoints);
router.post("/getMyCollectionPoints", authMiddleware.verifyToken, orgController.getMyCollectionPoints);
router.post("/getCollectionPointsById/:col_did", authMiddleware.verifyToken, orgController.getCollectionPointsById);

module.exports  = router;