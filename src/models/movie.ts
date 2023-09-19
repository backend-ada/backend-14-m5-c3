import { writeFileSync } from 'jsonfile';
import { randomUUID } from 'node:crypto';
import db from '../database/movies.json';

abstract class MovieModel {
	static create(dataObj: any) {
		const { name, year, director, cast, rating } = dataObj;
		const id = randomUUID();

		db.movies.push({ id, name, year, director, cast, rating });

		writeFileSync('./src/database/movies.json', db);
		return { id, name };
	}

	static getInfo() {
		return db.info;
	}

	static getAll() {
		return db.movies;
	}

	static getById(id: string) {
		const movieFound = db.movies.find((movie) => movie.id == id);
		return movieFound;
	}

	static update(dataObj: any) {
		const { id, name, year, director, cast, rating } = dataObj;

		const movieToUpdate = db.movies.find((movie: any) => movie.id == id);

		if (!movieToUpdate) return { error: 'Movie not found' };

		if (name) movieToUpdate.name = name;
		if (year) movieToUpdate.year = year;
		if (director) movieToUpdate.director = director;
		if (cast) movieToUpdate.cast = cast;
		if (rating) movieToUpdate.rating = rating;

		writeFileSync('./src/database/movies.json', db);

		return {
			message: 'Updated successfully',
			movie: movieToUpdate,
		};
	}

	static delete() {}
}
export default MovieModel;
