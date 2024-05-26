import { Schema, Document, Types, model } from "mongoose";

export interface IBooking extends Document {
  car: Types.ObjectId;
  user: Types.ObjectId;
  totalHours: number;
  totalAmount: number;
  driverRequired: boolean;
  transactionId: string;
  bookedTimeSlot: {
    from: string;
    to: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalHours: {
      type: Number,

      required: [true, "Please provide a total hours"],
    },
    totalAmount: {
      type: Number,
      required: [true, "Please provide a total amount"],
    },
    driverRequired: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String, // payment gateway transaction id
    },
    bookedTimeSlot: {
      from: {
        type: String,
        required: [true, "Please provide a start st"],
      },
      to: {
        type: String,

        required: [true, "Please provide a end date"],
      },
    },
  },
  { timestamps: true }
);

const Booking = model<IBooking>("Booking", BookingSchema);

export default Booking;