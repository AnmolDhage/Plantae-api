import Plant from "./../models/Plant.js";


export const createPlant = async (req, res, next) => {
  const newPlant = new Plant(req.body);
  try {
    const plant = await newPlant.save();
    res.status(200).json(plant);
  } catch (err) {
    next(err);
  }
}

export const updatePlant = async (req, res, next) => {
  try {
    const updatedPlant = await Plant.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedPlant);
  } catch (err) {
    next(err);
  }
}

export const deletePlant = async (req, res, next) => {
  try {
    const deletedPlant = await Plant.findByIdAndDelete(req.params.id);
    res.status(200).json("Plant deleted");
  } catch (err) {
    next(err);
  }
}

export const getPlantById = async (req, res, next) => {
  try {
    const plant = await Plant.findById(req.params.id);
    res.status(200).json(plant);
  } catch (err) {
    next(err);
  }
}

export const getPlant = async (req, res, next) => {
  try {
    const plants = await Plant.find();
    res.status(200).json(plants);
  } catch (err) {
    next(err);
  }
}