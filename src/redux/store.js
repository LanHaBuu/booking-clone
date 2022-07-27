import { configureStore, combineReducers } from "@reduxjs/toolkit"
import userReducer from "./Slice/userSlice"
import translateReducer from "./Slice/translateSlice"
import doctorReducer from "./Slice/doctorSlice"
import timeReducer from "./Slice/timeSlice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["translate"],
}

const doctorPersistConfig = {
	key: "doctorState",
	storage,
	whitelist: ["doctorSchedule"],
}

const reducers = combineReducers({
	user: userReducer,
	translate: translateReducer,
	doctor: persistReducer(doctorPersistConfig, doctorReducer),
	time: timeReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
})

export const persistor = persistStore(store)
