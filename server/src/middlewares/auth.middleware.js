import jwt from "jsonwebtoken"
import { accessTokenSecret } from "../config/jwt.js"

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
    return res.status(401).json({ message: "Token missing" });
  }
    const token = authHeader.split(" ")[1];

     try {
    const result = jwt.verify(token, accessTokenSecret);
    req.user = result;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }

}

export default authMiddleware;