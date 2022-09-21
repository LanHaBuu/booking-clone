import { createSlice } from "@reduxjs/toolkit"

const doctorDetailSlice = createSlice({
	name: "doctorDetail",
	initialState: {
		data: [],
	},
	reducers: {
		getDoctorDetailSuccess: (state, action) => {
			state.data = action.payload
		},
	},
})

export const { getDoctorDetailSuccess } = doctorDetailSlice.actions
export default doctorDetailSlice.reducer
