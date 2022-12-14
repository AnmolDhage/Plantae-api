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

export const updateDefaultAddress = async (req, res, next) => {
  try {
    const { userId, addressId } = req.params;
    const user = await User.findById(userId);
    const address = user.addresses.id(addressId);
    const updatedUser = await User.findByIdAndUpdate(userId, { $set: { defaultAddress: address } }, { new: true })
    res.status(200).json(updatedUser);

  } catch (err) {
    next(err)
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
    const addedOrder = await User.findByIdAndUpdate({ _id: req.params.id }, { $push: { orders: req.body } }, { new: true });
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

export const getCartItems = async (req, res, next) => {
  try {
    const cartItems = await User.findOne({ _id: req.params.user_id }, "cart");
    res.status(200).json(cartItems);
  } catch (error) {
    next(error);
  }
};


export const addCartItem = async (req, res, next) => {
  try {
    const addedCartItem = await User.findByIdAndUpdate({ _id: req.params.id }, { $push: { cart: req.body } }, { new: true });
    res.status(201).json("Cart Item Added");
  } catch (err) {
    next(err);
  }
}


export const deleteCartItem = async (req, res, next) => {
  try {
    const { userId, cartId } = req.params;
    const user = await User.findById(userId);
    user.cart.pull({ _id: cartId }, { new: true });
    user.save()
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}


export const countCartItem = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const count = User.aggregate([{ $match: { _id: userId } }, { $project: { cart: { $size: '$cart' } } }])
    res.status(200).json(count);
  } catch (err) {
    next(err);
  }
}


export const addRecent = async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const user = User.findById(userId);
    const recentCount = user.recent.length;
    // const count = user.recent;
    res.status(200).json(recentCount);
  } catch (err) {
    next(err);

  }
}