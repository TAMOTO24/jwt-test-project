const router = require("express").Router();

const { login, register } = require("../controller/userController");

const jwtCheck = require("../middleware/jwtFunc");

router.use("/api", jwtCheck);

router.get("/users");
router.post("/api/login", login);
router.post("/api/register", register);

module.exports = router;
