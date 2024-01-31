import RouterPaths from './router/RouterPaths.routes';
import {Provider} from 'react-redux';
import store from './config/redux/store';
import './App.css';

function App() {
	return (
		<>
			<Provider store={store}>
				<RouterPaths />
			</Provider>
		</>
	);
}

export default App;
