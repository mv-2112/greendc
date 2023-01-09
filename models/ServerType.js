import mongoose from "mongoose";

const serverTypeSchema = new mongoose.Schema({
  manufacturer: String,
  model: String,
  perf_rating: Number,
  power_consumption: Number
})

export default mongoose.model('ServerType', serverTypeSchema);
