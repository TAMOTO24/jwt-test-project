import jwt from "jsonwebtoken";
import fs from "fs";
import jwtCheck from "../middleware/jwtFunc.js";
import users from "../users.json" with { type: "json" };

export const login = (req, res) => {
  const { username, password } = req?.body;
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const payload = { id: user.id, username: user.username };
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
};

export const register = (req, res) => {
  const { username, password } = req?.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const token = jwt.sign({ id: Date.now(), username }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  fs.writeFile(
    "./users.json",
    JSON.stringify([...users, { id: Date.now(), username, password }], null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving user" });
      }
    },
  );

  res.json({ message: "User registered successfully", token });
};
