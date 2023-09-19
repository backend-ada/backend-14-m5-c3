import MovieModel from '../models/movie';

abstract class MovieController {
	static getInfo(req: any, res: any) {
		const info = MovieModel.getInfo();
		res.json(info);
	}

	static getAll(req: any, res: any) {
		const movies = MovieModel.getAll();
		res.json(movies);
	}

	static getById(req: any, res: any) {
		const { id } = req.params;

		const movieFound = MovieModel.getById(id);

		if (!movieFound)
			return res.status(404).json({ message: 'Movie not found, wrong ID' });

		res.status(200).json(movieFound);
	}
}

export default MovieController;
