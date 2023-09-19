import MovieModel from '../models/movie';

abstract class MovieController {
	static getInfo(req: any, res: any) {
		const info = MovieModel.getInfo();
		res.json(info);
	}

	static getAll(req: any, res: any) {
		const queryParams = req.query;
		console.log(queryParams);

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

	// static getByDirector(req: any, res: any) {
	// 	// Trae pelis por director
	// }

	static create(req: any, res: any) {
		const { name, year, director, cast, rating } = req.body;

		const movie = MovieModel.create({ name, year, director, cast, rating });

		res.json(movie);
	}

	static update(req: any, res: any) {
		const { id } = req.params;
		const { name, year, director, cast, rating } = req.body;

		const movieUdpated = MovieModel.update({
			id,
			name,
			year,
			director,
			cast,
			rating,
		});

		console.log({ name, year, director, cast, rating });

		if (movieUdpated.error) return res.status(404).json(movieUdpated.error);

		res.json(movieUdpated);
	}

	static error(req: any, res: any) {
		res.status(404).json({ message: 'Requested URL not found' });
	}
}

export default MovieController;
