import Router from "express";

import { login, register } from "../controller/userController.js";
import jwtCheck from "../middleware/jwtFunc.js";
import users from "../users.json" with { type: "json" };

const router = Router();
router.use("/api", jwtCheck);

router.get("/api/users", (req, res) => {
  res.json({ message: "Hello user " + req.user.username, users });
});
router.post("/login", login);
router.post("/register", register);
router.get("/api/protected", jwtCheck, (req, res) => {
  res.json({ message: "This is a protected route" });
});

export default router;
