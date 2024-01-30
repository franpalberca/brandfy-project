import styled from 'styled-components';
import Footer from '../../components/footer/Footer';
import FormCompany from '../../components/FormCompany/FormCompany';

const FormPage = () => {
	return (
		<FormPageStyles>
			<FormCompany />
            <Footer />
		</FormPageStyles>
	);
};

export default FormPage;

const FormPageStyles = styled.div`
width: 100%;
height: 100%;
`
