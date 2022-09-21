import { createSlice } from "@reduxjs/toolkit"

const doctorSlice = createSlice({
	name: "doctor",
	initialState: {
		doctor: {
			data: [],
			loading: false,
			error: "",
		},

		// doctorInfo: {
		// 	data: [],
		// },

		doctorSchedule: {
			data: [],
		},
	},
	reducers: {
		getDocterDataStart: state => {
			state.doctor.loading = true
		},
		getDocterDataSuccess: (state, action) => {
			state.doctor.data = action.payload
			state.doctor.loading = false
		},
		getDocterDataFail: (state, action) => {
			state.doctor.error = action.payload
			state.doctor.loading = false
		},

		// getDoctorInfo: (state, action) => {
		// 	state.doctorInfo.data = action.payload
		// },

		// getDoctorSchedule: (state, action) => {
		// 	state.doctorSchedule.data = [
		// 		...state.doctorSchedule.data,
		// 		...action.payload,
		// 	]
		// },
	},
})

export const {
	getDocterDataStart,
	getDocterDataSuccess,
	getDocterDataFail,
	// getDoctorInfo,
	// getDoctorSchedule,
} = doctorSlice.actions
export default doctorSlice.reducer
