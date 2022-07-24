import { BsFacebook, BsYoutube } from "react-icons/bs"

function Footer() {
	return (
		<div
			className='container-fluid py-2'
			style={{ backgroundColor: "#64b9e5", height: "80px" }}
		>
			<div className='container h-100'>
				<div className='d-flex justify-content-between h-100'>
					<span className='footer-left'>&copy; 2002 BookingCare</span>
					<div
						className='social my-auto'
						style={{ cursor: "pointer" }}
					>
						<BsFacebook
							style={{
								fontSize: "2rem",
								color: "rgb(60, 87, 158)",
							}}
							className='me-4'
						/>
						<BsYoutube
							style={{ fontSize: "2rem", color: "#CC191E" }}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
