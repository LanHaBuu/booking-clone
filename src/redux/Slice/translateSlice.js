import { createSlice } from "@reduxjs/toolkit"

const translateSlice = createSlice({
	name: "translate",
	initialState: {
		language: "vi",
	},
	reducers: {
		changeLanguage: (state, action) => {
			state.language = action.payload
		},
	},
})

export const { changeLanguage } = translateSlice.actions
export default translateSlice.reducer
