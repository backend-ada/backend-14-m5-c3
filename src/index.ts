import express, { json } from 'express';
import { movieRouter } from './routes/movies';

const PORT = 27000;
const app = express();

// ------------------| MIDDLEWARES |------------------- //

app.use(json());

app.use('/api', movieRouter);

// ---------------------| SERVER |--------------------- //

app.listen(PORT, () => {
	console.log('Server listening on port', PORT);
});
