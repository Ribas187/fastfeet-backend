import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

// Controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import OpenDeliveriesController from './app/controllers/OpenDeliveriesController';
import DeliveredController from './app/controllers/DeliveredController';
import WithdrawDeliveryController from './app/controllers/WithdrawDeliveryController';
import FinishDeliveryController from './app/controllers/FinishDeliveryController';
import DeliveryProblemsController from './app/controllers/DeliveryProblemsController';

// Middlewares
import authMiddleware from './app/middlewares/authMiddleware';

const routes = new Router();
const upload = multer(multerConfig);

// Route to start a session
routes.post('/sessions', SessionController.store);

// Route to list all deliveryman's open deliveries based on ID
routes.get('/deliveryman/:id', OpenDeliveriesController.index);

// Route to list all deliveryman's deliveries based on ID
routes.get('/deliveryman/:id/deliveries', DeliveredController.index);

// Route to withdraw a delivery and set a start_date
routes.put(
  '/deliveries/withdraw/:deliveryman_id/:delivery_id',
  WithdrawDeliveryController.update
);

// Route to finish a delivery and set a end_date
routes.put(
  '/deliveries/finish/:deliveryman_id/:delivery_id',
  upload.single('file'),
  FinishDeliveryController.update
);

// Routes to list and create delivery problems
routes.get('/delivery/problems', DeliveryProblemsController.index);
routes.get('/delivery/:delivery_id/problems', DeliveryProblemsController.show);
routes.post(
  '/delivery/:delivery_id/problems',
  DeliveryProblemsController.store
);
// Route to cancel a delivety based on the problem ID
routes.delete(
  '/problem/:problem_id/cancel-delivery',
  DeliveryProblemsController.delete
);

// Authentication middleware
routes.use(authMiddleware);

// Routes to create and update users
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);

// Routes to list, create, update and delete recipients
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

// Routes to list, create, update and delete deliverymen
routes.get('/deliverymen', DeliverymanController.index);
routes.get('/deliverymen/:id', DeliverymanController.show);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

// Routes to list, create, update and delete deliveries
routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

// Route to upload files
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
