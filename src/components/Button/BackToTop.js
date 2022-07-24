import { useEffect, useState } from "react"
import { BsFillArrowUpCircleFill } from "react-icons/bs"

function BackToTop() {
	const [show, setShow] = useState(false)

	useEffect(() => {
		window.onscroll = function () {
			if (window.scrollY >= 500) {
				setShow(true)
			} else {
				setShow(false)
			}
		}
	}, [])

	const handleScroll = () => {
		window.scroll({
			behavior: "smooth",
			top: 100,
		})
	}

	return (
		<>
			{show && (
				<button
					onClick={handleScroll}
					style={{
						position: "fixed",
						right: "50px",
						bottom: "50px",
						fontSize: "2.2rem",
						color: "crimson",
					}}
				>
					<BsFillArrowUpCircleFill />
				</button>
			)}
		</>
	)
}

export default BackToTop
