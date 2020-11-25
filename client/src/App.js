import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Upload from './components/Upload/Upload';
import SignIn from './components/Form/SignIn/SignIn';
import SignUp from './components/Form/SignUp/SignUp';
import SignOut from './components/SignOut/SignOut';
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';

const App = () => {
	const [authStatus, setAuthStatus] = useState(false);
	const setAuth = (status) => {
		setAuthStatus(status);
	};

	return (
		<AuthContext.Provider value={{ authStatus, setAuthStatus: setAuth }}>
			<Router>
				<Navbar />
				<PrivateRoute exact path="/" component={Home} />
				<PrivateRoute path="/upload" component={Upload} />
				<Route path="/signIn" component={SignIn} />
				<Route path="/signUp" component={SignUp} />
				<Route path="/signOut" component={SignOut} />
			</Router>
		</AuthContext.Provider>
	);
};

export default App;
