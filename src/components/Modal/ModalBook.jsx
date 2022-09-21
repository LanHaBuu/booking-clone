import { useEffect, useRef, useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import { useDispatch, useSelector } from "react-redux"
import { BsFillPeopleFill } from "react-icons/bs"
import { FaPhone } from "react-icons/fa"
import { TbEmergencyBed } from "react-icons/tb"
import { AiFillMail } from "react-icons/ai"
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import emailjs from "@emailjs/browser"

import "./ModalBook.scss"
import { getDoctorScheduleApi, getPatiens } from "../../redux/apiRequest"

function ModalBook({ show, handleClose, booking }) {
	// const { data: doctorSchedule } = useSelector(state => state.doctorSchedule)
	const { data } = useSelector(state => state.doctor.doctor)
	const [doctorDetail, setDoctorDetail] = useState([])
	const [gender, setGender] = useState("")

	const dispatch = useDispatch()
	const form = useRef()

	const formik = useFormik({
		initialValues: {
			name: "",
			phone: "",
			email: "",
			doctor: "",
			date: "",
			time: "",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Hãy nhập tên"),
			phone: Yup.string()
				.required("Nhập số điện thoại")
				.matches(
					/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
					"Không đúng định dạng",
				),
			email: Yup.string()
				.required("Nhập email")
				.matches(
					/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
					"Không đúng định dạng",
				),
		}),
		onSubmit: values => {
			if (!gender) {
				toast.error("Bạn hãy nhập giới tính")
			} else {
				values.gender = gender
				// values.doctor = doctorDetail[0].name
				// values.time = booking.time
				// values.date = booking.date
				emailjs
					.sendForm(
						"service_aoh2shn",
						"template_queor6d",
						form.current,
						"YgDOwDaNJGxLCZfQn",
					)
					.then(
						result => {
							console.log(result.text)
						},
						error => {
							console.log(error.text)
						},
					)
				toast.success(
					"Bạn đã đặt lịch thành công, vui lòng kiểm tra email",
				)
			}
		},
	})

	useEffect(() => {
		getPatiens(dispatch)
		getDoctorScheduleApi(dispatch)
	}, [])

	const handleChange = e => {
		setGender(e.target.id)
	}

	// useEffect(() => {
	// 	if (doctorSchedule.length > 0) {
	// 		const doctor = doctorSchedule.filter(
	// 			item => item.doctorId === booking.doctorId,
	// 		)
	// 		setFilter(doctor[doctor.length - 1])
	// 	}
	// }, [booking])

	useEffect(() => {
		if (data && data.length > 0) {
			const doctor = data.filter(item => item.id === booking.doctorId)
			setDoctorDetail(doctor)
		}
	}, [booking])

	return (
		<Modal
			size='xl'
			show={show}
			onHide={handleClose}
			centered
			contentClassName='modal-container'
		>
			<Modal.Header closeButton>
				<Modal.Title>Thông tin đặt lịch khám bệnh</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='booking-content'>
					<div className='content-left'>
						{doctorDetail.length > 0 &&
							doctorDetail.map(item => (
								<div className='doctor' key={item.id}>
									<img src={item.image} />
									<div className='book-schedule'>
										<span className='title'>
											Đặt lịch khám
										</span>
										<p className='name'>{`${item.regency} ${item.name}`}</p>
										<span className='time'>
											{booking.time}
										</span>
										<span className='date'>{` - ${booking.date}`}</span>
									</div>
								</div>
							))}

						<div className='note'>
							<h5>Lưu ý</h5>
							<ul>
								1. Thông tin bạn cung cấp sẽ được sử dụng làm hồ
								sơ khám bệnh. Vì vậy khi điền thông tin, bạn vui
								lòng lưu ý:
								<li>
									Ghi rõ họ và tên, viết hoa những chữ cái đầu
									tiên, ví dụ: Trần Văn Phú
								</li>
								<li>
									Điền đầy đủ, đúng và kiểm tra lại thông tin
									trước khi ấn "Xác nhận đặt khám"
								</li>
								2. Tuân thủ quy định phòng chống dịch (đeo khẩu
								trang, khử khuẩn, khai báo dịch tễ) khi đến
								khám.
							</ul>
						</div>
					</div>
					<div className='content-right'>
						<h4 className='title'>Điền thông tin</h4>
						<form onSubmit={formik.handleSubmit} ref={form}>
							<div className='wrapper-input'>
								<span className='icon-human'>
									<BsFillPeopleFill />
								</span>
								<input
									placeholder='Họ tên bệnh nhân (bắt buộc)'
									className='input'
									name='name'
									onChange={formik.handleChange}
								/>
								{formik.errors.name && formik.touched.name && (
									<p className='error-message'>
										{formik.errors.name}
									</p>
								)}
							</div>
							<div className='input-gender'>
								<div className='men'>
									<input
										id='men'
										name='gender'
										type='radio'
										onChange={handleChange}
									/>
									<label htmlFor='men'>Nam</label>
								</div>
								<div className='women'>
									<input
										id='women'
										name='gender'
										type='radio'
										onChange={handleChange}
									/>
									<label htmlFor='women'>Nữ</label>
								</div>
							</div>
							<div className='wrapper-input'>
								<span className='icon-human'>
									<FaPhone />
								</span>
								<input
									placeholder='Số điện thoại liên hệ (bắt buộc)'
									className='input'
									name='phone'
									onChange={formik.handleChange}
								/>
								{formik.errors.phone &&
									formik.touched.phone && (
										<p className='error-message'>
											{formik.errors.phone}
										</p>
									)}
							</div>

							<div
								className='wrapper-input'
								style={{ display: "none" }}
							>
								<input
									placeholder='Số điện thoại liên hệ (bắt buộc)'
									className='input'
									name='doctor'
									onChange={formik.handleChange}
									value={
										doctorDetail.length > 0 &&
										doctorDetail[0].name
									}
								/>
							</div>

							<div
								className='wrapper-input'
								style={{ display: "none" }}
							>
								<input
									placeholder='Số điện thoại liên hệ (bắt buộc)'
									className='input'
									name='date'
									onChange={formik.handleChange}
									value={booking?.date}
								/>
							</div>

							<div
								className='wrapper-input'
								style={{ display: "none" }}
							>
								<input
									placeholder='Số điện thoại liên hệ (bắt buộc)'
									className='input'
									name='time'
									onChange={formik.handleChange}
									value={booking?.time}
								/>
							</div>

							<div className='wrapper-input'>
								<span className='icon-human'>
									<AiFillMail />
								</span>
								<input
									placeholder='Email (bắt buộc)'
									className='input'
									name='email'
									onChange={formik.handleChange}
								/>
								{formik.errors.email &&
									formik.touched.email && (
										<p className='error-message'>
											{formik.errors.email}
										</p>
									)}
							</div>

							<div className='wrapper-input'>
								<span
									className='icon-human'
									style={{ alignSelf: "flex-start" }}
								>
									<TbEmergencyBed />
								</span>
								<textarea
									rows='4'
									placeholder='Lý do khám'
									className='input'
									spellCheck='false'
									style={{
										border: "none",
										outline: "none",

										height: "auto",
									}}
								></textarea>
							</div>
							<p className='text-muted small text-center'>
								Quý khách vui lòng điền đầy đủ thông tin để tiết
								kiệm thời gian làm thủ tục khám
							</p>
							<button className='btn-submit' type='submit'>
								Xác nhận đặt khám
							</button>
						</form>
					</div>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ModalBook
