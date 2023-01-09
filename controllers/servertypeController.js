import Server from '../models/Server.js';
import Datacentre from '../models/Datacentre.js';
import ServerType from '../models/ServerType.js';

const createServerType = async (req, res, next) => {
  try {
    const newServerType = await ServerType.create(req.body);
    await Movie.updateMany(
      { _id: newServer.movies },
      { $push: { servers: newServer._id } }
    );
    return res.status(201).json(newServer);
  } catch (err) {
    next(err);
  }
};

const getAllServerTypes = async (req, res, next) => {
  try {
    const servertypes = await ServerType.find();
    return res.status(200).json(servertypes);
  } catch (err) {
    next(err);
  }
};

const getServerTypeById = async (req, res) => {
  const servertype = await ServerType.findById(req.params.id);
  !servertype ? res.status(404) : res.status(200).json(servertype);
};

const updateServerType = async (req, res) => {
  const servertype = await ServerType.findById(req.params.id);
  servertype.set(req.body);
  const savedServerType = await servertype.save();
  return res.status(200).json(savedServerType);
};

const deleteServerType = async (req, res, next) => {
  try {
    const servertype = await ServerType.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: `Successfully delete servertype ${req.params.id}` });
  } catch (e) {
    next(e);
    return res.status(404);
  }
};

const getAllDatacentresForServerType = async (req, res, next) => {
  try {
    const servertype = await Server.findById(req.params.id).populate('datacentre', "-_id");
    console.log(servertype);
    return res.status(200).json(servertype);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllServerTypes,
  createServerType,
  getServerTypeById,
  updateServerType,
  deleteServerType,
  getAllDatacentresForServerType
};
