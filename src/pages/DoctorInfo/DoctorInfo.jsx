import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import BackToTop from "../../components/Button/BackToTop"
import DoctorSchedule from "../../components/DoctorSchedule/DoctorSchedule"
import DoctorScheduleClinic from "../../components/DoctorSchedule/DoctorScheduleClinic"
import Header from "../../components/Header/Header"
import Loading from "../../components/Loading/Loading"
import { getDataDoctor } from "../../redux/apiRequest"
import { getDatabase, ref, child, get } from "firebase/database"
import "./DoctorInfo.scss"
function DoctorInfo() {
	const [doctorListDetail, setDoctorListDetail] = useState([])

	const { id } = useParams()
	const [doctorDetail, setDoctorDetail] = useState([])
	const [doctor, setDoctor] = useState({})

	const dispatch = useDispatch()

	const { data: dataDoctor, loading } = useSelector(
		state => state.doctor.doctor,
	)

	useEffect(() => {
		const dbRef = ref(getDatabase())
		get(child(dbRef, `doctor-detail/`))
			.then(snapshot => {
				if (snapshot.exists()) {
					setDoctorListDetail(snapshot.val())
				} else {
					console.log("No data available")
				}
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	useEffect(() => {
		if (doctorListDetail && doctorListDetail.length > 0) {
			const data = doctorListDetail.filter(
				item => item.doctorId === Number(id),
			)
			setDoctorDetail(data)
		}
	}, [id, doctorListDetail])

	useEffect(() => {
		if (dataDoctor.length > 0) {
			const numberId = Number(id)
			const data = dataDoctor.filter(doctor => doctor.id === numberId)
			setDoctor(data[0])
		}
	}, [dataDoctor, id])

	useEffect(() => {
		// if (id && doctorListDetail && doctorListDetail.length > 0) {
		// 	const numberId = Number(id)
		// 	let data = doctorListDetail.filter(
		// 		doctor => doctor.doctorId === numberId,
		// 	)
		// 	if (data.length > 0) {
		// 		data = data[data.length - 1]
		// 		setDoctorDetail(data)
		// 	}
		// }
		getDataDoctor(dispatch)
	}, [id])

	if (loading) {
		return <Loading />
	}

	return (
		<>
			<Header />
			{dataDoctor && dataDoctor.length > 0 && (
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
									{/* {doctorDetail.doctorDesc} */}
									{doctorDetail.map((item, index) => (
										<span key={index}>
											{item.doctorDesc}
										</span>
									))}
								</div>
							</div>
						</div>
					</div>

					<div className='container'>
						<div className='row'>
							<div className='col-lg-8 col-md-8'>
								<DoctorSchedule />
							</div>
							<div className='col-lg-4 col-md-8'>
								<h5 className='title-clinic'>Địa chỉ khám:</h5>
								<DoctorScheduleClinic />
							</div>
						</div>
					</div>

					<div className='wrapper-doctor-experience'>
						{doctorDetail.map((item, index) => (
							<div
								className='doctor-experience container'
								key={index}
								dangerouslySetInnerHTML={{
									__html: item.contentHTML,
								}}
							></div>
						))}
					</div>
				</div>
			)}
			<BackToTop />
		</>
	)
}

export default DoctorInfo
