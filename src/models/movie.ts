import { writeFile } from 'jsonfile';
import { randomUUID } from 'node:crypto';
import db from '../database/movies.json';

abstract class MovieModel {
	static create() {}

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

	static update() {}

	static delete() {}
}
export default MovieModel;
