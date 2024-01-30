import styled from 'styled-components';
import Footer from '../../components/footer/Footer';
import LandingComponent from '../../components/landing/LandingComponent';

const LandingPage = () => {
	return (
		<LandingPageStyles>
			<LandingComponent />
            <Footer />
		</LandingPageStyles>
	);
};

export default LandingPage;
const LandingPageStyles = styled.div`
width: 100%;
height: 100%;
`
