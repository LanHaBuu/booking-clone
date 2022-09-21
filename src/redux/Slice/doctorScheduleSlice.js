import { createSlice } from "@reduxjs/toolkit"

const doctorSchedule = createSlice({
	name: "doctorSchedule",
	initialState: {
		data: [],
	},
	reducers: {
		getDoctorScheduleSuccess: (state, action) => {
			state.data = action.payload
		},
	},
})

export const { getDoctorScheduleSuccess } = doctorSchedule.actions
export default doctorSchedule.reducer
