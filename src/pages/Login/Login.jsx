import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
} from "firebase/auth"

import { IconFacebook, IconGoogle } from "../../components/Icons"
import Input from "../../components/Input/Input"
import { login } from "../../redux/apiRequest"
import "./Login.css"
import { app } from "../../firebase.config"
import { loginSuccess } from "../../redux/Slice/userSlice"
import { routes } from "../../routes/routes"

function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const auth = getAuth(app)
	const providerGoogle = new GoogleAuthProvider()
	const providerFacebook = new FacebookAuthProvider()
	const handleLoginGoogle = () => {
		signInWithPopup(auth, providerGoogle).then(res => {
			const { providerData } = res.user
			dispatch(loginSuccess(providerData[0]))
			localStorage.setItem("userGg", JSON.stringify(providerData[0]))
			navigate(routes.home)
		})
	}

	const handleLoginFacebook = () => {
		signInWithPopup(auth, providerFacebook).then(res => {
			dispatch(loginSuccess(res.user))
			localStorage.setItem("userFb", JSON.stringify(res.user))
			navigate(routes.home)
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		const user = {
			email,
			password,
		}
		login(user, dispatch, navigate)
	}

	return (
		<div className='form-wrapper'>
			<div className='container-form'>
				<form className='login' onSubmit={handleSubmit}>
					<h2 className='form-title'>Login</h2>
					<div className='wrapper-input-form'>
						<Input
							type='text'
							textLabel='Email'
							id='email'
							placeholder='Enter your email...'
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className='wrapper-input-form'>
						<Input
							type='password'
							typePassword
							textLabel='Password'
							id='password'
							placeholder='Enter your password...'
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className='wrapper-btn-submit'>
						<button type='submit' className='form-submit'>
							Log in
						</button>
					</div>
				</form>
				<footer className='footer-login-form'>
					<p className='footer-text'>Or sign in with:</p>
					<div
						className='wrapper-social-btn'
						onClick={handleLoginGoogle}
					>
						<IconGoogle className='btn-google' />
						<span className='social-text'>Sign in with Google</span>
					</div>
					<div
						className='wrapper-social-btn wrapper-btn-facebook'
						onClick={handleLoginFacebook}
					>
						<span className='btn-facebook'>
							<IconFacebook />
						</span>
						<span className='social-text'>
							Sign in with Facebook
						</span>
					</div>
					<div className='footer-navigate'>
						<p>Not a member?</p>
						<Link to={routes.register}>Signup now</Link>
					</div>
				</footer>
			</div>
		</div>
	)
}

export default Login
