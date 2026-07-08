import jwt from "jsonwebtoken";

const jwtCheck = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (!bearerHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const token = bearerHeader.split(" ")[0];
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default jwtCheck;
