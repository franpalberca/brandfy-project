import styled from 'styled-components';
import Footer from '../../components/footer/Footer';
import NavbarSite from '../../components/navbar/Navbar';
import ModalInsertInfo from '../../components/modal/ModalInsertInfo';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const PrivatePage = () => {
	const [modalShow, setModalShow] = useState(false);
	return (
		<PrivatePageStyles>
			<NavbarSite />
			<Button onClick={() => setModalShow(true)}>Mostrar Modal</Button>
			<ModalInsertInfo show={modalShow} onHide={() => setModalShow(false)}/>
            <Footer />
		</PrivatePageStyles>
	);
};

export default PrivatePage;

const PrivatePageStyles = styled.div`
width: 100%;
height: 100%;
`
