import Express from 'express';
import { signUp } from '../controllers/signUp';

const router = Express.Router();
router.post('/', signUp);

export default router;
