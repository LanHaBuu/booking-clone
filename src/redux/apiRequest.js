import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { routes } from "../routes/routes"
import {
	loginStart,
	loginSuccess,
	loginFail,
	registerStart,
	registerSuccess,
	registerFail,
	getUserStart,
	getUserSuccess,
	getUserFail,
} from "./Slice/userSlice"

import {
	getDocterDataFail,
	getDocterDataStart,
	getDocterDataSuccess,
} from "./Slice/doctorSlice"
import { getTime } from "./Slice/timeSlice"
import { fetchCastSuccess } from "./Slice/castSlice"

import { getDatabase, ref, child, get, set } from "firebase/database"
import { getPatientSuccess } from "./Slice/patientSlice"
import { getDoctorDetailSuccess } from "./Slice/doctorDetailSlice"
import { getDoctorScheduleSuccess } from "./Slice/doctorScheduleSlice"
import { getDataSpecial } from "./Slice/dataSpecialist"

// --------------user------------------
export const login = (user, dispatch, navigate) => {
	dispatch(loginStart())
	axios
		.post(process.env.REACT_APP_USER_LOGIN, user)
		.then(res => {
			dispatch(loginSuccess(res.data))
			navigate(routes.home)
		})
		.catch(err => {
			dispatch(loginFail(err.message))
			toast.error("Sai tên đăng nhập hoặc mật khẩu")
		})
}

export const register = (user, dispatch, navigate) => {
	dispatch(registerStart())
	axios
		.post(process.env.REACT_APP_CREATE_USER, user)
		.then(res => {
			dispatch(registerSuccess(res.data))
			toast.success("Register Success")
			navigate(routes.login)
		})
		.catch(err => {
			dispatch(registerFail(err.message))
			toast.error(err.message)
		})
}

export const getUserWithSession = (accessToken, dispatch) => {
	dispatch(getUserStart())
	axios
		.get("https://api.escuelajs.co/api/v1/auth/profile", {
			headers: { Authorization: `Bearer  ${accessToken}` },
		})
		.then(res => {
			dispatch(getUserSuccess(res.data))
		})
		.catch(err => {
			dispatch(getUserFail(err.message))
		})
}

export const checkEmail = email => {
	return axios.post(process.env.REACT_APP_CHECK_MAIL, { email })
}

// --------------------doctor-----------------
export const getDataDoctor = dispatch => {
	dispatch(getDocterDataStart())
	axios
		.get("https://mocki.io/v1/62ed7d0b-aa55-4f23-8dfb-b05b87e40b2c")
		.then(res => {
			dispatch(getDocterDataSuccess(res.data))
		})
		.catch(err => {
			dispatch(getDocterDataFail(err.message))
			toast.error(err.message)
		})
}

// ------------------time------------------
export const fetchTime = dispatch => {
	axios
		.get("https://mocki.io/v1/62595e97-4e59-447e-a674-2e6ec61cd996")
		.then(res => {
			dispatch(getTime(res.data))
		})
		.catch(err => {
			toast.error(err.message)
		})
}

// ------------------thanh toán------------
export const fetchCast = dispatch => {
	axios
		.get("https://mocki.io/v1/b0074468-0ebb-4621-b7e8-b9094590b0f5")
		.then(res => {
			dispatch(fetchCastSuccess(res.data))
		})
		.catch(err => {
			toast.error(err.massage)
		})
}

// -------------firebase-------------

export const postPatiens = data => {
	const db = getDatabase()
	const userId = data.userId
	set(ref(db, `patients/${userId}`), data)
}

export const getPatiens = dispatch => {
	const dbRef = ref(getDatabase())
	get(child(dbRef, `patients/`))
		.then(snapshot => {
			if (snapshot.exists()) {
				dispatch(getPatientSuccess(snapshot.val()))
			} else {
				console.log("No data available")
			}
		})
		.catch(error => {
			console.error(error)
		})
}

export const postDoctorDetail = data => {
	const db = getDatabase()
	set(ref(db, `doctor-detail/${data.doctorId}`), data)
}

export const getDoctorDetail = dispatch => {
	const dbRef = ref(getDatabase())
	get(child(dbRef, `doctor-detail/`))
		.then(snapshot => {
			if (snapshot.exists()) {
				dispatch(getDoctorDetailSuccess(snapshot.val()))
			} else {
				console.log("No data available")
			}
		})
		.catch(error => {
			console.error(error)
		})
}

export const postDoctorSchedule = data => {
	const db = getDatabase()
	set(ref(db, `doctor-schedule/`), data)
}

export const getDoctorScheduleApi = dispatch => {
	const dbRef = ref(getDatabase())
	get(child(dbRef, `doctor-schedule/`))
		.then(snapshot => {
			if (snapshot.exists()) {
				dispatch(getDoctorScheduleSuccess(snapshot.val()))
			} else {
				console.log("No data available")
			}
		})
		.catch(error => {
			console.error(error)
		})
}

export const postDataSpecialist = data => {
	const db = getDatabase()
	set(ref(db, `data-specialist/`), data)
}

export const getDataSpecialistApi = dispatch => {
	const dbRef = ref(getDatabase())
	get(child(dbRef, `data-specialist/`))
		.then(snapshot => {
			if (snapshot.exists()) {
				dispatch(getDataSpecial(snapshot.val()))
			} else {
				console.log("No data available")
			}
		})
		.catch(error => {
			console.error(error)
		})
}

// -------------------------------
export const nameSpecial = () => {
	return axios.get("https://mocki.io/v1/e9b0decd-1efb-476d-b7ed-1b5e727f0731")
}

export const nameSpecialNew = () => {
	return axios.get("https://mocki.io/v1/6d392335-c912-4f39-82d1-562ec1f77805")
}
