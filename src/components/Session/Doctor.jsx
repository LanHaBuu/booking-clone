import classNames from "classnames/bind"
import styles from "./Session.module.css"

import Slider from "react-slick"
import { useEffect, useState } from "react"
import { getDataDoctor } from "../../redux/apiRequest"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { routes } from "../../routes/routes"

const cx = classNames.bind(styles)

function Doctor({ settings }) {
	// const [doctors, setDoctors] = useState([])
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { data: doctors } = useSelector(state => state.doctor.doctor)

	// useEffect(() => {
	// 	if (data && data.length > 0) {
	// 		const newData = data.filter(item => item.id !== 1)
	// 		setDoctors(newData)
	// 	}
	// }, [data])

	useEffect(() => {
		getDataDoctor(dispatch)
	}, [])

	return (
		<>
			<div className={cx("session-title")}>
				<h3>Bác sĩ nổi bật tuần qua</h3>

				<button>Tìm kiếm</button>
			</div>
			<div className='slide-customize'>
				<Slider {...settings}>
					{doctors &&
						doctors.length > 0 &&
						doctors.map(doctor => (
							<div
								className={cx("doctor-container")}
								key={doctor.id}
							>
								<Link to={`/doctors/${doctor.id}`}>
									<img
										src={doctor.image}
										className={cx(
											"doctor-avatar",
											"img-fluid",
										)}
										alt='doctor'
									/>
								</Link>

								<p className={cx("doctor-name")}>
									{`${doctor.regency} ${doctor.name}`}
								</p>

								<p
									className={cx(
										"doctor-specialist",
										"text-center",
									)}
								>
									{doctor.specialist}
								</p>
							</div>
						))}
				</Slider>
			</div>
		</>
	)
}

export default Doctor
