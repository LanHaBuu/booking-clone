import classNames from "classnames/bind"
import styles from "./Session.module.css"

import Slider from "react-slick"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { nameSpecial } from "../../redux/apiRequest"

const cx = classNames.bind(styles)

function Specialty({ settings }) {
	const [data, setData] = useState([])

	useEffect(() => {
		nameSpecial().then(res => setData(res.data.Specialist))
	}, [])

	return (
		<>
			<div className={cx("session-title")}>
				<h3>Chuyên khoa phổ biến</h3>
				<button>Xem thêm</button>
			</div>
			<div className='slide-customize'>
				<Slider {...settings}>
					{data &&
						data.length > 0 &&
						data.map(item => (
							<div key={item.id}>
								<Link to={`/specialist/${item.id}`}>
									<img
										className={cx(
											"session-img",
											"img-fluid",
										)}
										src={item.img}
										alt='chuyên khoa'
									/>
								</Link>
								<span className='px-2'>{item.name}</span>
							</div>
						))}
				</Slider>
			</div>
		</>
	)
}

export default Specialty
