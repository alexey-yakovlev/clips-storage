import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { HOST } from '../../config';

const SignOut = (props) => {
	const { setAuthStatus } = useAuth();

	React.useEffect(() => {
		axios
			.post(`${HOST}/api/logout`) //, { withCredentials: true })
			.then(() => {
				console.log('Goodbye');
				setAuthStatus(false);
			})
			.catch((err) => {
				console.log(err);
			});
	});

	return <Redirect to="/signIn" />;
};

export default SignOut;
