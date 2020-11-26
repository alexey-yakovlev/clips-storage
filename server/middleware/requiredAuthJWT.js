import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.ctx = decoded;
		next();
	} catch (error) {
		return res.status(401).json({
			message: 'Authentication failed.',
		});
	}
};
