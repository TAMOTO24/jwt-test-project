const jwt = require("jsonwebtoken");
const jwtCheck = require("../middleware/jwtCheck");
const users = require("../users.json");

export const login = (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
};

export const register = (req, res) => {
  const { username, password } = req.body;

  const token = jwt.sign({ username }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  res.json({ message: "User registered successfully", token });
};
