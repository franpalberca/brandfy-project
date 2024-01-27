import {useState} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import {Button} from 'react-bootstrap';

const Board = ({companyName, file}: {companyName: string; file: File | null}) => {
	const [rotation, setRotation] = useState(0);
	const [scale, setScale] = useState(1);
	const [verticalPosition, setVerticalPosition] = useState(0);
	const [horizontalPosition, setHorizontalPosition] = useState(0);
	const [showControls, setShowControls] = useState(false);

	const handleImageClick = () => {
		setShowControls(true);
	};

	const handleTextClick = () => {
		setShowControls(true);
	};

	const handleRotate = (value: number) => {
		setRotation(value);
	};

	const handleScale = (value: number) => {
		setScale(value);
	};

	const handleVerticalPosition = (value: number) => {
		setVerticalPosition(value);
	};

	const handleHorizontalPosition = (value: number) => {
		setHorizontalPosition(value);
	};

	return (
		<BoardStyles>
			<div className="whole_site">
				<div className="board">
					{file && (
						<ImageContainer rotation={rotation} scale={scale} verticalPosition={verticalPosition} horizontalPosition={horizontalPosition} onClick={handleImageClick}>
							<img className="company_image" src={URL.createObjectURL(file)} alt="Imagen cargada" />
						</ImageContainer>
					)}
					<h1 className="company_name" onClick={handleTextClick}>
						{companyName}
					</h1>
				</div>
				<div className="sidebar">
					{showControls && (
						<ControlsContainer>
							<div>
								<label>Rotate:</label>
								<SliderWithInput value={rotation} onChange={handleRotate} />
							</div>
							<div>
								<label>Scale:</label>
								<SliderWithInput value={scale} onChange={handleScale} />
							</div>
							<div>
								<label>Vertical Position:</label>
								<SliderWithInput value={verticalPosition} onChange={handleVerticalPosition} />
							</div>
							<div>
								<label>Horizontal Position:</label>
								<SliderWithInput value={horizontalPosition} onChange={handleHorizontalPosition} />
							</div>
						</ControlsContainer>
					)}
				</div>
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
		grid-template-columns: 75% 25%;
		grid-template-rows: 1fr;
		grid-column-gap: 0px;
		grid-row-gap: 0px;
		height: 76vh;
	}
	& .board {
		grid-area: 1 / 1 / 2 / 2;
		background-color: yellow;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	& .sidebar {
		grid-area: 1 / 2 / 2 / 3;
		background-color: brown;
	}
	& .company_image {
		width: 40px;
		cursor: pointer;
	}
	& .company_name {
		cursor: pointer;
	}
`;

const ImageContainer = styled.div<{rotation: number; scale: number; verticalPosition: number; horizontalPosition: number}>`
	transform: translate(${(props) => props.horizontalPosition}px, ${(props) => props.verticalPosition}px) rotate(${(props) => props.rotation}deg) scale(${(props) => props.scale});
	transition: transform 0.3s ease;
`;

const ControlsContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 20px;
`;

const SliderWithInput = ({value, onChange}: {value: number; onChange: (value: number) => void}) => {
	return (
		<SliderContainer>
			<Slider value={value} min={-100} max={100} onChange={onChange} />
			<InputBox>
				<input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
				<div>
					<Button onClick={() => onChange(value + 1)}>+</Button>
					<Button onClick={() => onChange(value - 1)}>-</Button>
				</div>
			</InputBox>
		</SliderContainer>
	);
};

const SliderContainer = styled.div`
	display: flex;
	align-items: center;
`;

const InputBox = styled.div`
	display: flex;
	align-items: center;
	margin-left: 10px;

	input {
		width: 50px;
		margin-right: 5px;
	}

	button {
		width: 20px;
		height: 20px;
	}
`;
