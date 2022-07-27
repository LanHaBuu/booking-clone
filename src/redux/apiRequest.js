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
