import { Request, Response } from "express";

import CarModel from "../models/Car";

// @desc    Get all cars
// @route   GET /api/v1/cars
// @access  Public
const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await CarModel.find({});
    res.status(200).json({ success: true, data: cars });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

// @desc    Get a car by id
// @route   GET /api/v1/cars/:id
// @access  Public
const getCarById = async (req: Request, res: Response) => {
  try {
    const car = await CarModel.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

// @desc    Create a car
// @route   POST /api/v1/cars
// @access  Private
const createCar = async (req: Request, res: Response) => {
  try {
    const car = await CarModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: car,
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

// @desc    Update a car
// @route   PUT /api/v1/cars/:id
// @access  Private
const updateCar = async (req: Request, res: Response) => {
  try {
    const car = await CarModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a car
// @route   DELETE /api/v1/cars/:id
// @access  Private
const deleteCar = async (req: Request, res: Response) => {
  try {
    const car = await CarModel.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    await car.deleteOne();

    res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export { getCars, getCarById, createCar, updateCar, deleteCar };
