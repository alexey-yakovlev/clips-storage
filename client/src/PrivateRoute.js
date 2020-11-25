import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { authStatus } = useAuth();

	return (
		<Route
			{...rest}
			render={(props) =>
				authStatus ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/signIn', state: { referer: props.location } }} />
				)
			}
		/>
	);
};

export default PrivateRoute;
