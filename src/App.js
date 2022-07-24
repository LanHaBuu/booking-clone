import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import { routes } from "./routes/routes"

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route path={routes.home} element={<Home />} />
					<Route path={routes.login} element={<Login />} />
					<Route path={routes.register} element={<Register />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
