import mongoose from 'mongoose';


const PlantReviewSchema = new mongoose.Schema({
  userName: String,
  review: String,
  createdAt: { type: Date, default: Date.now },
})

const PlantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  photos: {
    type: [String],
    required: true
  },
  availableQuantity: {
    type: Number,
    required: true
  },
  reviews: {
    type: [PlantReviewSchema]
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  vendor: {
    type: String,
    default: 'Plantae'
  },
  featured: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  }
})

PlantSchema.index({ name: 1, vendor: 1 }, { unique: true });

export default mongoose.model('Plant', PlantSchema)