const express               = require('express');
const router                = express.Router();
const authMiddleware        = require('../middlewares/authMiddleware');
const bookmarkController    = require('../controllers/bookmarkController'); 

router.post('/bookmark/add', authMiddleware.isLoggedIn, bookmarkController.addBookmark);

router.post('/bookmark/:news_id/delete', authMiddleware.isLoggedIn, bookmarkController.delBookmark);

module.exports = router