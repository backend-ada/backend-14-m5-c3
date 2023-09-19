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

	static create(req: any, res: any) {
		const { name, year, director, cast, rating } = req.body;
		const id = randomUUID();

		db.movies.push({ id, name, year, director, cast, rating });

		writeFile('./src/database/movies.json', db)
			.then((data) => {
				console.log(data);
				return res.status(201).json({ id, name });
			})
			.catch((err) => {
				return res.status(500).json({ message: 'Something went wrong', err });
			});
	}

	static update(req: any, res: any) {
		const { id } = req.params;
		const { name, year, director, cast, rating } = req.body;

		const movieToUpdate = db.movies.find((movie: any) => movie.id == id);

		if (!movieToUpdate)
			return res.status(404).json({ error: 'Movie not found' });

		if (name) movieToUpdate.name = name;
		if (year) movieToUpdate.year = year;
		if (director) movieToUpdate.director = director;
		if (cast) movieToUpdate.cast = cast;
		if (rating) movieToUpdate.rating = rating;

		writeFile('./src/database/movies.json', db)
			.then((data) => {
				console.log(data);
				return res.status(200).json({
					message: 'Updated successfully',
					movie: movieToUpdate,
				});
			})
			.catch((err) => {
				return res.status(500).json({ message: 'Something went wrong', err });
			});
	}

	static error(req: any, res: any) {
		res.status(404).json({ message: 'Requested URL not found' });
	}
}

export default MovieController;
