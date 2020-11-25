import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Form from '../Form';
import '../form.css';
import { HOST } from '../../../config';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			redirect: false,
		};
	}

	onSubmitHandler = (e) => {
		e.preventDefault();
		if (
			!(
				this.state.firstName === '' ||
				this.state.lastName === '' ||
				this.state.email === '' ||
				this.state.password === ''
			) &&
			/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(this.state.email)
		) {
			axios
				.post(`${HOST}/api/signUp`, {
					firstName: this.state.firstName,
					lastName: this.state.lastName,
					email: this.state.email,
					password: this.state.password,
				})
				.then((res) => {
					console.log(res.data);
					this.setState({
						redirect: true,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			alert('Please enter valid details');
		}
	};

	inputChangeHandler = ({ target }) => {
		this.setState({
			[target.name]: target.value,
		});
	};

	render() {
		if (this.state.redirect) return <Redirect to="/" />;
		return (
			<Form onSubmit={this.onSubmitHandler}>
				<h3 className="text-center text-info">Register</h3>
				<div className="form-group">
					<label htmlFor="first-name" className="text-info">
						First Name:
					</label>
					<br />
					<input
						id="first-name"
						className="form-control"
						type="text"
						name="firstName"
						onChange={this.inputChangeHandler}
						required
					/>
				</div>
				<div className="form-group">
					<label htmlFor="last-name" className="text-info">
						Last Name:
					</label>
					<br />
					<input
						id="last-name"
						className="form-control"
						type="text"
						name="lastName"
						onChange={this.inputChangeHandler}
						required
					/>
				</div>
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
						onChange={this.inputChangeHandler}
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
						onChange={this.inputChangeHandler}
						required
					/>
				</div>
				<div className="d-flex justify-content-between align-items-end">
					<button
						onClick={this.onSubmitHandler}
						className="btn btn-info btn-md"
						type="button">
						Sign Up
					</button>
					<Link to="/signIn" className="text-info">
						Login here
					</Link>
				</div>
			</Form>
		);
	}
}

export default SignIn;
