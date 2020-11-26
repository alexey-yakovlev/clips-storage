export const isAuthenticatedMiddleware = (req, res, next) => {
	console.log('USER & SESSION DATA', req.user, req.session.passport);
	if (req.isAuthenticated()) {
		return next();
	}
	return res.status(403).json({ message: 'User not authenticated.' });
};
