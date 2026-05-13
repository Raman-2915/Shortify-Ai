const express = require("express");

const router = express.Router();

const {
  chatAI,
} = require(
  "../controllers/aiController"
);

router.post(
  "/chat",
  chatAI
);

module.exports = router;