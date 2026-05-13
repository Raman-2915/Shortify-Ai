const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createUrl,
  getUserUrls,
  deleteUrl,
  updateUrl,
} = require("../controllers/urlController");

router.post("/create", auth, createUrl);
router.get("/my", auth, getUserUrls);
router.delete("/:id", auth, deleteUrl);
router.put("/:id", auth, updateUrl);

module.exports = router;