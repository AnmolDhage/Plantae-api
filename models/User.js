import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  plantId: String,
  address: String,
  quantity: Number,
  status: String,
  price: Number,
  orderedOn: { type: Date, default: Date.now },
})

const AddressShema = new mongoose.Schema({
  name: String,
  phone: Number,
  address: { houseNo: String, street: String, city: String, state: String, country: String, zipCode: Number },
  addressType: String,
  isDefault: { type: Boolean, default: false },
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
  addresses: {
    type: [AddressShema],
  },
  orders: {
    type: [OrderSchema],
  },
})


export default mongoose.model('User', UserSchema)