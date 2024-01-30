import {useState} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Button} from 'react-bootstrap';
import { createData } from '../../api/data.fetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

interface LogoInfoInterface {
	rotation: number;
	scale: number;
	verticalPosition: number;
	horizontalPosition: number;
}

interface TextInfoInterface {
	textTransform: string;
	fontWeight: number;
	letterSpacing: number;
	alignment: 'left' | 'center' | 'right';
}

const Board = ({companyName, file}: {companyName: string; file: File | null}) => {
	const [logoInfo, setLogoInfo] = useState<LogoInfoInterface>({
		rotation: 0,
		scale: 1,
		verticalPosition: 0,
		horizontalPosition: 0,
	});
	const [textInfo, setTextInfo] = useState<TextInfoInterface>({
		textTransform: 'none',
		fontWeight: 400,
		letterSpacing: 0,
		alignment: 'left',
	});
	const [showTextControls, setShowTextControls] = useState(false);
	const [showLogoControls, setShowLogoControls] = useState(false);

	const handleImageClick = () => {
		setShowTextControls(false);
		setShowLogoControls(!showLogoControls);
	};

	const handleTextClick = () => {
		setShowLogoControls(false);
		setShowTextControls(!showTextControls);
	};

	const handleSliderChange = (key: keyof LogoInfoInterface, value: number) => {
		setLogoInfo({...logoInfo, [key]: value});
	};

	const handleTextChange = (key: keyof TextInfoInterface, value: any) => {
		setTextInfo({...textInfo, [key]: value});
	};

	const handleSave = async () => {
        if (!file) return; 

        const formData = new FormData();
        formData.append('companyLogo', file); 

        try {
            const data = await createData(formData);
            console.log('Logo guardado:', data);
        } catch (error) {
            console.error('Error al guardar el logo:', error);
        }
    };

	return (
		<BoardStyles>
			<div className="whole_site">
				<div className="board">
					{file && (
						<ImageContainer {...logoInfo} onClick={handleImageClick}>
							<img className="company_image" src={URL.createObjectURL(file)} alt="Imagen cargada" />
						</ImageContainer>
					)}
					<h1 className="company_name" onClick={handleTextClick} style={{...textInfo}}>
						{companyName}
					</h1>
				</div>
				<div className="sidebar">
					{(showTextControls || showLogoControls) && (
						<ControlsContainer>
							{showTextControls && (
								<>
									<div>
										<label>Case:</label>
										<ButtonGroup>
											<Button style={{backgroundColor: 'black', border: 'black', color: 'white'}} variant={textInfo.textTransform === 'none' ? 'primary' : 'outline-primary'} onClick={() => handleTextChange('textTransform', 'none')}>
												Normal
											</Button>
											<Button style={{backgroundColor: 'black', border: 'black', color: 'white'}} variant={textInfo.textTransform === 'uppercase' ? 'primary' : 'outline-primary'} onClick={() => handleTextChange('textTransform', 'uppercase')}>
												UPPERCASE
											</Button>
											<Button style={{backgroundColor: 'black', border: 'black', color: 'white'}} variant={textInfo.textTransform === 'lowercase' ? 'primary' : 'outline-primary'} onClick={() => handleTextChange('textTransform', 'lowercase')}>
												lowercase
											</Button>
										</ButtonGroup>
									</div>
									<div>
										<label>Font Weight:</label>
										<SliderWithInput value={textInfo.fontWeight} onChange={(value) => handleTextChange('fontWeight', value)} />
									</div>
									<div>
										<label>Letter Spacing:</label>
										<SliderWithInput value={textInfo.letterSpacing} onChange={(value) => handleTextChange('letterSpacing', value)} />
									</div>
									<div>
										<label>Alignment:</label>
										<ButtonGroup>
											<Button style={{backgroundColor: 'black', border: 'black', color: 'white'}} variant={textInfo.alignment === 'left' ? 'primary' : 'outline-primary'} onClick={() => handleTextChange('alignment', 'left')}>
												Left
											</Button>
											<Button style={{backgroundColor: 'black', border: 'black', color: 'white'}} variant={textInfo.alignment === 'center' ? 'primary' : 'outline-primary'} onClick={() => handleTextChange('alignment', 'center')}>
												Center
											</Button>
											<Button style={{backgroundColor: 'black', border: 'black', color: 'white'}} variant={textInfo.alignment === 'right' ? 'primary' : 'outline-primary'} onClick={() => handleTextChange('alignment', 'right')}>
												Right
											</Button>
										</ButtonGroup>
									</div>
								</>
							)}
							{showLogoControls && (
								<>
									<div>
										<label>Rotate:</label>
										<SliderWithInput value={logoInfo.rotation} onChange={(value) => handleSliderChange('rotation', value)} />
									</div>
									<div>
										<label>Scale:</label>
										<SliderWithInput value={logoInfo.scale} onChange={(value) => handleSliderChange('scale', value)} />
									</div>
									<div>
										<label>Vertical Position:</label>
										<SliderWithInput value={logoInfo.verticalPosition} onChange={(value) => handleSliderChange('verticalPosition', value)} />
									</div>
									<div>
										<label>Horizontal Position:</label>
										<SliderWithInput value={logoInfo.horizontalPosition} onChange={(value) => handleSliderChange('horizontalPosition', value)} />
									</div>
								</>
							)}
						</ControlsContainer>
					)}
				</div>
					<ButtonContainer>
					<Button className='button_save' onClick={handleSave}>Save</Button>
					</ButtonContainer>
			</div>
		</BoardStyles>
	);
};

const mapStateToProps = (state: {companyName: string; file: File | null}) => ({
	companyName: state.companyName,
	file: state.file,
});

export default connect(mapStateToProps)(Board);

const BoardStyles = styled.div`
	& .whole_site {
		display: grid;
		grid-template-columns: 120vh 75vh 5vh;
		grid-template-rows: 1fr;
		grid-column-gap: 20vh;
		height: 73vh;
        position: relative;
        left: -15vh;
	}
	& .board {
		grid-area: 1 / 1 / 2 / 2;
		background-image: url(https://i.postimg.cc/N0X3w3kh/pizarra.png);
        background-repeat: no-repeat;
        background-size: contain;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
        left: 28vh;
	}
	& .sidebar {
		grid-area: 1 / 2 / 2 / 3;
		background-color: grey;
        color: black;
        width: 90%;
	}
	& .company_image {
		width: 40px;
		cursor: pointer;
        display: flex;
		align-items: center;
		justify-content: center;
	}
	& .company_name {
		cursor: pointer;
        
        display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const ImageContainer = styled.div<LogoInfoInterface>`
	transform: translate(${(props) => props.horizontalPosition}px, ${(props) => props.verticalPosition}px) rotate(${(props) => props.rotation}deg) scale(${(props) => props.scale});
	transition: transform 0.3s ease;
`;

const ControlsContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
`;

const ButtonContainer = styled.div`
grid-area: 1 / 3 / 2 / 4;
    display: flex;
    align-items: center;
    margin-top: -65vh;

	& .button_save{
		margin-left: -15vh;
		background-color: black;
		border: black;
	}
	`

const SliderWithInput = ({value, onChange}: {value: number; onChange: (value: number) => void}) => {
	return (
		<SliderContainer>
			<Slider value={value} min={0} max={100} onChange={onChange} />
			<InputBox>
				<input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
			</InputBox>
		</SliderContainer>
	);
};

const SliderContainer = styled.div`
	display: flex;
	align-items: center;
    width: 95%;
    margin-top: 1vh;
`;

const InputBox = styled.div`
	display: flex;
	align-items: center;
	margin-left: 10px;

	input {
		width: 50px;
		margin-right: 5px;
	}
	`;

const ButtonGroup = styled.div`
	display: flex;
	button {
		margin-right: 5px;
	}
`;
