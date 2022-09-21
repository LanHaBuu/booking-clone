import MarkdownIt from "markdown-it"
import { useEffect, useState } from "react"
import MdEditor from "react-markdown-editor-lite"
import "react-markdown-editor-lite/lib/index.css"
import { useDispatch, useSelector } from "react-redux"
import {
	getDataSpecialistApi,
	nameSpecial,
	postDataSpecialist,
} from "../../redux/apiRequest"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Select from "react-select"

import "./AdminSpecialist.scss"
import AdminMenu from "../Admin/AdminMenu"

import { buildFormData } from "../../components/SelectForm/SelectForm"

function AdminSpecialist() {
	const mdParser = new MarkdownIt()

	const [specialAPI, setSpecialAPI] = useState([])
	const [contentMarkdown, setContentMarkdown] = useState("")
	const [contentHTML, setContentHTML] = useState("")
	const [selectValue, setSelectValue] = useState(null)

	const dispatch = useDispatch()
	const { data: dataSpecialist } = useSelector(state => state.specialist)

	const handleEditor = ({ html, text }) => {
		setContentMarkdown(text)
		setContentHTML(html)
	}

	const handleChangeSelect = e => {
		setSelectValue(e)
	}

	useEffect(() => {
		getDataSpecialistApi(dispatch)
	}, [])

	useEffect(() => {
		nameSpecial().then(res => setSpecialAPI(res.data.Specialist))
	}, [])

	const handleSave = () => {
		if (!selectValue) {
			toast.error("Hãy chọn chuyên khoa")
		} else {
			const data = {
				id: selectValue.value,
				name: selectValue.label,
				contentHTML,
				contentMarkdown,
			}

			postDataSpecialist([...dataSpecialist, data])
			setSelectValue(null)
			setContentMarkdown("")
			setContentHTML("")
			toast.success("Lưu thành công")
		}
	}

	return (
		<>
			<AdminMenu />
			<div className='adminSpecialist'>
				<h4 className='text-center'>Quản lý chuyên khoa</h4>
				<div className='container'>
					<div className='row mb-5'>
						<div className='col-6'>
							<label htmlFor=''>Tên chuyên khoa</label>
							<Select
								value={selectValue}
								options={buildFormData(specialAPI)}
								onChange={handleChangeSelect}
							/>
						</div>
					</div>

					<div className='col-12'>
						<MdEditor
							style={{ height: "500px" }}
							renderHTML={text => mdParser.render(text)}
							value={contentMarkdown}
							onChange={handleEditor}
						/>
					</div>

					<button className='btn-admin' onClick={handleSave}>
						Lưu
					</button>
				</div>
			</div>
		</>
	)
}

export default AdminSpecialist
