import MarkdownIt from "markdown-it"
import { useEffect, useState } from "react"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { buildFormData } from "../../components/SelectForm/SelectForm"

import {
	getDataDoctor,
	fetchCast,
	postDoctorDetail,
	getDoctorDetail,
} from "../../redux/apiRequest"

import "./Admin.scss"
import AdminMenu from "./AdminMenu"

const mdParser = new MarkdownIt()

function Admin() {
	const [contentMarkdown, setContentMarkdown] = useState("")
	const [contentHTML, setContentHTML] = useState("")
	const [selectValue, setSelectValue] = useState(null)
	const [doctorDesc, setDoctorDesc] = useState("")
	const [changeBtn, setChangeBtn] = useState(false)
	const { data } = useSelector(state => state.doctor.doctor)
	const [state, setState] = useState({
		price: "",
		payment: "",
		province: "",
	})

	const [nameClinic, setNameClinic] = useState("")
	const [addressClinic, setAddressClinic] = useState("")
	const [note, setNote] = useState("")

	const dispatch = useDispatch()

	const { data: test } = useSelector(state => state.doctorDetail)

	const {
		payment: paymentfromAPI,
		price: pricefromAPI,
		province: provincefromAPI,
	} = useSelector(state => state.cast.castData)

	useEffect(() => {
		getDataDoctor(dispatch)
		fetchCast(dispatch)
		getDoctorDetail(dispatch)
	}, [])

	function handleEditorChange({ html, text }) {
		setContentMarkdown(text)
		setContentHTML(html)
	}

	const handleChange = e => {
		setSelectValue(e)

		if (test && test.length > 0) {
			const newArr = test.filter(item => item.doctorId === e.value)
			console.log(newArr)
			if (newArr && newArr.length > 0) {
				setDoctorDesc(newArr[0].doctorDesc)
				setContentMarkdown(newArr[0].contentMarkdown)

				setNameClinic(newArr[0].nameClinic)
				setAddressClinic(newArr[0].nameClinic)
				setNote(newArr[0].note)

				setChangeBtn(true)
			} else {
				setDoctorDesc("")
				setContentMarkdown("")
				setNameClinic("")
				setAddressClinic("")
				setNote("")
				setChangeBtn(false)
			}
		}
	}

	const handleDoctorDesc = e => {
		setDoctorDesc(e.target.value)
	}

	const handleChangeSelect = (e, name) => {
		const stateName = name.name
		const stateCopy = { ...state }
		stateCopy[stateName] = e
		setState({
			...stateCopy,
		})
	}

	function saveDataDoctor() {
		const doctorDetail = {
			contentHTML,
			contentMarkdown,
			doctorDesc,
			doctorId: selectValue.value,
			price: state.price,
			payment: state.payment,
			province: state.province,
			nameClinic,
			addressClinic,
			note,
		}

		postDoctorDetail(doctorDetail)

		setSelectValue(null)
		setDoctorDesc("")
		setContentMarkdown("")
		setState({ price: "", payment: "", province: "" })
		setNameClinic("")
		setAddressClinic("")
		setNote("")
	}

	const handleSave = () => {
		if (selectValue) {
			saveDataDoctor()
			toast.success("Lưu thông tin thành công")
			setChangeBtn(false)
		} else {
			toast.error("Hãy lựa chọn bác sĩ")
		}
	}

	const handleUpdate = () => {
		if (!contentHTML) {
			toast.error("Bạn chưa sửa thông tin")
		} else {
			saveDataDoctor()
			toast.success("Update thông tin thành công")
		}
	}

	return (
		<div className='admin-wrapper'>
			<AdminMenu />
			<div className='container'>
				<h2 className='markdown-title'>
					Tạo / Update thông tin của bác sĩ
				</h2>
				<div className='row'>
					<div className='col-lg-6'>
						<span className='title-select'>Chọn bác sĩ</span>
						<Select
							value={selectValue}
							onChange={handleChange}
							options={buildFormData(data)}
							className='select mt-1'
						/>
					</div>
					<div className='col-lg-6'>
						<label htmlFor='infor' style={{ userSelect: "none" }}>
							Thông tin update:
						</label>
						<textarea
							name='infor'
							id='infor'
							rows='3'
							value={doctorDesc}
							onChange={handleDoctorDesc}
							className='update-desc-doctor mt-1'
							spellCheck='false'
						/>
					</div>
					<div className='row my-3'>
						<div className='col-lg-4'>
							<label className='mb-2' htmlFor=''>
								Chọn giá
							</label>
							<Select
								value={state.price}
								options={buildFormData(pricefromAPI)}
								onChange={handleChangeSelect}
								name='price'
							/>
						</div>
						<div className='col-lg-4'>
							<label className='mb-2' htmlFor=''>
								Chọn phương thức thanh toán
							</label>
							<Select
								value={state.payment}
								options={buildFormData(paymentfromAPI)}
								onChange={handleChangeSelect}
								name='payment'
							/>
						</div>
						<div className='col-lg-4'>
							<label className='mb-2' htmlFor=''>
								Chọn tỉnh thành
							</label>
							<Select
								value={state.province}
								options={buildFormData(provincefromAPI)}
								onChange={handleChangeSelect}
								name='province'
							/>
						</div>
					</div>
					<div className='row my-3'>
						<div className='col-lg-4'>
							<label className='mb-2' htmlFor=''>
								Tên phòng khám
							</label>
							<input
								type='text'
								value={nameClinic}
								className='form-control'
								onChange={e => setNameClinic(e.target.value)}
							/>
						</div>
						<div className='col-lg-4'>
							<label className='mb-2' htmlFor=''>
								Địa chỉ phòng khám
							</label>
							<input
								type='text'
								value={addressClinic}
								className='form-control'
								onChange={e => setAddressClinic(e.target.value)}
							/>
						</div>
						<div className='col-lg-4'>
							<label className='mb-2' htmlFor=''>
								Note
							</label>
							<input
								type='text'
								value={note}
								className='form-control'
								onChange={e => setNote(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<hr />

				<MdEditor
					style={{ height: "500px" }}
					renderHTML={text => mdParser.render(text)}
					onChange={handleEditorChange}
					value={contentMarkdown}
					placeholder='Nhập thông tin cập nhật cho bác sĩ ...'
				/>
				<button
					className={changeBtn ? "btn-update" : "btn-save"}
					onClick={changeBtn ? handleUpdate : handleSave}
				>
					{changeBtn ? "Update thông tin" : "Lưu thông tin"}
				</button>
			</div>
		</div>
	)
}

export default Admin
