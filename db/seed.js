import { connectToDb, disconnectDb } from './helpers.js';

import Datacentre from '../models/Datacentre.js';
import Server from '../models/Server.js';
import ServerType from '../models/ServerType.js';
import data from './data.js';
import datacentreController from '../controllers/datacentreController.js';

const createServer = (count, datacentre, servertype) => {
  return {
    count: count,
    datacentre: datacentre,
    servertype: servertype,
  };
};

const delay = ms => new Promise(res => setTimeout(res, ms));

async function seed() {
  // Connecting.
  console.log('About to connect to Mongodb via Mongoose');
  await connectToDb();
  console.log('Successfully connected to Mongo DB via Mongoose!');

  // Clearing data
  console.log('Clearing out the DB..');
  await Datacentre.deleteMany({});
  await Server.deleteMany({});
  await ServerType.deleteMany({});

  // Seeding
  // console.log('Our data:', data);
  console.log('About to seed 🌱..');
  const datacentres = await Datacentre.create(data[0]);
  // console.log(data[0]);
  console.log(`Seeded ${datacentres.length} datacentres.`);

  const servertypes = await ServerType.create(data[1]);
  // console.log(data[1]);
  console.log(`Seeded ${servertypes.length} server types.`)

  // To-do: Create a distribution of servertype and random dc (with weighting towards making it funny)
  // Create mapping via Server
  
  for (var datacentre of datacentres) {

    console.log(`Adding random servers to ${datacentre.name}`);
    for ( var servertype of servertypes) {
      let numberOfServers = Math.floor(Math.random() * 200);
      console.log(`Adding ${numberOfServers} servers of type ${servertype.manufacturer} ${servertype.model} to ${datacentre.name}`);
      // await added to line below... otherwise disconnect runs before it finishes.
      // await Server.create(createServer(numberOfServers, datacentre._id, servertype._id));
      Server.create(createServer(numberOfServers, datacentre._id, servertype._id));
      
    }
  }

  // Mongo is nasty and needs a sleep... or slow the loop above pick your poison.
  await delay(5000);
  console.log("Waited 5s to avoid Mongo weirdness...");
 
  // - Disconnecting.
  console.log('About to disconnect..');
  await disconnectDb();
  console.log('disconnected!');
}

seed();
