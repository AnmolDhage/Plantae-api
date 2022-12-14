import express from "express"
import { createPlant, updatePlant, deletePlant, getPlant, getPlantById, getCategories } from "../controllers/plant.js"
import { verifyAdmin } from "../utils/verifyToken.js"
const router = express.Router();

//GET CATEGORIES
router.get("/categories", getCategories)

//CREATE 
router.post("/", verifyAdmin, createPlant)
//UPDATES
router.put("/:id", verifyAdmin, updatePlant)
//DELETE
router.delete("/:id", verifyAdmin, deletePlant)
//GET
router.get("/:id", getPlantById)
//GET ALL
router.get("/", getPlant)


export default router;