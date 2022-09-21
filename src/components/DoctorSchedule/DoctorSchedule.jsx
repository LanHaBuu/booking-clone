import { useEffect, useRef, useState } from "react"
import moment from "moment"
import localization from "moment/locale/vi"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { FcCalendar } from "react-icons/fc"
import { useDispatch } from "react-redux"

import "./DoctorSchedule.scss"
import ModalBook from "../Modal/ModalBook"
import { getDoctorScheduleApi } from "../../redux/apiRequest"

function DoctorSchedule() {
	const [show, setShow] = useState(false)
	const [booking, setBooking] = useState({})
	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	const [arrday, setArrday] = useState()
	const { data: dataSchedule } = useSelector(state => state.doctorSchedule)

	const dispatch = useDispatch()

	const { id } = useParams()

	const today = moment(new Date()).format("DD/MM/YYYY")

	const [timeSchedule, setTimeSchedule] = useState([
		{
			date: today,
			doctorId: Number(id),
			time: "8:00 AM - 9:00 AM",
		},
		{
			date: today,
			doctorId: Number(id),
			time: "9:00 AM - 10:00 AM",
		},
		{
			date: today,
			doctorId: Number(id),
			time: "10:00 AM - 11:00 AM",
		},
	])

	useEffect(() => {
		getDoctorScheduleApi(dispatch)
	}, [id])

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	useEffect(() => {
		// console.log("vie", moment(new Date()).format("dddd - DD/MM"))
		// console.log(
		// 	"eng",
		// 	moment(new Date()).locale("en").format("ddd - DD/MM"),
		// )
		const arrDate = []
		for (let i = 0; i < 7; i++) {
			const obj = {}
			if (i === 0) {
				const textUp = moment(new Date()).format(" DD/MM")
				obj.label = `Hôm nay ${textUp}`
			} else {
				const textUp = moment(new Date())
					.add(i, "days")
					.format("dddd - DD/MM")
				obj.label = capitalizeFirstLetter(textUp)
			}

			obj.value = moment(new Date()).add(i, "days").format("DD/MM/YYYY")
			arrDate.push(obj)
		}
		setArrday(arrDate)
	}, [])

	const handleChangeSelect = e => {
		const newArr = dataSchedule.filter(
			item =>
				item.date === e.target.value && item.doctorId === Number(id),
		)
		setTimeSchedule(newArr)
	}

	const handleShowModal = time => {
		handleShow()
		setBooking(time)
	}

	return (
		<>
			<div className='doctor-schedule-wrapper'>
				<select
					name='time'
					id='time'
					className='doctor-schedule-select'
					onChange={handleChangeSelect}
				>
					{arrday &&
						arrday.length > 0 &&
						arrday.map((item, index) => (
							<option key={index} value={item.value}>
								{item.label}
							</option>
						))}
				</select>
				<div className='calendar'>
					<FcCalendar className='calendar-icon' />
					<span>Lịch hẹn</span>
				</div>
				<div className='schedule-time'>
					<div className='row'>
						{timeSchedule && timeSchedule.length > 0 ? (
							timeSchedule.map((time, index) => (
								<div
									className='col-lg-3 col-md-6 col-6'
									key={index}
								>
									<button
										className='time-btn'
										onClick={() => handleShowModal(time)}
									>
										{time.time}
									</button>
								</div>
							))
						) : (
							<div>
								Không có lịch hẹn trong thời gian này. Vui lòng
								chọn ngày khác!
							</div>
						)}
					</div>
				</div>
			</div>
			<ModalBook
				show={show}
				handleClose={handleClose}
				booking={booking}
			/>
		</>
	)
}

export default DoctorSchedule
