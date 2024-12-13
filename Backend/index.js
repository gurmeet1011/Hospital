import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import patientRouter from "./routes/patient.route.js";
import doctorRouter from "./routes/doctor.route.js";
import medicalRouter from "./routes/medicalHistory.js";
import chatRouter from "./routes/chat.routes.js";
import messageRouter from "./routes/message.route.js";
import appointmentRouter from "./routes/appointments.routes.js"; // New route for appointments
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// Get the current directory name from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Serve static files from the 'Frontend/public' directory
app.use(express.static(path.join(__dirname, "public")));
const _dirname = path.resolve();

// Environment Variables
const port = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Routes
app.use("/patient", patientRouter);
app.use("/doctor", doctorRouter);
app.use("/history", medicalRouter);
app.use("/chats", chatRouter);
app.use("/message", messageRouter);
app.use("/appointments", appointmentRouter); // Appointment module route
app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
