import User from "./../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "./../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    const { password, isAdmin, ...otherDetails } = newUser
    res.status(201).json(otherDetails);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
      return next(createError(404, "Invalid password"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...userData } = user._doc;

    res
      .cookie("plantae_access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...userData });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  res.clearCookie("plantae_access_token");
};
