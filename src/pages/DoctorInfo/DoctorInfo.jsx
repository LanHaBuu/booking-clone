import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import BackToTop from "../../components/Button/BackToTop"
import DoctorSchedule from "../../components/DoctorSchedule/DoctorSchedule"
import Header from "../../components/Header/Header"
import Loading from "../../components/Loading/Loading"
import { getDataDoctor } from "../../redux/apiRequest"
import "./DoctorInfo.scss"
function DoctorInfo() {
	const doctorListDetail = JSON.parse(localStorage.getItem("doctor-details"))
	const { id } = useParams()
	const [doctorDetail, setDoctorDetail] = useState({})
	const [doctor, setDoctor] = useState({})

	const dispatch = useDispatch()

	const { data: dataDoctor, loading } = useSelector(
		state => state.doctor.doctor,
	)

	useEffect(() => {
		if (dataDoctor.length > 0) {
			const numberId = Number(id)
			const data = dataDoctor.filter(doctor => doctor.id === numberId)
			setDoctor(data[0])
		}
	}, [dataDoctor, id])

	useEffect(() => {
		if (id) {
			const numberId = Number(id)
			let data = doctorListDetail.filter(
				doctor => doctor.doctorId === numberId,
			)
			if (data.length > 0) {
				data = data[data.length - 1]
				setDoctorDetail(data)
			}
		}
		getDataDoctor(dispatch)
	}, [id])

	if (loading) {
		return <Loading />
	}

	return (
		<>
			<Header />
			{doctorDetail && doctor && (
				<div className='doctor-info-wrapper'>
					<div className='info-title container'>
						<span>Khám chuyên khoa</span>
						<span>/</span>
						<span>{doctor.specialist}</span>
					</div>

					<div className='container'>
						<div className='doctor-desc'>
							<img
								className='doctor-img'
								src={doctor.image}
								alt={`${doctor.regency} ${doctor.name}`}
							/>
							<div className='doctor-name-info'>
								<div className='doctor-name'>{`${doctor.regency} ${doctor.name}`}</div>
								<div className='doctor-info'>
									{doctorDetail.doctorDesc}
								</div>
							</div>
						</div>
					</div>

					<div className='container'>
						<div className='row'>
							<div className='col-lg-6'>
								<DoctorSchedule />
							</div>
							<div className='col-lg-6'>Địa chỉ khám</div>
						</div>
					</div>

					<div className='wrapper-doctor-experience'>
						<div
							className='doctor-experience container'
							dangerouslySetInnerHTML={{
								__html: doctorDetail.contentHTML,
							}}
						></div>
					</div>
				</div>
			)}
			<BackToTop />
		</>
	)
}

export default DoctorInfo
