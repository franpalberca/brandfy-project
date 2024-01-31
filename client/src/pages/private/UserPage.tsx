import { useState, useContext, useEffect } from 'react';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NavbarSite from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import styled from 'styled-components';
import { AuthContext } from '../../config/context/AuthContext';

interface Company {
    companyName: string;
    companyLogoUrl: string;
    companyStyles: {
        companyStylesNameCase: string;
        companyStylesNameFont: number;
        companyStylesNameSpacing: number;
        companyStylesNameAlignment: number;
        companyStylesLogoRotation: number;
        companyStylesLogoScale: number;
        companyStylesLogoVertical: number;
        companyStylesLogoHorizontal: number;
    }[];
}

const UserPage = () => {
    const urlData = import.meta.env.VITE_API_URL_DATA;
    const [companies, setCompanies] = useState<Company[]>([]);

	const {user} = useContext(AuthContext)

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(urlData);
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCompanies();
    }, [user]);

    return (
        <>
            <NavbarSite />
			{ user ?
            <UserPageStyles>
                <h1 className='title'>Here you can find your logos</h1>
                <div className='logos_grid'>
                    {companies.map((company, index) => (
                        <div key={index} className='company_logo_container'>
                            <OverlayTrigger
                                placement='bottom'
                                overlay={
                                    <Tooltip id={`tooltip-${index}`}>
                                        <div>Company Styles:</div>
                                        <ul>
                                            <li>Case: {company.companyStyles[0].companyStylesNameCase}</li>
                                            <li>Font: {company.companyStyles[0].companyStylesNameFont}</li>
                                            <li>Spacing: {company.companyStyles[0].companyStylesNameSpacing}</li>
                                            <li>Alignment: {company.companyStyles[0].companyStylesNameAlignment}</li>
                                            <li>Rotation: {company.companyStyles[0].companyStylesLogoRotation}</li>
                                            <li>Scale: {company.companyStyles[0].companyStylesLogoScale}</li>
                                            <li>Vertical: {company.companyStyles[0].companyStylesLogoVertical}</li>
                                            <li>Horizontal: {company.companyStyles[0].companyStylesLogoHorizontal}</li>
                                        </ul>
                                    </Tooltip>
                                }
                            >
                                <div>
                                    <Image
                                        src={company.companyLogoUrl}
                                        alt={`Company Logo ${index}`}
                                        className='image_logo'
                                    />
                                    <div className='company_name'>{company.companyName}</div>
                                </div>
                            </OverlayTrigger>
                        </div>
                    ))}
                </div>
            </UserPageStyles>
			: <div></div>
				}
            <Footer />
        </>
    );
};

export default UserPage;

const UserPageStyles = styled.div`
    & .title {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10vh;
    }

    & .logos_grid {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 10px;
    }

    & .company_logo_container {
        position: relative;
    }

    & .image_logo {
        width: 100%;
        height: auto;
    }

    & .company_name {
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(255, 255, 255, 0.8);
        padding: 5px;
        border-radius: 5px;
    }
`;



