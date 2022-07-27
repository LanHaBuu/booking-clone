import classNames from "classnames/bind"
import { useEffect, useState } from "react"
import { FaBars } from "react-icons/fa"
import { IoMdExit } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import { FormattedMessage } from "react-intl"

import logo from "../../assests/images/logo/logo-main.svg"
import styles from "./Header.module.css"
import { routes } from "../../routes/routes"
import { useDispatch, useSelector } from "react-redux"
import { getUserWithSession } from "../../redux/apiRequest"
import { getUserSuccess } from "../../redux/Slice/userSlice"
import { changeLanguage } from "../../redux/Slice/translateSlice"
import vnFlag from "../../assests/images/language/vietnam.svg.png"
import engFlag from "../../assests/images/language/english.svg.png"
const cx = classNames.bind(styles)

function Header() {
	const [showInfoUser, setShowInfoUser] = useState(false)

	const { language } = useSelector(state => state.translate)
	const { userLogin } = useSelector(state => state.user.login)
	const { userSession } = useSelector(state => state.user.getUserWithSession)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		if (userLogin?.access_token) {
			getUserWithSession(userLogin?.access_token, dispatch)
		}
	}, [userLogin])

	if (userSession && userSession.role === "admin") {
		navigate("/admin")
	}

	const handleLogout = () => {
		const value = window.confirm("Có đúng là bạn muốn thoát không?")
		if (value) {
			dispatch(getUserSuccess(null))
			localStorage.removeItem("userGg")
			localStorage.removeItem("userFb")
			navigate(routes.login)
		}
	}

	const handleTranslate = e => {
		dispatch(changeLanguage(e.target.id))
	}

	return (
		<div className={cx("wrapper-header", "container-fluid")}>
			<div className={cx("container", "container-header")}>
				<div className='row pt-3'>
					<div className='col-lg-3 col-md-4 col-sm-5 col-7'>
						<FaBars className={cx("logo-menu")} />
						<Link to={routes.home}>
							<img
								src={logo}
								alt='ảnh nền'
								className={cx("logo-main")}
							/>
						</Link>
					</div>
					<div className='col-lg-6 col-md-3 col-sm-2 col-1'>
						<div className={cx("header-content")}>
							<div className={cx("content-block")}>
								<p className={cx("title")}>
									<FormattedMessage id='header.group1' />
								</p>
								<span>
									<FormattedMessage id='header.group1.1' />
								</span>
							</div>
							<div className={cx("content-block")}>
								<p className={cx("title")}>
									<FormattedMessage id='header.group2' />
								</p>
								<span>
									<FormattedMessage id='header.group2.2' />
								</span>
							</div>
							<div className={cx("content-block")}>
								<p className={cx("title")}>
									<FormattedMessage id='header.group3' />
								</p>
								<span>
									<FormattedMessage id='header.group3.3' />
								</span>
							</div>
							<div className={cx("content-block")}>
								<p className={cx("title")}>
									<FormattedMessage id='header.group4' />
								</p>
								<span>
									<FormattedMessage id='header.group4.4' />
								</span>
							</div>
						</div>
					</div>

					<div
						className={cx(
							"col-lg-2 col-md-4 col-sm-4 col-3",
							"language",
						)}
					>
						<div className={language === "en" ? "active" : ""}>
							<img
								alt='ảnh nền'
								src={vnFlag}
								className={cx("flag")}
								onClick={handleTranslate}
								id='vi'
							/>
							<span>VN</span>
						</div>
						<div className={language === "vi" ? "active" : ""}>
							<img
								src={engFlag}
								alt='ảnh nền'
								className={cx("flag")}
								onClick={handleTranslate}
								id='en'
							/>
							<span>EN</span>
						</div>
					</div>

					<div
						className={cx(
							"col-lg-1 col-md-1 col-sm-1 col-1",
							"wrapper-user",
						)}
					>
						<div
							className={cx("user")}
							onClick={() => setShowInfoUser(!showInfoUser)}
						>
							{userLogin && userLogin.photoURL && (
								<img
									alt='ảnh nền'
									src={userLogin.photoURL}
									className={cx("user-avatar")}
								/>
							)}
							{userSession && (
								<img
									alt='ảnh nền'
									src={userSession.avatar}
									className={cx("user-avatar")}
								/>
							)}
						</div>
						{showInfoUser && (
							<div className={cx("user-desc")}>
								<div className={cx("user-name")}>
									{userSession && `Hi ${userSession.name}`}
									{userLogin &&
										userLogin.displayName &&
										`Hi ${userLogin.displayName}`}
								</div>
								<div className={cx("log-out")}>
									<span onClick={handleLogout}>Log out</span>
									<IoMdExit />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header
