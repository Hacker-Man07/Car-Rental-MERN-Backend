import { Schema, Document, model } from "mongoose";

export interface ICars extends Document {
  name: string;
  image: string;
  capacity: number;
  feulType: string;
  Model: string;
  gearType: string;
  bookedTimeSlots: string[];
  rentPerHour: number;
  createdAt: Date;
  updatedAt: Date;
}

const CarSchema = new Schema<ICars>(
  {
    name: {
      type: "String",
      required: true,
    },
    image: {
      type: "String",
      required: true,
    },
    capacity: {
      type: "Number",
      required: true,
    },
    feulType: {
      type: "String",
      required: true,
    },
    Model: {
      type: "String",
      required: true,
    },
    gearType: {
      type: "String",
      default: "Automatic",
    },
    bookedTimeSlots: [
      {
        from: {
          type: "String",
          required: true,
        },
        to: {
          type: "String",
          required: true,
        },
      },
    ],
    rentPerHour: {
      type: "Number",
      required: true,
    },
  },
  { timestamps: true }
);

const Car = model<ICars>("Car", CarSchema);

export default Car;
