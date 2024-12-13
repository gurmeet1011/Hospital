import jwt from "jsonwebtoken";
import Doctor from "../model/doctor.model.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the doctor by ID and attach the doctor to the request object
      req.doctor = await Doctor.findById(decoded.id).select("-password"); // Avoid sending the password

      next();
    } catch (error) {
      console.error("Not authorized, token failed:", error);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
