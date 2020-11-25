import User from '../models/user';
import bcrypt from 'bcrypt';
import passportLocal from 'passport-local';

const LocalStrategy = passportLocal.Strategy;

export default (passport) => {
	passport.use(
		new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
			User.findOne({ email }, (err, user) => {
				if (err) return done(err);
				if (!user) {
					return done(null, false, {
						message: 'Authentication failed.',
					});
				}
				bcrypt.compare(password, user.password, (err, result) => {
					if (err) return done(err);
					if (result) {
						return done(null, user);
					} else {
						return done(null, false, {
							message: 'Authentication failed.',
						});
					}
				});
			});
		})
	);

	passport.serializeUser((user, cb) => {
		const { id, firstName, lastName, email } = user;
		cb(null, { id });
	});

	passport.deserializeUser(({ id }, cb) => {
		User.findOne({ _id: id }, (err, user) => {
			const { id, firstName, lastName, email } = user;
			cb(err, { id, firstName, lastName, email });
		});
	});
};
