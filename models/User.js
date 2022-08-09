import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  plantId: String,
  address: String,
  quantity: Number,
  status: String,
  price: Number,
  orderedOn: { type: Date, default: Date.now },
})
const CartSchema = new mongoose.Schema({
  plantId: {
    type: String,
    required: true,
    unique: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  addedOn: { type: Date, default: Date.now },
})

const AddressSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  address: { houseNo: String, street: String, city: String, state: String, country: String, zipCode: Number },
  addressType: String,
})

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  defaultAddress: {
    type: AddressSchema,
    default: null
  },
  addresses: {
    type: [AddressSchema],
  },
  orders: {
    type: [OrderSchema],
  },
  cart: {
    type: [CartSchema],
  },
})


export default mongoose.model('User', UserSchema)