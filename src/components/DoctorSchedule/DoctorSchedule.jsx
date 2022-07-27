import { useEffect, useState } from "react"
import moment from "moment"
import localization from "moment/locale/vi"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import "./DoctorSchedule.scss"

function DoctorSchedule() {
	const [arrday, setArrday] = useState()
	const [timeSchedule, setTimeSchedule] = useState()
	const { data: dataSchedule } = useSelector(
		state => state.doctor.doctorSchedule,
	)

	const { id } = useParams()

	// console.log(timeSchedule)
	// console.log(arrday)

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
			const textUp = moment(new Date())
				.add(i, "days")
				.format("dddd - DD/MM")
			obj.label = capitalizeFirstLetter(textUp)
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

	return (
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
			<div className='schedule-time'>
				<div className='row'>
					{timeSchedule && timeSchedule.length > 0 ? (
						timeSchedule.map((time, index) => (
							<div
								className='col-xl-6 col-lg-6 col-md-4 col-6'
								key={index}
							>
								<button className='time-btn'>
									{time.time}
								</button>
							</div>
						))
					) : (
						<div>
							Không có lịch hẹn trong thời gian này. Vui lòng chọn
							ngày khác!
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default DoctorSchedule
