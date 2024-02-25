const express = require("express")
const { protect } = require("../middlewares/authMiddleware")
const { sendMessage, allMessages } = require("../controllers/messageControllers")
const router = express.Router()

router.route('/').post(protect, sendMessage)
router.route('/:id').get(protect, allMessages)

module.exports = router;

