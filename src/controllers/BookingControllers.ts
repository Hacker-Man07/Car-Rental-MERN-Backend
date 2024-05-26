import dotenv from "dotenv";
import Stripe from "stripe";

import BookingModel from "../models/Booking";
import CarModel from "../models/Car";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

// @desc    Book a car
// @route   POST /api/v1/bookings
// @access  Private
const bookCar = async (req: any, res: any, next: any) => {
  const { token } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "eur",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: Math.random().toString(16),
      }
    );

    if (payment) {
      req.body.transactionId = payment?.source?.id;

      const booking = await BookingModel.create(req.body);

      // Update the car bookedTimeSlots array with the new booking time slot Object
      const car = await CarModel.findOne({ _id: req.body.car });
      car?.bookedTimeSlots.push(req.body.bookedTimeSlot);

      // save the car
      await car?.save();
      res.status(201).json({
        success: true,
        data: booking,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment failed",
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Private
const getBookings = async (req: any, res: any, next: any) => {
  try {
    const bookings = await BookingModel.find({}).populate("car");
    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

// @desc    Delete a booking
// @route   DELETE /api/v1/bookings/:id
// @access  Private
const deleteBooking = async (req: any, res: any, next: any) => {
  try {
    const booking = await BookingModel.findById(req.params.id);
    if (!booking) {
      res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    } else {
      await booking.deleteOne();
      res.status(200).json({
        success: true,
        data: {},
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export { bookCar, getBookings, deleteBooking };
