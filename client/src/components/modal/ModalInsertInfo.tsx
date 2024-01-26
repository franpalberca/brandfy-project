import {Button, Modal, Form} from 'react-bootstrap';
import {connect} from 'react-redux';
import {setCompanyName, setFile} from '../../config/redux/actions';

interface ModalInsertInfoProps {
    show: boolean;
    onHide: () => void;
    companyName: string;
    file: File | null;
}

const ModalInsertInfo = (props: ModalInsertInfoProps & typeof mapDispatchToProps) => {
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.setCompanyName(e.target.value);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		props.setFile(e.target.files![0]);
	};

	const handleSubmit = () => {
		console.log('Nombre de la empresa:', props.companyName);
		console.log('Archivo cargado:', props.file);
		props.onHide();
	};

	return (
		<>
			<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">Datos de tu empresa</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="companyName">
							<Form.Label>Nombre de tu empresa:</Form.Label>
							<Form.Control type="text" placeholder="Ingresa el nombre de la empresa" value={props.companyName} onChange={handleNameChange} />
						</Form.Group>
						<Form.Group controlId="file">
							<Form.Label>Cargar archivo:</Form.Label>
							<Form.Control type="file" onChange={handleFileChange} />
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={handleSubmit}>Enviar</Button>
					<Button onClick={props.onHide}>Cancelar</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

const mapStateToProps = (state: { companyName: string; file: File | null}) => ({
	companyName: state.companyName,
	file: state.file,
});

const mapDispatchToProps = {
	setCompanyName,
	setFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalInsertInfo);
