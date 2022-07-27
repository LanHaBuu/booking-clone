import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ToastContainer } from "react-toastify"
import { Provider } from "react-redux"
import { store, persistor } from "./redux/store"
import "bootstrap/dist/css/bootstrap.min.css"
import IntlProviderWrapper from "./translations/IntlProviderWrapper"
import { PersistGate } from "redux-persist/integration/react"
import Loading from "./components/Loading/Loading"

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<IntlProviderWrapper>
				<PersistGate loading={<Loading />} persistor={persistor}>
					<App />
				</PersistGate>
			</IntlProviderWrapper>
			<ToastContainer />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
