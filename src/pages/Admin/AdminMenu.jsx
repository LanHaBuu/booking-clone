import { useNavigate } from "react-router-dom"
import { MdExitToApp } from "react-icons/md"
import { routes } from "../../routes/routes"
import "./AdminMenu.scss"

function AdminMenu() {
	const navigate = useNavigate()

	return (
		<div className='admin-menu'>
			<div>
				<button
					className='update'
					onClick={() => navigate(`${routes.admin}`)}
				>
					Update thông tin bác sĩ
				</button>
				<button
					className='create'
					onClick={() => navigate(`${routes.adminSchedule}`)}
				>
					Tạo lịch hẹn khám bệnh
				</button>
			</div>
			<MdExitToApp
				className='btn-exit'
				onClick={() => navigate(routes.login)}
			/>
		</div>
	)
}

export default AdminMenu
