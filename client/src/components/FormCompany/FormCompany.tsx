import {Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {setCompanyName, setFile} from '../../config/redux/actions';
import { useNavigate } from 'react-router-dom';
import { LOGOPAGE } from '../../config/routes/paths';

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
		<Form>
			<Form.Group controlId="companyName">
				<Form.Label>Nombre de tu empresa:</Form.Label>
				<Form.Control type="text" placeholder="Ingresa el nombre de la empresa" onChange={handleNameChange} />
			</Form.Group>
			<Form.Group controlId="file">
				<Form.Label>Cargar archivo:</Form.Label>
				<Form.Control type="file" onChange={handleFileChange} />
			</Form.Group>
			<Button onClick={handleSubmit}>Enviar</Button>
		</Form>
	);
};

const mapDispatchToProps = {
	setCompanyName,
	setFile,
};

export default connect(null, mapDispatchToProps)(FormCompany);
