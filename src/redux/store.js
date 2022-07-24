import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./Slice/userSlice"
import translateReducer from "./Slice/translateSlice"

export const store = configureStore({
	reducer: {
		user: userReducer,
		translate: translateReducer,
	},
})
