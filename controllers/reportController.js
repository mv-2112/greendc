import Datacentre from '../models/Datacentre.js';
import Server from '../models/Server.js';
import ServerType from '../models/ServerType.js';
import flattenObject from 'flatten-object';


// http://json2table.com/# use to show the data, we need to present sanely

const getAllServersByDatacentre = async (req, res, next) => {
  let rows = []
  try {
    let datacentres = await Datacentre.find()
    for (var datacentre of datacentres) {
      let servers = await Server.find({ datacentre: datacentre }, { _id: 0, count: 1, servertype: 1, datacentre: 0}).populate('datacentre','-_id').populate('servertype','-_id');
      rows.push(servers)
    }
    return res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

export default {
  getAllServersByDatacentre
};
