import { createSlice } from "@reduxjs/toolkit"

const patientSlice = createSlice({
	name: "patient",
	initialState: {
		data: [],
	},
	reducers: {
		getPatientSuccess: (state, action) => {
			state.data = action.payload
		},
	},
})
export const { getPatientSuccess } = patientSlice.actions
export default patientSlice.reducer
