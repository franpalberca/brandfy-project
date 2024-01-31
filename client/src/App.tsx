import RouterPaths from './router/RouterPaths.routes';
import {Provider} from 'react-redux';
import store from './config/redux/store';
import './App.css';
import { AuthProvider } from './config/context/AuthContext';

function App() {
	return (
		<>
    <AuthProvider>
			<Provider store={store}>
				<RouterPaths />
			</Provider>
      </AuthProvider>
		</>
	);
}

export default App;
