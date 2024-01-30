import styled from 'styled-components'
import {Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import { FORMPAGE } from '../../config/routes/paths'

const LandingComponent = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(FORMPAGE)
    }

  return (
    <LandingComponentStyles>
        <h1>Welcome to Brandfy App</h1>
        <h2>The place where you can rebrand your Company</h2>
        <h4>Please, continue if you want to customize your logo</h4>
        <Button className='start_button' onClick={handleNavigate}>Start</Button>
        </LandingComponentStyles>
  )
}

export default LandingComponent

const LandingComponentStyles = styled.div`
display:flex;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 25vh;
& .start_button{
    width: 15vh;
    background-color: black;
    border: black;
}

`