import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Navbar = (props) => {
	const { authStatus } = useAuth();

	return (
		<nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
			<div className="container">
				<Link className="navbar-brand" to="/">
					Clips Storage
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNavAltMarkup"
					aria-controls="navbarNavAltMarkup"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						{authStatus ? (
							<>
								<NavLink className="nav-item nav-link" to="/" exact>
									Home
								</NavLink>
								<NavLink className="nav-item nav-link" to="/upload">
									Upload
								</NavLink>
								<NavLink className="nav-item nav-link" to="/signOut">
									Sign Out
								</NavLink>
							</>
						) : (
							<>
								<NavLink className="nav-item nav-link" to="/signIn">
									Sign In
								</NavLink>
								<NavLink className="nav-item nav-link" to="/signUp">
									Sign Up
								</NavLink>
							</>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
