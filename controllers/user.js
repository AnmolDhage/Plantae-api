import User from "./../models/User.js";
import bcrypt from "bcryptjs";


export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const updateUserPassword = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: { password: hash } }, { new: true });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted");
  } catch (err) {
    next(err);
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

export const getUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}

export const addAddress = async (req, res, next) => {
  try {
    const addedAddress = await User.findByIdAndUpdate({ _id: req.params.id }, { $push: { addresses: req.body } });
    res.status(201).json(addedAddress);
  } catch (err) {
    next(err);
  }
}


export const updateAddress = async (req, res, next) => {
  try {
    const { userId, addressId } = req.params;
    const user = await User.findById(userId);
    const address = user.addresses.id(addressId);
    address.set(req.body);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}


export const deleteAddress = async (req, res, next) => {
  try {
    const { userId, addressId } = req.params;
    const user = await User.findById(userId);
    user.addresses.pull({ _id: addressId }, { new: true });
    user.save()
    res.status(200).json("Address deleted");
  } catch (err) {
    next(err);
  }
}


export const addOrder = async (req, res, next) => {
  try {
    const addedOrder = await User.findByIdAndUpdate({ _id: req.params.id }, { $push: { orders: req.body } });
    res.status(201).json(addedOrder);
  } catch (err) {
    next(err);
  }
}


export const deleteOrder = async (req, res, next) => {
  try {
    const { userId, orderId } = req.params;
    const user = await User.findById(userId);
    user.orders.pull({ _id: orderId }, { new: true });
    user.save()
    res.status(200).json("Order deleted");
  } catch (err) {
    next(err);
  }
}