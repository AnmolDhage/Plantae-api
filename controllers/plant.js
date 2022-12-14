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
    let { page, limit, search, sort, category, ...others } = req.query;
    page = parseInt(req.query.page) || 0;
    limit = parseInt(req.query.limit) || 5;
    search = req.query.search || "";
    sort = req.query.sort || "name";
    category = req.query.category || "All";
    const categoryOptions = await Plant.find().distinct('type');
    category === "All" ? (category = [...categoryOptions]) : (category = req.query.category.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    const plants = await Plant.find({ ...others, name: { $regex: search, $options: "i" } })
      .where("type")
      .in([...category])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await Plant.countDocuments({
      genre: { $in: [...category] },
      name: { $regex: search, $options: "i" }
    })

    const response = {
      total,
      page: page + 1,
      limit,
      categories: categoryOptions,
      plants
    }

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
}


export const getCategories = async (req, res, next) => {
  try {
    const categoryOptions = await Plant.find().distinct('type');
    res.status(200).json(categoryOptions);
  } catch (err) {
    next(err);
  }

}