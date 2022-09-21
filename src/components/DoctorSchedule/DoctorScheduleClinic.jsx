import _ from "lodash"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { useParams } from "react-router-dom"
import { getDoctorDetail } from "../../redux/apiRequest"
import "./DoctorScheduleClinic.scss"

function DoctorScheduleClinic() {
	const { data: dataClinic } = useSelector(state => state.doctorDetail)
	const [dataClinicFilter, setDataClinicFilter] = useState({})
	const [showCost, setShowCost] = useState(false)
	const [priceHalf, setPriceHalf] = useState()

	const { id } = useParams()
	const dispatch = useDispatch()

	useEffect(() => {
		if (dataClinic && dataClinic.length > 0) {
			const newArr = dataClinic.filter(
				item => item.doctorId === Number(id),
			)
			setDataClinicFilter(newArr[newArr.length - 1])
		}
	}, [id, dataClinic])

	useEffect(() => {
		getDoctorDetail(dispatch)
	}, [id])

	useEffect(() => {
		if (dataClinicFilter && !_.isEmpty(dataClinicFilter)) {
			const data = Number(dataClinicFilter?.price?.label) / 2
			setPriceHalf(data)
		}
	}, [dataClinicFilter])

	return (
		<>
			{dataClinicFilter && !_.isEmpty(dataClinicFilter) && (
				<div className='doctor-clinic-wrapper'>
					<p className='clinic-name'>
						{dataClinicFilter?.nameClinic}
					</p>
					<p className='clinic-address'>{`${dataClinicFilter?.addressClinic}, ${dataClinicFilter?.province?.label}`}</p>
					<div className='clinic-cost'>
						<p className='title-cost'>Giá khám:</p>
						<p className='clinic-price'>
							{dataClinicFilter?.price?.label}
							<sup>đ</sup>.
						</p>
						<button
							className='clinic-cost-btn'
							onClick={() => setShowCost(true)}
						>
							Xem chi tiết
						</button>
					</div>
					<div
						className='clinic-detail'
						style={{
							height: showCost ? "100px" : "0",
							overflow: "hidden",
						}}
					>
						<div className='clinic-detail-title'>
							<p>Giá khám</p>
							<p className='clinic-price'>
								{dataClinicFilter?.price?.label}
								<sup>đ</sup>.
							</p>
						</div>
						<div className='clinic-detail-content'>
							<div>
								<small>Giá tư vấn 15 phút: </small>
								<small>
									{`${priceHalf}.000`}
									<sup>đ</sup>
								</small>
							</div>

							<div>
								<small>Giá tư vấn 30 phút: </small>
								<small>
									{dataClinicFilter?.price?.label}
									<sup>đ</sup>.
								</small>
							</div>
						</div>
						<p className='clinic-payment'>{`Phòng khám có thanh toán bằng hình thức ${dataClinicFilter?.payment?.label}`}</p>
					</div>
					<button
						className='clinic-detail-btn'
						onClick={() => setShowCost(false)}
					>
						Ẩn bảng giá
					</button>
				</div>
			)}
		</>
	)
}

export default DoctorScheduleClinic
