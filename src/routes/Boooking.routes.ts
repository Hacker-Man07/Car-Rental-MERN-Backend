import express from "express";

import * as bookingController from "../controllers/BookingControllers";

// Router instance
const router = express.Router();

router.post("/", bookingController.bookCar);
router.get("/",  bookingController.getBookings);
router.delete("/:id", bookingController.deleteBooking);

export default router;

