import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai"
import classNames from "classnames/bind"
import { FormattedMessage } from "react-intl"

import styles from "./Home.module.css"
import Header from "../../components/Header/Header"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import banner1 from "../../assests/images/banner/chuyenkhoa.png"
import banner2 from "../../assests/images/banner/tuxa.png"
import banner3 from "../../assests/images/banner/tongquat.png"
import banner4 from "../../assests/images/banner/xetnghiem.png"
import banner5 from "../../assests/images/banner/suckhoetinhthan.png"
import banner6 from "../../assests/images/banner/nhakhoa.png"
import banner7 from "../../assests/images/banner/phauthuat.jpg"
import banner8 from "../../assests/images/banner/cuuthuong.png"
import bannerVi from "../../assests/images/banner/home.jpg"
import bannerEng from "../../assests/images/banner/homeEng.jpg"
import Specialty from "../../components/Session/Specialty"
import Basis from "../../components/Session/Basis"
import Doctor from "../../components/Session/Doctor"
import Hanbook from "../../components/Session/Hanbook"
import Footer from "../../components/Footer/Footer"
import BackToTop from "../../components/Button/BackToTop"

// --------------------------------------------------

// ---------------------------------------------------

const cx = classNames.bind(styles)

function Home() {
	const [input, setInput] = useState("")
	const [showClose, setShowClose] = useState(false)
	const [changeBaner, setChangeBaner] = useState()

	const { language } = useSelector(state => state.translate)

	const settings = {
		dots: false,
		infinite: true,
		speed: 1000,
		slidesToShow: 4,
		slidesToScroll: 4,
	}

	const handleChange = e => {
		const inputValue = e.target.value
		if (inputValue) {
			setShowClose(true)
		} else {
			setShowClose(false)
		}
		if (!inputValue.startsWith(" ")) {
			setInput(inputValue)
		}
	}

	useEffect(() => {
		if (language === "vi") {
			setChangeBaner(bannerVi)
		} else {
			setChangeBaner(bannerEng)
		}
	}, [language])

	return (
		<>
			<Header />
			<div className={cx("admin-text")}>
				<div>Admin:</div>
				<div>Email: admin@mail.com</div>
				<div>Pass: admin123</div>
			</div>
			<div
				className={cx("container-fluid", "wrapper-home-header")}
				style={{ backgroundImage: `url(${changeBaner})` }}
			>
				<div className={cx("home-header")}>
					<div className={cx("home-header-center")}>
						<div className={cx("home-header-text")}>
							<h3>
								<FormattedMessage id='home.header.center1' />
							</h3>
							<h2>
								<FormattedMessage id='home.header.center2' />
							</h2>
						</div>
						<div className={cx("home-header-input")}>
							<AiOutlineSearch className={cx("input-search")} />
							<input
								placeholder={
									language === "vi"
										? "Tìm phòng khám"
										: "Find a clinic"
								}
								spellCheck='false'
								onChange={handleChange}
								value={input}
							/>
							{showClose && (
								<AiOutlineClose className={cx("input-close")} />
							)}
						</div>
					</div>
					<div className={cx("footer-header-home")}>
						<ul className={cx("home-item")}>
							<li className={cx("home-list")}>
								<div className={cx("wrapper-list-img")}>
									<img
										className={cx("list-img")}
										src={banner1}
										alt='banner'
									/>
								</div>
								<p className={cx("list-text")}>
									<FormattedMessage id='home.header.list1' />
								</p>
							</li>
							<li className={cx("home-list")}>
								<div className={cx("wrapper-list-img")}>
									<img
										className={cx("list-img")}
										src={banner2}
										alt='banner'
									/>
								</div>
								<p className={cx("list-text")}>
									<FormattedMessage id='home.header.list2' />
								</p>
							</li>
							<li className={cx("home-list")}>
								<div className={cx("wrapper-list-img")}>
									<img
										className={cx("list-img")}
										src={banner3}
										alt='banner'
									/>
								</div>
								<p className={cx("list-text")}>
									<FormattedMessage id='home.header.list3' />
								</p>
							</li>
							<li className={cx("home-list")}>
								<div className={cx("wrapper-list-img")}>
									<img
										className={cx("list-img")}
										src={banner4}
										alt='banner'
									/>
								</div>
								<p className={cx("list-text")}>
									<FormattedMessage id='home.header.list4' />
								</p>
							</li>
							<li className={cx("home-list")}>
								<div className={cx("wrapper-list-img")}>
									<img
										className={cx("list-img")}
										src={banner5}
										alt='banner'
									/>
								</div>
								<p className={cx("list-text")}>
									<FormattedMessage id='home.header.list5' />
								</p>
							</li>
							<li className={cx("home-list")}>
								<div className={cx("wrapper-list-img")}>
									<img
										className={cx("list-img")}
										src={banner6}
										alt='banner'
									/>
								</div>
								<p className={cx("list-text")}>
									<FormattedMessage id='home.header.list6' />
								</p>
							</li>
							<li className={cx("home-list")}>
								<div className={cx("wrapper-list-img")}>
									<img
										className={cx("list-img")}
										src={banner7}
										alt='banner'
									/>
								</div>
								<p className={cx("list-text")}>
									<FormattedMessage id='home.header.list7' />
								</p>
							</li>
							<li className={cx("home-list")}>
								<div className={cx("wrapper-list-img")}>
									<img
										className={cx("list-img")}
										src={banner8}
										alt='banner'
									/>
								</div>
								<p className={cx("list-text")}>
									<FormattedMessage id='home.header.list8' />
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className={cx("home-center")}>
				<div className='container-fluid'>
					<div className='container'>
						<div className={cx("session-block")}>
							<Specialty settings={settings} />
						</div>
					</div>
				</div>

				<div className={cx("container-fluid", "session-bg")}>
					<div className='container'>
						<div className={cx("session-block")}>
							<Basis settings={settings} />
						</div>
					</div>
				</div>

				<div className={cx("container-fluid")}>
					<div className='container'>
						<div className={cx("session-block")}>
							<Doctor settings={settings} />
						</div>
					</div>
				</div>

				<div className={cx("container-fluid", "session-bg")}>
					<div className='container'>
						<div className={cx("session-block")}>
							<Hanbook />
						</div>
					</div>
				</div>
			</div>
			<Footer />
			<BackToTop />
		</>
	)
}

export default Home
