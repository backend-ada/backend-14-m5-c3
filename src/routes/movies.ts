import { Router } from 'express';
import MovieController from '../controllers/movies';

export const movieRouter = Router();

movieRouter.get('/', MovieController.getInfo);
movieRouter.get('/movies', MovieController.getAll);
movieRouter.get('/movies/:id', MovieController.getById);

movieRouter.post('/api/movies', MovieController.create);

movieRouter.patch('/api/movies/:id', MovieController.update);

movieRouter.use('*', MovieController.error);
