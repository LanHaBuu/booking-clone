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
