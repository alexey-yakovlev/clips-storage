import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Upload from './components/Upload/Upload';
import SignIn from './components/Form/SignIn/SignIn';
import SignUp from './components/Form/SignUp/SignUp';
import SignOut from './components/SignOut/SignOut';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';
import { HOST } from './config';

const App = () => {
	const [authStatus, setAuthStatus] = useState(false);
	const [chekingSesion, setChekingSesion] = useState(false);
	const setAuth = (status) => {
		setAuthStatus(status);
	};

	useEffect(() => {
		setChekingSesion(true);
		axios
			.post(`${HOST}/api/isLogged`) //, { withCredentials: true })
			.then((res) => {
				if (res.status === 200) {
					setChekingSesion(false);
					setAuthStatus(true);
				} else {
					setChekingSesion(false);
					setAuthStatus(false);
				}
			})
			.catch((err) => {
				setChekingSesion(false);
				console.log(err);
			});
	}, []);

	return (
		<AuthContext.Provider
			value={{ authStatus, setAuthStatus: setAuth, chekingSesion, setChekingSesion }}>
			<Router>
				<Navbar />
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute path="/upload" component={Upload} />
				<Route path="/signIn" component={SignIn} />
				<Route path="/signUp" component={SignUp} />
				<PrivateRoute path="/signOut" component={SignOut} />
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
