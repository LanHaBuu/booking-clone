import { useNavigate } from "react-router-dom"
import { MdExitToApp } from "react-icons/md"
import { routes } from "../../routes/routes"
import { Link } from "react-router-dom"
import "./AdminMenu.scss"
import { useSelector, useDispatch } from "react-redux"
import { getUserSuccess } from "../../redux/Slice/userSlice"
import Dropdown from "react-bootstrap/Dropdown"

function AdminMenu() {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	let { userLogin } = useSelector(state => state.user.login)

	const handleLogout = () => {
		if (userLogin) {
			dispatch(getUserSuccess(null))
			navigate(routes.login)
		}
	}

	return (
		<div className='admin-menu'>
			<div className='dropdown-menu-admin'>
				<Dropdown>
					<Dropdown.Toggle id='dropdown-basic'>
						Bác sĩ
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<div className='mb-2'>
							<Link to={routes.admin} className='btn-admin-menu'>
								Thông tin bác sĩ
							</Link>
						</div>

						<div>
							<Link
								to={routes.adminSchedule}
								className='btn-admin-menu'
							>
								Lịch hẹn khám bệnh
							</Link>
						</div>
					</Dropdown.Menu>
				</Dropdown>
				<Dropdown>
					<Dropdown.Toggle id='dropdown-basic'>
						Chuyên khoa
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<div>
							<Link
								to={routes.adminSpecialist}
								className='btn-admin-menu'
							>
								Quản lý chuyên khoa
							</Link>
						</div>
					</Dropdown.Menu>
				</Dropdown>
			</div>

			<MdExitToApp className='btn-exit' onClick={handleLogout} />
		</div>
	)
}

export default AdminMenu
