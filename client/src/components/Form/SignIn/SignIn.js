import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Form from '../Form';
import { Spinner } from 'reactstrap';
import '../form.css';
import { useAuth } from '../../../context/auth';
import { HOST } from '../../../config';

const SignIn = (props) => {
	const [isError, setIsError] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { authStatus, setAuthStatus, chekingSesion } = useAuth();

	const onSubmitHandler = () => {
		if (!(email === '' || password === '') && /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
			axios
				.post(`${HOST}/api/signIn`, { email, password }) //, { withCredentials: true })
				.then((res) => {
					if (res.status === 200 && res.data.id) {
						setAuthStatus(true);
					} else {
						setIsError(true);
						setTimeout(() => {
							setIsError(false);
						}, 4000);
					}
				})
				.catch((err) => {
					setIsError(true);
				});
		} else {
			alert('Please enter valid details');
		}
	};

	if (chekingSesion) {
		return <Spinner color="info" style={{ width: '3rem', height: '3rem' }} />;
	}

	if (authStatus) {
		return <Redirect to="/" />;
	}

	return (
		<Form onSubmit={onSubmitHandler}>
			<h3 className="text-center text-info">Login</h3>
			<div className="form-group">
				<label htmlFor="email" className="text-info">
					Email:
				</label>
				<br />
				<input
					id="email"
					className="form-control"
					type="email"
					name="email"
					onChange={(e) => {
						setEmail(e.target.value);
						setIsError(false);
					}}
					required
				/>
			</div>
			<div className="form-group">
				<label htmlFor="password" className="text-info">
					Password:
				</label>
				<br />
				<input
					id="password"
					className="form-control"
					type="password"
					name="password"
					onChange={(e) => {
						setPassword(e.target.value);
						setIsError(false);
					}}
					required
				/>
			</div>
			<div className="d-flex justify-content-between align-items-end">
				<button onClick={onSubmitHandler} className="btn btn-info btn-md" type="button">
					Sign In
				</button>
				<Link to="/signUp" className="text-info">
					Sign Up here
				</Link>
			</div>
			{isError && (
				<div>
					<br />
					<div className="alert alert-danger" role="alert">
						Entered email or password was incorrect!
					</div>
				</div>
			)}
		</Form>
	);
};

export default SignIn;
