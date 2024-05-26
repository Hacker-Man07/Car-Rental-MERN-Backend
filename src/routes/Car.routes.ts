import express from "express";

import * as CarController from "../controllers/CarController";

// Router instance
const router = express.Router();

router.get("/", CarController.getCars);
router.get("/:id", CarController.getCarById);
router.put("/:id", CarController.updateCar);
router.delete("/:id", CarController.deleteCar);
router.post("/", CarController.createCar);

export default router;
