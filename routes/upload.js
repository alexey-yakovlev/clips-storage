import Express from 'express';
import { multipleUpload } from '../controllers/upload';
import { isAuthenticatedMiddleware } from '../middleware/checkAuth';

const router = Express.Router();

router.post('/', isAuthenticatedMiddleware, multipleUpload);

export default router;
