const express = require("express");
const { uploadItem } = require("../controllers/adminControllers");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/upload-item", upload, uploadItem);

module.exports = router;
