import express from "express";
import {
  allPatient,
  DocDetails,
  login,
  signUp,
} from "../controller/doctor.controller.js";
import { protect } from "../middleware/doctorAuth.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/searchat", allPatient);
router.get("/docdetails", DocDetails);

export default router;
