import classNames from "classnames/bind"
import styles from "./Session.module.css"

import Slider from "react-slick"

import hb1 from "../../assests/images/session/hanbook/1.jpg"
import hb2 from "../../assests/images/session/hanbook/2.jpg"
import hb3 from "../../assests/images/session/hanbook/3.jpg"
import hb4 from "../../assests/images/session/hanbook/4.jpg"

const cx = classNames.bind(styles)

function Hanbook() {
	const settings = {
		dots: false,
		infinite: true,
		speed: 1000,
		slidesToShow: 2,
		slidesToScroll: 2,
	}
	return (
		<>
			<div className={cx("session-title")}>
				<h3>Cẩm nang</h3>
				<button>Tất cả bài viết</button>
			</div>
			<div className='slide-customize'>
				<Slider {...settings}>
					<div className={cx("hanbook-container")}>
						<img
							className={cx("hanbook-img")}
							src={hb1}
							alt='hanbook'
						/>
						<p>
							Giá xét nghiệm tuyến giáp bao nhiêu? Bảng giá một số
							địa chỉ
						</p>
					</div>
					<div className={cx("hanbook-container")}>
						<img
							className={cx("hanbook-img")}
							src={hb2}
							alt='hanbook'
						/>
						<p>
							Giá xét nghiệm máu bao nhiêu? Bảng giá tại địa chỉ
							xét nghiệm uy tín TP.HCM
						</p>
					</div>
					<div className={cx("hanbook-container")}>
						<img
							className={cx("hanbook-img")}
							src={hb3}
							alt='hanbook'
						/>
						<p>7 địa chỉ xét nghiệm viêm gan B uy tín tại TP.HCM</p>
					</div>
					<div className={cx("hanbook-container")}>
						<img
							className={cx("hanbook-img")}
							src={hb4}
							alt='hanbook'
						/>
						<p>6 địa chỉ xét nghiệm Gout (gút) uy tín ở TP.HCM</p>
					</div>
				</Slider>
			</div>
		</>
	)
}

export default Hanbook
