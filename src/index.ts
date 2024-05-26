import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";//Cross-Origin Resource Sharing

import { connectDB } from "./config/db";
import authRoutes from "./routes/Auth.routes";
import carRoutes from "./routes/Car.routes";
import bookingRoutes from "./routes/Boooking.routes";
// load env variables
dotenv.config();

// Initialize express
const app = express();

// Set up port
const port = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cars", carRoutes);
app.use("/api/v1/bookings", bookingRoutes);



app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
