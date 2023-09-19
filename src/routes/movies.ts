import { Router } from 'express';
import MovieController from '../controllers/movies';

export const movieRouter = Router();

movieRouter.get('/', MovieController.getInfo);
movieRouter.get('/movies', MovieController.getAll);
movieRouter.get('/movies/:id', MovieController.getById);
// movieRouter.get('/movies/:id', MovieController.getByDirector);

movieRouter.post('/movies', MovieController.create);

movieRouter.patch('/movies/:id', MovieController.update);

movieRouter.use('*', MovieController.error);
