import { createSlice } from "@reduxjs/toolkit"
import {
	fetchUserFb,
	fetchUserGg,
} from "../../components/utils/FetchLocalStorage"

const userInfoGg = fetchUserGg()
const userInfoFb = fetchUserFb()

const userSlice = createSlice({
	name: "user",
	initialState: {
		login: {
			userLogin: userInfoGg || userInfoFb,
			loading: false,
			error: "",
		},

		register: {
			userRegister: null,
			loading: false,
			error: "",
		},

		getUserWithSession: {
			userSession: null,
			loading: false,
			error: "",
		},
	},
	reducers: {
		loginStart: state => {
			state.login.loading = true
		},
		loginSuccess: (state, action) => {
			state.login.loading = false
			state.login.userLogin = action.payload
		},
		loginFail: (state, action) => {
			state.login.error = action.payload
		},

		registerStart: state => {
			state.register.loading = true
		},
		registerSuccess: (state, action) => {
			state.register.loading = false
			state.register.userRegister = action.payload
		},
		registerFail: (state, action) => {
			state.register.error = action.payload
		},

		getUserStart: state => {
			state.getUserWithSession.loading = true
		},
		getUserSuccess: (state, action) => {
			state.getUserWithSession.loading = false
			state.getUserWithSession.userSession = action.payload
		},
		getUserFail: (state, action) => {
			state.getUserWithSession.error = action.payload
		},
	},
})

export const {
	loginStart,
	loginSuccess,
	loginFail,
	registerStart,
	registerSuccess,
	registerFail,
	getUserStart,
	getUserSuccess,
	getUserFail,
} = userSlice.actions
export default userSlice.reducer
