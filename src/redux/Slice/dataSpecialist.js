import { createSlice } from "@reduxjs/toolkit"

const dataSpecialist = createSlice({
	name: "specialist",
	initialState: {
		data: [],
	},
	reducers: {
		getDataSpecial: (state, action) => {
			state.data = action.payload
		},
	},
})

export const { getDataSpecial } = dataSpecialist.actions
export default dataSpecialist.reducer
