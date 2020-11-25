import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import path from 'path';
import passport from 'passport';
import passportConfig from './middleware/passportConfig';
import { isAuthenticatedMiddleware } from './middleware/checkAuth';
import redis from 'redis';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { signIn, signUp, upload, clips } from './routes';

export default () => {
	const app = new express();
	app.use(morgan('combined'));
	app.use(cors());
	const RedisStore = connectRedis(session);
	const isDev = process.env.NODE_ENV !== 'production';
	const redisClient = isDev ? redis.createClient() : redis.createClient(process.env.REDIS_URL);
	redisClient.on('error', console.error);

	// app.use(
	// 	cors({
	// 		origin: isDev
	// 			? 'http://localhost:3000'
	// 			: `http://${process.env.HEROKU_APP_NAME}.herokuapp.com`,
	// 		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
	// 		credentials: true,
	// 	})
	// );
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	// app.use(function (req, res, next) {
	// 	res.header('Access-Control-Allow-Credentials', true);
	// 	res.header('Access-Control-Allow-Origin', req.headers.origin);
	// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
	// 	res.header(
	// 		'Access-Control-Allow-Headers',
	// 		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
	// 	);
	// 	next();
	// });

	app.use(
		session({
			store: new RedisStore({
				client: redisClient,
			}),
			name: 'app_sess',
			secret: process.env.SECRET_KEY,
			resave: false,
			saveUninitialized: false,
			cookie: { secure: false, sameSite: true },
		})
	);

	app.use((req, res, next) => {
		if (!req.session) {
			return next(new Error('Session generate failed'));
		}
		next();
	});

	passportConfig(passport);
	app.use(passport.initialize());
	app.use(passport.session());

	app.use('/clip', isAuthenticatedMiddleware, express.static('media/uploads'));

	app.use('/api/signIn', signIn);
	app.use('/api/signUp', signUp);
	app.use('/api/upload', upload);
	app.use('/api/clips', clips);
	app.post('/api/logout', (req, res) => {
		req.logout();
		return res.status(200).json({
			message: 'Logout successful',
		});
	});

	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, 'client/build')));
		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, 'client/build', 'index.html'), (err) => {
				if (err) next(err);
				else console.log('Sended index.html');
			});
		});
	}

	app.use((_req, _res, next) => {
		next(new NotFoundError());
	});

	app.use((err, _req, res, next) => {
		res.status(err.status);
		switch (err.status) {
			case 404:
				res.status(404).json({ error });
				break;
			default:
				next(new Error('Unexpected error'));
		}
	});

	return app;
};
