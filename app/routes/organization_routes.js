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
router.get("/getAllMembers", authMiddleware.verifyToken, orgController.getAllMembers);
router.post("/addMembers", authMiddleware.verifyToken, orgController.addMembers);

//collection points
router.post("/createCollectionPoint", authMiddleware.verifyToken, orgController.createCollectionPoint);
router.get("/getCollectionPoints", authMiddleware.verifyToken, orgController.getCollectionPoints);
router.get("/getMyCollectionPoints", authMiddleware.verifyToken, orgController.getMyCollectionPoints);
router.get("/getCollectionPointsById/:col_id", authMiddleware.verifyToken, orgController.getCollectionPointsById);

//selling points
router.post("/createSellingPoint", authMiddleware.verifyToken, orgController.createSellingPoint);
router.get("/getSellingPoints", authMiddleware.verifyToken, orgController.getSellingPoints);
router.get("/getMySellingPoints", authMiddleware.verifyToken, orgController.getMySellingPoints);
router.get("/getSellingPointsById/:sel_id", authMiddleware.verifyToken, orgController.getSellingPointsById);




module.exports  = router;