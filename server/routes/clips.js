import Express from 'express';
import { getAllClips, deleteClipById } from '../controllers/clips';
import { isAuthenticatedMiddleware } from '../middleware/checkAuth';

const router = Express.Router();

router.delete(
	'/:id',
	isAuthenticatedMiddleware,
	(req, res, next) => {
		console.log('Request:', req.method, req.body, req.params);
		next();
	},
	deleteClipById
);

router.get('/', isAuthenticatedMiddleware, getAllClips);

export default router;
