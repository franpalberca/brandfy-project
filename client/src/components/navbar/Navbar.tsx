import {useAuth0} from '@auth0/auth0-react';
import {Button} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

const NavbarSite = () => {
	const {loginWithRedirect, logout, user, isLoading} = useAuth0();

    if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Navbar>{user ?
                <>
                <p>Welcome, {user.given_name}</p> <Button onClick={() => logout()}>Logout</Button>
                </>:
            <><p>Please, sign in</p><Button onClick={() => loginWithRedirect()}>Login</Button></>}</Navbar>
		</>
	);
};

export default NavbarSite;