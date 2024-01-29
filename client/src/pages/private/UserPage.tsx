import {useState, useEffect} from 'react';
import {Image} from 'react-bootstrap';
import NavbarSite from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styled from 'styled-components';

const UserPage = () => {
	const urlData = import.meta.env.VITE_API_URL_DATA;
	const [company, setCompany] = useState([]);
	console.log(company);

	useEffect(() => {
		const getCompanyLogos = async () => {
			try {
				const response = await fetch(`${urlData}`);
				const data = await response.json();
				setCompany(data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		getCompanyLogos();
	}, [urlData]);
	return (
        <>
        <NavbarSite />
		<UserPageStyles>
            <h1 className='title'>Here you can find your logos</h1>
            <div className='logos_grid'>
			{company.map((companyItem, index) => (
				<Image key={index} src={companyItem.companyLogo} alt={`Company Logo ${index}`} className='image_logo'/>
			))}
            </div>
		</UserPageStyles>
            <Footer />
        </>
	);
};

export default UserPage;

const UserPageStyles = styled.div`
& .title{
    display:flex;
    align-items:center;
    justify-content:center;
    margin-bottom:10vh;
}
& .logos_grid{
    display: grid;
    grid-template-columns: 15% 15% 15% 15% 15% 15%;
}
& .image_logo {
    width: 30vh;
}
`


