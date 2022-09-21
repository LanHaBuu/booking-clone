import { createSlice } from "@reduxjs/toolkit"

const castSlice = createSlice({
	name: "cast",
	initialState: {
		castData: [],
	},
	reducers: {
		fetchCastSuccess: (state, action) => {
			state.castData = action.payload
		},
	},
})

export const { fetchCastSuccess } = castSlice.actions
export default castSlice.reducer
