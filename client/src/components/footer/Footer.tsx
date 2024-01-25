import { faFigma, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterStyles>
        <a href='https://www.figma.com/file/9AboVKzQW8c5lVUiUF5ww4/Brandfy-Project?type=design&node-id=0-1&mode=design&t=CQsA6GfllSSo693f-0' target='_blank' rel='noopener noreferrer'>
    <FontAwesomeIcon style={{ fontSize: '50px' }} icon={faFigma} />
    </a>
    <a href="https://www.linkedin.com/in/fran-p-alberca/" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon style={{ fontSize: '50px' }} icon={faLinkedin} />
    </a>
    <a href="https://github.com/franpalberca" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon style={{ fontSize: '50px' }} icon={faGithub} />
    </a>
    </FooterStyles>
  )
}

export default Footer

const FooterStyles = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: space-around;
position: absolute;
bottom: 0;
`