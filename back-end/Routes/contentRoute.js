
const express = require('express');
const {authMiddleware} = require('../Middleware/jwtAuth');
const roleMiddleware = require('../Middleware/roleAuth');
const {
    addContent,
  approveContent,
  rejectContent,
  getContent,
  searchContent,
  getAllApprovedContent,
  getInProgressContent,
} = require("../controller/contentController")
const generatePrsignedUrl = require("../controller/uploadImage");

const router = express.Router();



router.post('/addNew', addContent);
router.post('/generatePresigndeUlr', generatePrsignedUrl)
router.put('/approve/:id',authMiddleware, roleMiddleware(['admin']),approveContent);
router.put('/reject/:id', authMiddleware, roleMiddleware(['admin']), rejectContent);

router.get('/getInprogress', authMiddleware, getInProgressContent);
router.get('/:id', authMiddleware, getContent);
router.get('/search', authMiddleware, searchContent);
router.get('/', authMiddleware, getAllApprovedContent);


module.exports = router;
