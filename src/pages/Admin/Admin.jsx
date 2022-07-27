import MarkdownIt from "markdown-it"
import { useEffect, useState } from "react"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { getDataDoctor } from "../../redux/apiRequest"
// import { getDoctorInfo } from "../../redux/Slice/doctorSlice"

import "./Admin.scss"
import AdminMenu from "./AdminMenu"

const mdParser = new MarkdownIt(/* Markdown-it options */)

function Admin() {
	const [contentMarkdown, setContentMarkdown] = useState("")
	const [contentHTML, setContentHTML] = useState("")
	const [selectValue, setSelectValue] = useState("")
	const [doctorDesc, setDoctorDesc] = useState("")
	const [changeBtn, setChangeBtn] = useState(false)

	const dispatch = useDispatch()

	const [test, setTest] = useState(() => {
		const doctorDetail =
			JSON.parse(localStorage.getItem("doctor-details")) || []
		return doctorDetail
	})

	// useEffect(() => {
	// 	dispatch(getDoctorInfo(test))
	// }, [])

	useEffect(() => {
		getDataDoctor(dispatch)
	}, [])

	const { data: doctorList } = useSelector(state => state.doctor.doctor)

	function handleEditorChange({ html, text }) {
		setContentMarkdown(text)
		setContentHTML(html)
	}

	const handleChange = selectValue => {
		setSelectValue(selectValue)
		if (test[0].doctorId === selectValue.value) {
			setDoctorDesc(test[0].doctorDesc)
			setContentMarkdown(test[0].contentMarkdown)
			setChangeBtn(true)
		} else {
			setDoctorDesc("")
			setContentMarkdown("")
			setChangeBtn(false)
		}
	}

	const handleDoctorDesc = e => {
		setDoctorDesc(e.target.value)
	}

	const handleSave = () => {
		if (selectValue) {
			const doctorDetail = {
				contentHTML,
				contentMarkdown,
				doctorDesc,
				doctorId: selectValue.value,
			}
			setTest(prev => {
				const listDoctorDetail = [...prev, doctorDetail]
				localStorage.setItem(
					"doctor-details",
					JSON.stringify(listDoctorDetail),
				)
				return listDoctorDetail
			})
			setSelectValue(null)
			setDoctorDesc("")
			setContentMarkdown("")
			toast.success("Update thành công")
			setChangeBtn(false)
		} else {
			toast.error("Hãy lựa chọn bác sĩ")
		}
	}

	const buildDataInputSelect = () => {
		const result = []
		if (doctorList && doctorList.length > 0) {
			doctorList.map(doctor => {
				let options = {}
				options.value = doctor.id
				options.label = doctor.name
				result.push(options)
			})
			return result
		}
	}

	return (
		<div className='admin-wrapper'>
			<AdminMenu />
			<div className='container'>
				<h2 className='markdown-title'>Update thông tin của bác sĩ</h2>
				<div className='row'>
					<div className='col-lg-6'>
						<span className='title-select'>Chọn bác sĩ</span>
						<Select
							value={selectValue}
							onChange={handleChange}
							options={buildDataInputSelect()}
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
							rows='8'
							value={doctorDesc}
							onChange={handleDoctorDesc}
							className='update-desc-doctor mt-1'
							spellCheck='false'
						/>
					</div>
				</div>
				<hr />

				<MdEditor
					style={{ height: "500px" }}
					renderHTML={text => mdParser.render(text)}
					onChange={handleEditorChange}
					value={contentMarkdown}
				/>
				<button
					className={changeBtn ? "btn-update" : "btn-save"}
					onClick={handleSave}
				>
					{changeBtn ? "Update thông tin" : "Lưu thông tin"}
				</button>
			</div>
		</div>
	)
}

export default Admin
