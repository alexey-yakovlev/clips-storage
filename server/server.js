import 'regenerator-runtime/runtime.js';
import dotenv from 'dotenv';
dotenv.config({
	path: `${__dirname}/.env`,
});
import solution from './solution';
import { connectDb } from './models';

const port = process.env.PORT || 8080;
connectDb()
	.then(() => {
		solution().listen(port, () => {
			console.log(`Server was started on port ${port}.`);
		});
	})
	.catch((err) => console.log(err));
