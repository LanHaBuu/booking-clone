import classNames from "classnames/bind"
import styles from "./Session.module.css"

import Slider from "react-slick"

import bg1 from "../../assests/images/session/cosoyte/1.jpg"
import bg2 from "../../assests/images/session/cosoyte/2.jpg"
import bg3 from "../../assests/images/session/cosoyte/3.jpg"
import bg4 from "../../assests/images/session/cosoyte/4.jpg"
import bg5 from "../../assests/images/session/cosoyte/5.jpg"
import bg6 from "../../assests/images/session/cosoyte/6.jpg"
import bg7 from "../../assests/images/session/cosoyte/7.jpg"
import bg8 from "../../assests/images/session/cosoyte/8.jpg"

const cx = classNames.bind(styles)

function Basis({ settings }) {
	return (
		<>
			<div className={cx("session-title")}>
				<h3>Cơ sở y tế nổi bật</h3>
				<button>Xem thêm</button>
			</div>
			<div className='slide-customize'>
				<Slider {...settings}>
					<div>
						<img
							className={cx("session-img")}
							src={bg1}
							alt='cơ sở y tế'
						/>
						<span className='px-2'>
							Bệnh viện Hữu nghị Việt Đức
						</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bg2}
							alt='cơ sở y tế'
						/>
						<span className='px-2'>
							Bệnh viện K - Cơ sở Phan Chu Trinh
						</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bg3}
							alt='cơ sở y tế'
						/>
						<span className='px-2'>
							Phòng khám bệnh viện Đại học Y Dược 1
						</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bg5}
							alt='cơ sở y tế'
						/>
						<span className='px-2'>
							Bệnh viện Ung bướu Hùng Việt
						</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bg6}
							alt='cơ sở y tế'
						/>
						<span className='px-2'>Hệ thống y tế Thu Cúc TCI</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bg7}
							alt='cơ sở y tế'
						/>
						<span className='px-2'>Phòng khám Đa khoa Sài Gòn</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bg8}
							alt='cơ sở y tế'
						/>
						<span className='px-2'>
							Bệnh viện Nam học và Hiếm muộn Hà Nội
						</span>
					</div>
					<div>
						<img
							className={cx("session-img")}
							src={bg4}
							alt='cơ sở y tế'
						/>
						<span className='px-2'>
							Bệnh viện Đa khoa Hồng Phát
						</span>
					</div>
				</Slider>
			</div>
		</>
	)
}

export default Basis
