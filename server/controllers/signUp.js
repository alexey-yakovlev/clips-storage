import bcrypt from 'bcrypt';
import { User } from '../models';

export const signUp = async (req, res) => {
	try {
		const user = await User.find({ email: req.body.email });
		if (user.length > 0) {
			return res.status(409).json({
				message: 'This email address is already being used.',
			});
		} else {
			bcrypt.hash(req.body.password, 10, (error, hash) => {
				if (error) {
					console.log(error);
					return res.status(500).json({ error });
				} else {
					const user = new User({
						firstName: req.body.firstName,
						lastName: req.body.lastName,
						email: req.body.email,
						password: hash,
					});
					user.save()
						.then((result) => {
							console.log(result);
							res.status(201).json({
								message: 'User created successfully.',
							});
						})
						.catch((error) => {
							console.log(err);
							res.status(500).json({ error });
						});
				}
			});
		}
	} catch (error) {
		console.log(error);
		res.status(422).json({ error });
	}
};
