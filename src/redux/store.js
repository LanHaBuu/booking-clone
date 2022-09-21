import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import thunk from "redux-thunk"

import userReducer from "./Slice/userSlice"
import translateReducer from "./Slice/translateSlice"
import doctorReducer from "./Slice/doctorSlice"
import timeReducer from "./Slice/timeSlice"
import castReducer from "./Slice/castSlice"
import patientReducer from "./Slice/patientSlice"
import doctorDetailReducer from "./Slice/doctorDetailSlice"
import doctorScheduleReducer from "./Slice/doctorScheduleSlice"
import dataSpecialistReducer from "./Slice/dataSpecialist"

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["translate"],
}

const reducers = combineReducers({
	user: userReducer,
	translate: translateReducer,
	doctor: doctorReducer,
	time: timeReducer,
	cast: castReducer,
	patient: patientReducer,
	doctorDetail: doctorDetailReducer,
	doctorSchedule: doctorScheduleReducer,
	specialist: dataSpecialistReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk],
})

export const persistor = persistStore(store)
