//import passport from 'passport';
import Express from 'express';
import { signIn } from '../controllers/signIn';
const router = Express.Router();
router.post(
	'/',
	(req, res, next) => {
		console.log('^^^:', req.method, req.body);
		next();
	},
	signIn
);

export default router;
