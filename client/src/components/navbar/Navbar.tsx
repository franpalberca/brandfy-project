import {useAuth0} from '@auth0/auth0-react';
import {useEffect} from 'react';
import {Button, Image} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import {createUser} from '../../api/user.fetch';

const NavbarSite = () => {
	const {loginWithRedirect, logout, user, isLoading, getAccessTokenSilently} = useAuth0();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	useEffect(() => {
		if (user) {
			const bodyUser = {
				name: user.name || '',
				email: user.email || '',
				picture: user.picture || '',
			};
			createUser(bodyUser, getAccessTokenSilently);
		}
	}, [user]);

	return (
		<NavbarSiteStyles>
			<Navbar>
				{user ? (
					<div className="navbar_data">
						<Image src="https://i.postimg.cc/T2gvhsvL/brandfy-logo.png" alt="logo_brandfy" className="logo_brandfy" />
						<p className="log_text">Welcome, {user.given_name}</p>{' '}
						<Button className="log_button" onClick={() => logout()}>
							Logout
						</Button>
					</div>
				) : (
					<div className="navbar_data">
						<p className="log_text">Please, sign in</p>
						<Button className="log_button" onClick={() => loginWithRedirect()}>
							Login
						</Button>
					</div>
				)}
			</Navbar>
		</NavbarSiteStyles>
	);
};

export default NavbarSite;

const NavbarSiteStyles = styled.div`
	& .navbar_data {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
	}
	& .logo_brandfy {
		width: 14vh;
	}
	& .log_text {
		grid-area: 1 / 2 / 2 / 3;
		font-size: 8vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	& .log_button {
		grid-area: 1 / 3 / 2 / 4;
		width: 15vh;
		height: 8vh;
		display: flex;
		position: relative;
		left: 55vh;
		background-color: black;
		border-color: black;
	}
`;
