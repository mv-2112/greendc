import Server from '../models/Server.js';
import Datacentre from '../models/Datacentre.js';

const createServer = async (req, res, next) => {
  try {
    const newServer = await Server.create(req.body);
    await Datacentre.updateMany(
      { _id: newServer.datacenters },
      { $push: { servers: newServer._id } }
    );
    return res.status(201).json(newServer);
  } catch (err) {
    next(err);
  }
};

const updateServer = async (req, res) => {
  const server = await Server.findById(req.params.id);
  server.set(req.body);
  const savedServer = await server.save();
  return res.status(200).json(savedServer);
};

const deleteServer = async (req, res, next) => {
  try {
    const server = await Server.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: `Successfully delete server ${req.params.id}` });
  } catch (e) {
    next(e);
    return res.status(404);
  }
};

const getAllServers = async (req, res, next) => {
  try {
    const servers = await Server.find().populate('datacentre', "-_id").populate('servertype', "-_id");
    return res.status(200).json(servers);
  } catch (err) {
    next(err);
  }
};

const getServerById = async (req, res) => {
  const server = await Server.findById(req.params.id);
  !server ? res.status(404) : res.status(200).json(server);
};



const getAllDatacentresForServer = async (req, res, next) => {
  try {
    const server = await Server.findById(req.params.id).populate('datacentre', "-_id").populate('servertype', "-_id");
    console.log(server);
    return res.status(200).json(server);
  } catch (err) {
    next(err);
  }
};

export default {
  createServer,
  getAllServers,
  getServerById,
  updateServer,
  deleteServer,
  getAllDatacentresForServer
};
