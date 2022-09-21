import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getDataSpecialistApi, nameSpecialNew } from "../../redux/apiRequest"
import Header from "../../components/Header/Header"
import "./Specialist.scss"

function Specialist() {
	const { id } = useParams()
	const { data: dataSpecialist } = useSelector(state => state.specialist)
	const [data, setData] = useState([])
	const [specialApi, setSpecialAPI] = useState([])
	const [specialApiFilter, setSpecialAPIFilter] = useState([])
	const dispatch = useDispatch()
	useEffect(() => {
		getDataSpecialistApi(dispatch)
	}, [])

	useEffect(() => {
		if (dataSpecialist && dataSpecialist.length > 0) {
			const newArr = dataSpecialist.filter(item => item.id === Number(id))
			setData(newArr[newArr.length - 1])
		}
	}, [id, dataSpecialist])

	useEffect(() => {
		nameSpecialNew().then(res => setSpecialAPI(res.data))
	}, [])

	useEffect(() => {
		if (specialApi && specialApi.length > 0) {
			const newArr = specialApi.filter(item => item.id === Number(id))
			setSpecialAPIFilter(newArr)
		}
	}, [dataSpecialist])

	return (
		<div className='special-detail-wrapper'>
			<div
				className='container-fluid gx-0'
				style={{
					backgroundImage: `${
						specialApiFilter.length > 0 &&
						`url(${specialApiFilter[0].img})`
					}`,
				}}
			>
				<div className='wrapper'>
					<Header />
					<div className='header-height'></div>
					<div className='content container'>
						{data && (
							<>
								<h5>{data.name}</h5>
								<div
									className='special-experience'
									dangerouslySetInnerHTML={{
										__html: data.contentHTML,
									}}
								></div>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Specialist
