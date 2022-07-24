import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AiOutlineClose } from "react-icons/ai"
import * as Yup from "yup"
import Input from "../../components/Input/Input"
import { checkEmail, register } from "../../redux/apiRequest"
import "./Register.css"
import { routes } from "../../routes/routes"

function Register() {
	const [state, setState] = useState(false)
	const [avatar, setAvatar] = useState(null)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	console.log(avatar)
	const handleChange = e => {
		setAvatar("https://graph.facebook.com/2606936856104529/picture")
	}

	useEffect(() => {
		return () => {
			avatar && URL.revokeObjectURL(avatar.thumb)
		}
	}, [avatar])

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			avatar: "",
			password: "",
			confirmPassword: "",
		},
		validationSchema: Yup.object({
			name: Yup.string()
				.required("Required")
				.min(4, "Must more than 4 characters"),
			email: Yup.string()
				.required("Required")
				.matches(
					/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
					"You have entered an invalid email address!",
				),

			password: Yup.string()
				.required("Required")
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
					"Password invalid",
				),
			confirmPassword: Yup.string().oneOf(
				[Yup.ref("password"), null],
				"Password didn't match. Try again",
			),
		}),
		onSubmit: values => {
			values.avatar = avatar
			checkEmail(values.email).then(res => {
				const isCheckEmail = res.data.isAvailable
				if (!isCheckEmail) {
					setState(!state)
					formik.errors.email = "The email is already registered"
				}
				if (!avatar) {
					setState(!state)
					formik.errors.avatar = "Required"
				} else {
					register(values, dispatch, navigate)
				}
			})
		},
	})

	const handleClose = () => {
		navigate(routes.login)
	}

	return (
		<div className='form-wrapper'>
			<div className='container-form'>
				<form onSubmit={formik.handleSubmit}>
					<h2 className='form-title'>Register</h2>
					<span className='icon-close-form' onClick={handleClose}>
						<AiOutlineClose />
					</span>

					<div className='wrapper-input-form'>
						<Input
							type='text'
							placeholder='Enter your username'
							textLabel='Username'
							id='name'
							onChange={formik.handleChange}
						/>
						{formik.errors.name && formik.touched.name && (
							<div className='error-mess'>
								{formik.errors.name}
							</div>
						)}
					</div>
					<div className='wrapper-input-form'>
						<Input
							type='email'
							placeholder='Enter your email'
							textLabel='Email'
							id='email'
							onChange={formik.handleChange}
						/>
						{formik.errors.email && formik.touched.email && (
							<div className='error-mess'>
								{formik.errors.email}
							</div>
						)}
					</div>
					<div className='wrapper-input-form'>
						<Input
							id='avatar'
							type='file'
							textLabel='Avatar'
							onChange={handleChange}
						/>
						{formik.errors.avatar && (
							<div className='error-mess'>
								{formik.errors.avatar}
							</div>
						)}
					</div>
					<div className='wrapper-input-form'>
						<Input
							type='password'
							typePassword
							textLabel='Password'
							placeholder='Enter your password'
							id='password'
							onChange={formik.handleChange}
						/>
						{formik.errors.password && formik.touched.password && (
							<div className='error-mess'>
								{formik.errors.password}
							</div>
						)}
					</div>
					<div className='wrapper-input-form'>
						<Input
							type='password'
							typePassword
							textLabel='Confirm Password'
							placeholder='Enter your confirm'
							id='confirmPassword'
							onChange={formik.handleChange}
						/>
						{formik.errors.confirmPassword &&
							formik.touched.confirmPassword && (
								<div className='error-mess'>
									{formik.errors.confirmPassword}
								</div>
							)}
					</div>
					<div className='wrapper-btn-submit'>
						<button type='submit' className='form-submit'>
							Register
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Register
