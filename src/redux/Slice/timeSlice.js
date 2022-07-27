import { createSlice } from "@reduxjs/toolkit"

const timeSlice = createSlice({
	name: "time",
	initialState: {
		time: [],
	},
	reducers: {
		getTime: (state, action) => {
			state.time = action.payload
		},
	},
})

export const { getTime } = timeSlice.actions
export default timeSlice.reducer
