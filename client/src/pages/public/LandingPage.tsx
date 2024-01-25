import styled from 'styled-components';
import Footer from '../../components/footer/Footer';
import NavbarSite from '../../components/navbar/Navbar';

const LandingPage = () => {
	return (
		<LandingPageStyles>
			<NavbarSite />
			hola landing
            <Footer />
		</LandingPageStyles>
	);
};

export default LandingPage;
const LandingPageStyles = styled.div`
width: 100%;
height: 100%;
`
