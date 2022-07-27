import AdminMenu from "./AdminMenu"
import Select from "react-select"
import { useDispatch, useSelector } from "react-redux"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import _ from "lodash"

import "./AdminSchedule.scss"
import { useEffect, useRef, useState } from "react"
import { fetchTime, getDataDoctor } from "../../redux/apiRequest"
import { getDoctorSchedule } from "../../redux/Slice/doctorSlice"

function AdminSchedule() {
	const { data: doctor } = useSelector(state => state.doctor.doctor)
	const [selectValue, setSelectValue] = useState(null)
	const [date, setDate] = useState(new Date())

	const dataSc = useSelector(state => state.doctor.doctorSchedule.data)

	let { time } = useSelector(state => state.time)

	const dispatch = useDispatch()

	useEffect(() => {
		getDataDoctor(dispatch)
	}, [])

	useEffect(() => {
		fetchTime(dispatch)
	}, [])

	const buildDataInputSelect = () => {
		const arr = []
		if (doctor && doctor.length > 0) {
			doctor.map(item => {
				const obj = {}
				obj.value = item.id
				obj.label = item.name
				arr.push(obj)
			})
			return arr
		}
	}

	const handleChangeSelect = e => {
		setSelectValue(e)
	}

	const handleChangeDate = e => {
		setDate(e)
	}

	if (time.length > 0) {
		time = time.map(item => ({ ...item, isSelected: false }))
	}

	const btnRef = useRef()

	useEffect(() => {
		const allBtn = btnRef.current.children
		Array.from(allBtn).forEach(btn => {
			btn.onclick = function () {
				this.classList.toggle("active")
			}
		})
	}, [time])

	const handleClickTime = timeObj => {
		if (time && time.length > 0) {
			time.map(item => {
				if (item.id === timeObj.id) item.isSelected = !item.isSelected
			})
		}
	}

	const handleSaveSchedule = () => {
		if (!selectValue) {
			toast.error("Hãy nhập bác sĩ")
			return
		}

		const formatDate = moment(date).format("DD/MM/YYYY")

		const result = []

		if (time && time.length > 0) {
			const timeChoose = time.filter(item => item.isSelected === true)

			if (timeChoose && timeChoose.length > 0) {
				timeChoose.map(item => {
					let obj = {}
					obj.doctorId = selectValue.value
					obj.date = formatDate
					obj.time = item.value
					result.push(obj)
				})
			} else {
				toast.error("Hãy nhập giờ!")
				return
			}

			if (result.length > 0) {
				result.map(item => {
					return (item.maxNumber = 10)
				})
				const allBtn = btnRef.current.children
				Array.from(allBtn).map(btn => {
					if (btn.classList.contains("active")) {
						btn.classList.remove("active")
					}
				})

				const checkArr = _.differenceWith(result, dataSc, (a, b) => {
					return a.date === b.date && a.time === b.time
				})

				dispatch(getDoctorSchedule(checkArr))
				toast.success("Cập nhật thành công")
			}
		}

		setSelectValue(null)
		setDate(new Date())

		// console.log(list)
		// console.log(moment().format("DD/MM/YYYY"))
	}

	return (
		<>
			<AdminMenu />
			<div className='admin-schedule-wrapper'>
				<div className='container'>
					<div className='row'>
						<div className='a-s-title'>
							Quản lý kế hoạch khám bệnh của bác sĩ
						</div>
						<div className='col-lg-6'>
							<label>Chọn bác sĩ</label>
							<Select
								value={selectValue}
								onChange={handleChangeSelect}
								options={buildDataInputSelect()}
								className='mt-2'
							/>
						</div>
						<div
							className='col-lg-6'
							style={{
								cursor: `${
									selectValue === null
										? "not-allowed"
										: "pointer"
								}`,
							}}
						>
							<label>Chọn ngày</label>

							<DatePicker
								selected={date}
								className='form-control mt-2 date-format'
								onChange={handleChangeDate}
								dateFormat='dd/MM/yyyy'
								minDate={new Date()}
							/>
						</div>
						<div className='col-lg-12'>
							<div className='pick-hour' ref={btnRef}>
								{time &&
									time.length > 0 &&
									time.map(item => (
										<button
											disabled={selectValue === null}
											style={{
												cursor: `${
													selectValue === null
														? "not-allowed"
														: "pointer"
												}`,
											}}
											className={
												item.isSelected === true
													? "time-detail active"
													: "time-detail"
											}
											key={item.id}
											onClick={() =>
												handleClickTime(item)
											}
										>
											{item.value}
										</button>
									))}
							</div>
						</div>
						<div className='col-lg-12'>
							<button
								className='save-schedule'
								onClick={handleSaveSchedule}
							>
								Lưu thông tin
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default AdminSchedule
