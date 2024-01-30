import {Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {setCompanyName, setFile} from '../../config/redux/actions';
import { useNavigate } from 'react-router-dom';
import { LOGOPAGE } from '../../config/routes/paths';
import styled from 'styled-components'

interface FormCompanyProps {
	setCompanyName: (name: string) => void;
	setFile: (file: File) => void;
}

const FormCompany = ({setCompanyName, setFile}: FormCompanyProps) => {
	const navigate = useNavigate()
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCompanyName(e.target.value);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = () => {
		console.log('Datos enviados al Redux');
		navigate(LOGOPAGE)
	};

	return (
		<FormStyles>
		<Form className='form_global'>
			<Form.Group controlId="companyName">
				<Form.Label>Company Name:</Form.Label>
				<Form.Control name='companyName' type="text" placeholder="Insert your Company Name" onChange={handleNameChange} />
			</Form.Group>
			<Form.Group className='second_group_form'controlId="file">
				<Form.Label>Load File:</Form.Label>
				<Form.Control name='companyLogo' type="file" onChange={handleFileChange} />
			</Form.Group>
			<Button className='form_button' onClick={handleSubmit}>Send</Button>
		</Form>
		</FormStyles>
	);
};

const mapDispatchToProps = {
	setCompanyName,
	setFile,
};

export default connect(null, mapDispatchToProps)(FormCompany);

const FormStyles = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin-top: 25vh;
& .form_global{
	width: 70vh;
}
& .second_group_form{
	margin-top:3vh;
}
& .form_button{
	background-color: black;
	border: black;
	margin-top: 3vh;
	margin-left: 37%;
}
`
