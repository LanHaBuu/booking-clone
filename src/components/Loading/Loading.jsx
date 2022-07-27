import "./Loading.scss"

function Loading() {
	return (
		<div className='container-fluid wrapper-loading'>
			<div className='loading'>
				<div className='spinner-border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</div>
			</div>
		</div>
	)
}

export default Loading
