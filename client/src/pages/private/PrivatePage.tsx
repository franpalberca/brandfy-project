import styled from 'styled-components';
import Footer from '../../components/footer/Footer';
import NavbarSite from '../../components/navbar/Navbar';
import FormCompany from '../../components/FormCompany/FormCompany';

const PrivatePage = () => {
	return (
		<PrivatePageStyles>
			<NavbarSite />
			<FormCompany />
            <Footer />
		</PrivatePageStyles>
	);
};

export default PrivatePage;

const PrivatePageStyles = styled.div`
width: 100%;
height: 100%;
`
