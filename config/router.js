import express from 'express';
import datacentreController from '../controllers/datacentreController.js';
import serverController from '../controllers/serverController.js';
import servertypeController from '../controllers/servertypeController.js';
import reportController from '../controllers/reportController.js';

const router = express.Router();

router
  .route('/reports')
  .get(reportController.getAllServersByDatacentre);

router
  .route('/datacentres')
  .get(datacentreController.getAllDatacentres)
  .post(datacentreController.createDatacentre);

router
  .route('/datacentres/:id')
  .get(datacentreController.getDatacentreById)
  .put(datacentreController.updateDatacentre)
  .delete(datacentreController.deleteDatacentre);

router
  .route('/servers')
  .post(serverController.createServer)
  .get(serverController.getAllServers);

router
  .route('/servers/:id')
  .get(serverController.getServerById)
  .put(serverController.updateServer)
  .delete(serverController.deleteServer);

router
  .route('/servertypes')
  .get(servertypeController.getAllServerTypes);

router
  .route('/servertypes/:id')
  .post(servertypeController.createServerType)
  .get(servertypeController.getServerTypeById)
  .put(servertypeController.updateServerType)
  .delete(servertypeController.deleteServerType);

router.route('/servers/:id/datacentres').get(serverController.getAllDatacentresForServer);
router.route('/servertypes/:id/datacentres').get(servertypeController.getAllDatacentresForServerType);

router.route('/datacentres/:id/servers').get(datacentreController.getAllServersForDatacentre);

export default router;