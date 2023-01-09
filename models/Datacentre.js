import mongoose from "mongoose";

const datacentreSchema = new mongoose.Schema({
  name: String,
  location: String,
  built: Date,
  greenElecPercentage: Number,
  // servers: [{ type: mongoose.Types.ObjectId, ref: "Server" }]
  // servertypes: [{ type: mongoose.Types.ObjectId, ref: "ServerType" }]
});

export default mongoose.model('Datacentre', datacentreSchema);

