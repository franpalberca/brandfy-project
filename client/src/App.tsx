import { Auth0Provider } from "@auth0/auth0-react"
import RouterPaths from "./router/RouterPaths.routes"
import { Provider } from "react-redux";
import store from "./config/redux/store";
import './App.css'

function App() {
  const {VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENT_ID: clientId} = import.meta.env;
  const redirectUri = window.location.origin + '/private';
  return (
    <>
     <Auth0Provider
				domain={domain}
				clientId={clientId}
				authorizationParams={{
					redirect_uri: redirectUri,
				}}>
          <Provider store={store}>
				<RouterPaths />
        </Provider>
			</Auth0Provider>
    </>
  )
}

export default App
