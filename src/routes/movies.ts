import { Router } from 'express';
import MovieController from '../controllers/movies';

export const movieRouter = Router();

movieRouter.get('/', MovieController.getInfo);

movieRouter.get('/movies', MovieController.getAll);

movieRouter.get('/movies/:id', MovieController.getById);

// movieRouter.post('/api/movies', (req, res) => {
// 	const { name, year, director, cast, rating } = req.body;
// 	const id = randomUUID();

// 	db.movies.push({ id, name, year, director, cast, rating });

// 	writeFile('./src/database/movies.json', db)
// 		.then((data) => {
// 			console.log(data);
// 			return res.status(201).json({ id, name });
// 		})
// 		.catch((err) => {
// 			return res.status(500).json({ message: 'Something went wrong', err });
// 		});
// });

// movieRouter.patch('/api/movies/:id', (req, res) => {
// 	const { id } = req.params;
// 	const { name, year, director, cast, rating } = req.body;

// 	const movieToUpdate = db.movies.find((movie: any) => movie.id == id);

// 	if (!movieToUpdate) return res.status(404).json({ error: 'Movie not found' });

// 	if (name) movieToUpdate.name = name;
// 	if (year) movieToUpdate.year = year;
// 	if (director) movieToUpdate.director = director;
// 	if (cast) movieToUpdate.cast = cast;
// 	if (rating) movieToUpdate.rating = rating;

// 	writeFile('./src/database/movies.json', db)
// 		.then((data) => {
// 			console.log(data);
// 			return res.status(200).json({
// 				message: 'Updated successfully',
// 				movie: movieToUpdate,
// 			});
// 		})
// 		.catch((err) => {
// 			return res.status(500).json({ message: 'Something went wrong', err });
// 		});
// });

// movieRouter.use('*', (req, res) => {
// 	res.status(404).json({ message: 'Requested URL not found' });
// });
