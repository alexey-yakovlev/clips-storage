// import dotenv from 'dotenv';
// dotenv.config();
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { User } from '../models';
import passport from 'passport';

export const signIn = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (info) {
			return res.status(401).json({ message: info.message });
		}
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.status(401).json({ message: 'Authentication failed' });
		}
		req.login(user, (err) => {
			if (err) return next(err);
			const { id, firstName, lastName } = user;
			//console.log('*********', req.user, req.session);
			return res.status(200).json({
				message: 'Authentication successful',
				id,
				firstName,
				lastName,
			});
		});
	})(req, res, next);
};
//--------------------START AUTH with JWT (work, but deprecated)------------------------//
// User.findOne({ email: req.body.email }, (error, user) => {
// 	if (error) {
// 		console.log(error);
// 		res.status(503).json({ error });
// 	}
// 	if (!user) {
// 		return res.status(401).json({ message: 'Authentication failed' });
// 	}
// 	bcrypt.compare(req.body.password, user.password, (err, result) => {
// 		if (err) {
// 			return res
// 				.status(401)
// 				.json({ message: 'Authentication failed' });
// 		}
// 		if (result) {
// 			const token = jwt.sign(
// 				{
// 					userId: user._id,
// 					firstName: user.firstName,
// 					lastName: user.lastName,
// 					email: user.email,
// 				},
// 				process.env.SECRET_KEY,
// 				{ expiresIn: '4h' }
// 			);
// 			return res.status(200).json({
// 				message: 'Authentication successful',
// 				token,
// 			});
// 		}
// 		res.status(401).json({ message: 'Authentication failed' });
// 	});
// });
//--------------------END AUTH with JWT------------------------//
// };
