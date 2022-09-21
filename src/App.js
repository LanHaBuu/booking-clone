import { BrowserRouter, Routes, Route } from "react-router-dom"
import Test from "./components/Test"
import Admin from "./pages/Admin/Admin"
import AdminSchedule from "./pages/Admin/AdminSchedule"
import DoctorInfo from "./pages/DoctorInfo/DoctorInfo"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"

import { routes } from "./routes/routes"
import AdminSpecialist from "./pages/Admin/AdminSpecialist"
import Specialist from "./pages/Specialist/Specialist"

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route path={routes.home} element={<Home />} />
					<Route path={routes.login} element={<Login />} />
					<Route path={routes.register} element={<Register />} />
					<Route path={routes.admin} element={<Admin />} />
					<Route path={routes.doctor} element={<DoctorInfo />} />

					<Route
						path={routes.adminSchedule}
						element={<AdminSchedule />}
					/>
					<Route
						path={routes.adminSpecialist}
						element={<AdminSpecialist />}
					/>
					<Route path='/specialist/:id' element={<Specialist />} />

					<Route path='/test' element={<Test />} />
				</Routes>
			</div>
		</BrowserRouter>
	)
}

export default App
