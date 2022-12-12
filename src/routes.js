import { Router } from 'express';
import authMiddleware from './middlewares/auth';

import AssinanteController from './controllers/AssinanteController';
import AuthController from './controllers/AuthController';

const routes = Router();

routes.post('/login', AuthController.store);
routes.post('/primeiro-acesso', AuthController.primeiroAcesso);

routes.use(authMiddleware)
routes.get('/assinante', AssinanteController.get);

export default routes;