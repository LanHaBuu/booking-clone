import classNames from "classnames/bind"
import styles from "./Session.module.css"

import Slider from "react-slick"

import dt1 from "../../assests/images/session/doctor/1.jpg"
import dt2 from "../../assests/images/session/doctor/2.jpg"
import dt3 from "../../assests/images/session/doctor/3.jpg"
import dt4 from "../../assests/images/session/doctor/4.jpg"
import dt5 from "../../assests/images/session/doctor/5.jpg"
import dt6 from "../../assests/images/session/doctor/6.jpg"
import dt7 from "../../assests/images/session/doctor/7.jpg"
import dt8 from "../../assests/images/session/doctor/8.jpg"

const cx = classNames.bind(styles)

function Doctor({ settings }) {
	return (
		<>
			<div className={cx("session-title")}>
				<h3>Bác sĩ nổi bật tuần qua</h3>
				<button>Tìm kiếm</button>
			</div>
			<div className='slide-customize'>
				<Slider {...settings}>
					<div className={cx("doctor-container")}>
						<img
							className={cx("doctor-avatar")}
							src={dt1}
							alt='doctor'
						/>
						<p className={cx("doctor-name")}>
							Bác sĩ chuyên khoa Trần Minh Nguyên
						</p>
						<p className={cx("doctor-specialist")}>
							Sức khỏe tâm thần -Tư vấn, trị liệu tâm lý
						</p>
					</div>
					<div className={cx("doctor-container")}>
						<img
							className={cx("doctor-avatar")}
							src={dt2}
							alt='doctor'
						/>

						<p className={cx("doctor-name")}>
							Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị Hoài An
						</p>
						<p className={cx("doctor-specialist")}>
							Tai Mũi Họng - Khoa Nhi
						</p>
					</div>
					<div className={cx("doctor-container")}>
						<img
							className={cx("doctor-avatar")}
							src={dt3}
							alt='doctor'
						/>
						<p className={cx("doctor-name")}>
							Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng
						</p>
						<p className={cx("doctor-specialist")}>Da liễu</p>
					</div>
					<div className={cx("doctor-container")}>
						<img
							className={cx("doctor-avatar")}
							src={dt4}
							alt='doctor'
						/>
						<p className={cx("doctor-name")}>
							Giáo sư, Thầy thuốc nhân dân Đỗ Như Hơn
						</p>
						<p className={cx("doctor-specialist")}>
							Chuyên khoa Mắt
						</p>
					</div>
					<div className={cx("doctor-container")}>
						<img
							className={cx("doctor-avatar")}
							src={dt5}
							alt='doctor'
						/>
						<p className={cx("doctor-name")}>
							Giáo sư, Tiến sĩ Hà Văn Quyết
						</p>
						<p className={cx("doctor-specialist")}>Tiêu hóa</p>
					</div>
					<div className={cx("doctor-container")}>
						<img
							className={cx("doctor-avatar")}
							src={dt6}
							alt='doctor'
						/>
						<p className={cx("doctor-name")}>
							Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thi Hùng
						</p>
						<p className={cx("doctor-specialist")}>Thần kinh</p>
					</div>
					<div className={cx("doctor-container")}>
						<img
							className={cx("doctor-avatar")}
							src={dt7}
							alt='doctor'
						/>
						<p className={cx("doctor-name")}>
							Bác sĩ chuyên khoa II Trần Thị Hoài Hương
						</p>
						<p className={cx("doctor-specialist")}>Da liễu</p>
					</div>
					<div className={cx("doctor-container")}>
						<img
							className={cx("doctor-avatar")}
							src={dt8}
							alt='doctor'
						/>
						<p className={cx("doctor-name")}>
							PGS, TS, Giảng viên cao cấp Trần Hữu Bình
						</p>
						<p className={cx("doctor-specialist")}>
							Sức khỏe tâm thần
						</p>
					</div>
				</Slider>
			</div>
		</>
	)
}

export default Doctor
