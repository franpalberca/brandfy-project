import {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import styled from 'styled-components';
import {getUser} from '../../api/user.fetch';
import {useNavigate} from 'react-router-dom';
import {FORMPAGE} from '../../config/routes/paths';

const LoginComponent = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const userData = {
			userEmail: email,
			userPassword: password,
		};

		try {
			const response = await getUser(userData);

			if (response && response.success) {
				console.log('Inicio de sesión exitoso');
				navigate(FORMPAGE);
			} else {
				console.error('Error al iniciar sesión');
			}
		} catch (error) {
			console.error('Hubo un error en la solicitud:', error);
		}
	};

	return (
		<FormStyles>
			<Form className="form_global" onSubmit={handleSubmit}>
				<Form.Group controlId="email">
					<Form.Label>Email:</Form.Label>
					<Form.Control type="email" placeholder="Enter your email" value={email} onChange={handleEmailChange} required />
				</Form.Group>

				<Form.Group className='group_form' controlId="password">
					<Form.Label>Password:</Form.Label>
					<Form.Control type="password" placeholder="Enter your password" value={password} onChange={handlePasswordChange} required />
				</Form.Group>

				<Button className="form_button" type="submit">
					Log In
				</Button>
			</Form>
		</FormStyles>
	);
};

export default LoginComponent;

const FormStyles = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 25vh;

	& .form_global {
		width: 70vh;
	}

    & .group_form{
        margin-top:3vh;
    }

	& .form_button {
		background-color: black;
		border: black;
		margin-top: 3vh;
		margin-left: 30%;
	}
`;
