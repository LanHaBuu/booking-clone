import classNames from "classnames/bind"
import styles from "./Session.module.css"

import Slider from "react-slick"

import bgChuyenKhoa1 from "../../assests/images/session/chuyenkhoa/chuyenkhoaphobien1.jpg"
import bgChuyenKhoa2 from "../../assests/images/session/chuyenkhoa/chuyenkhoaphobien2.jpg"
import bgChuyenKhoa3 from "../../assests/images/session/chuyenkhoa/chuyenkhoaphobien3.jpg"
import bgChuyenKhoa4 from "../../assests/images/session/chuyenkhoa/chuyenkhoaphobien4.jpg"
import bgChuyenKhoa5 from "../../assests/images/session/chuyenkhoa/chuyenkhoaphobien5.jpg"
import bgChuyenKhoa6 from "../../assests/images/session/chuyenkhoa/chuyenkhoaphobien6.jpg"
import bgChuyenKhoa7 from "../../assests/images/session/chuyenkhoa/chuyenkhoaphobien7.jpg"
import bgChuyenKhoa8 from "../../assests/images/session/chuyenkhoa/chuyenkhoaphobien8.jpg"

const cx = classNames.bind(styles)

function Specialty({ settings }) {
	return (
		<>
			<div className={cx("session-title")}>
				<h3>Chuyên khoa phổ biến</h3>
				<button>Xem thêm</button>
			</div>
			<div className='slide-customize'>
				<Slider {...settings}>
					<div>
						<img
							className={cx("session-img")}
							src={bgChuyenKhoa1}
							alt='chuyên khoa'
						/>
						<span className='px-2'>Cơ xương khớp</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bgChuyenKhoa2}
							alt='chuyên khoa'
						/>
						<span className='px-2'>Thần kinh</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bgChuyenKhoa3}
							alt='chuyên khoa'
						/>
						<span className='px-2'>Tiêu hóa</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bgChuyenKhoa4}
							alt='chuyên khoa'
						/>
						<span className='px-2'>Tim mạch</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bgChuyenKhoa5}
							alt='chuyên khoa'
						/>
						<span className='px-2'>Tai mũi họng</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bgChuyenKhoa6}
							alt='chuyên khoa'
						/>
						<span className='px-2'>Cột sống</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bgChuyenKhoa7}
							alt='chuyên khoa'
						/>
						<span className='px-2'>Y học cổ truyền</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bgChuyenKhoa8}
							alt='chuyên khoa'
						/>
						<span className='px-2'>Châm cứu</span>
					</div>
				</Slider>
			</div>
		</>
	)
}

export default Specialty
