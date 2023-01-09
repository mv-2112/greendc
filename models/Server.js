import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
    count: Number,
    datacentre: { type: mongoose.Types.ObjectId, ref: "Datacentre" },
    servertype: { type: mongoose.Types.ObjectId, ref: "ServerType" }
});


export default mongoose.model('Server', serverSchema);