const jwt = require("jsonwebtoken");

const jwtCheck = (req, res, next) => {
  const payload = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Payload:", payload);
  console.log("Token:", token);
  console.log(req.headers);

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
