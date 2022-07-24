import { createSlice } from "@reduxjs/toolkit"
import { saveLanguage } from "../../components/utils/FetchLocalStorage"

const languageInLocalStorage = saveLanguage()

const translateSlice = createSlice({
	name: "translate",
	initialState: {
		language: languageInLocalStorage,
	},
	reducers: {
		changeLanguage: (state, action) => {
			state.language = action.payload
		},
	},
})

export const { changeLanguage } = translateSlice.actions
export default translateSlice.reducer
