import { useState } from "react"
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai"
import "./Input.css"

function Input({ type, typePassword, id, placeholder, textLabel, onChange }) {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<>
			<label htmlFor={id} className='label-input'>
				{textLabel}
			</label>
			{typePassword ? (
				<>
					<input
						type={showPassword ? "text" : type}
						id={id}
						placeholder={placeholder}
						spellCheck='false'
						onChange={onChange}
					/>
					<div
						className='icon-password'
						onClick={() => setShowPassword(!showPassword)}
					>
						{showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
					</div>
				</>
			) : (
				<>
					<input
						type={type}
						id={id}
						placeholder={placeholder}
						spellCheck='false'
						onChange={onChange}
					/>
				</>
			)}
		</>
	)
}

export default Input
