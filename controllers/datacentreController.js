import Datacentre from '../models/Datacentre.js';
import Server from '../models/Server.js';
// import ServerType from '../models/ServerType.js';

const getAllDatacentres = async (req, res) => {
  const datacentres = await Datacentre.find();
  return res.status(200).json(datacentres);
};

const getDatacentreById = async (req, res) => {
  const datacentre = await Datacentre.findById(req.params.id);
  !datacentre ? res.status(404) : res.status(200).json(datacentre);
};

const createDatacentre = async (req, res) => {
  const datacentre = await Datacentre.create(req.body);
  await Server.updateMany(
    { _id: datacentre.servers }, // ! filter criteria to match servers
    { $push: { datacentres: datacentre._id } } // ! update all servers that matched
  );
  /*   await ServerType.updateMany(
      { _id: datacentre.servertypes }, // ! filter criteria to match servers
      { $push: { datacentres: datacentre._id } } // ! update all servers that matched
    ); */
  return res.status(201).json(datacentre);
};

const updateDatacentre = async (req, res) => {
  const datacentre = await Datacentre.findById(req.params.id);
  datacentre.set(req.body);
  const savedDatacentre = await datacentre.save();
  return res.status(200).json(savedDatacentre);
};

const deleteDatacentre = async (req, res, next) => {
  try {
    // ! Grab the Datacentre
    const datacentre = await Datacentre.findByIdAndDelete(req.params.id);
    // ! Remove this Datacentre from all Servers
    /*     await ServerType.updateMany(
          { _id: datacentre.servertypes },
          { $pull: { datacentres: datacentre._id } }
        ); */
    await Server.updateMany(
      { _id: datacentre.servers },
      { $pull: { datacentres: datacentre._id } }
    );
    return res
      .status(200)
      .json({ message: `Successfully delete datacentre ${req.params.id}` });
  } catch (e) {
    next(e);
  }
};

const getAllServersForDatacentre = async (req, res, next) => {
  try {
    const datacentre = await Datacentre.findById(req.params.id).populate('servers');
    console.log(datacentre);
    return res.status(200).json(datacentre);
  } catch (err) {
    next(err);
  }
};

const getAllServerTypesForDatacentre = async (req, res, next) => {
  try {
    const datacentre = await Datacentre.findById(req.params.id).populate('servertypes');
    console.log(datacentre);
    return res.status(200).json(datacentre);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllDatacentres,
  getDatacentreById,
  createDatacentre,
  updateDatacentre,
  deleteDatacentre,
  getAllServerTypesForDatacentre,
  getAllServersForDatacentre
};
