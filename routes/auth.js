const { Router } = require("express");
const { signup, login } = require("../controllers/auth");
const router = Router();

// Route for user signup
router.post("/signup", signup);

router.post("/login", login);

module.exports = router; 