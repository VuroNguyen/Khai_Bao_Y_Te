import { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../components/contexts/AuthContext'
import LoginForm from '../pages/Login/index'
import RegisterForm from '../pages/Register/index'

const Auth = ({ authRoute }) => {
	const {
		authState: { authLoading, isAuthenticated }
	} = useContext(AuthContext)

	let body

	if (authLoading)
		body = (
			<div className='d-flex justify-content-center mt-2'>
				LOADING
			</div>
		)
	else if (isAuthenticated) return <Redirect to='/form' />
	else
		body = (
			<>
				{authRoute === 'login' && <LoginForm />}
				{authRoute === 'register' && <RegisterForm />}
			</>
		)

	return (
        <>
            {body}
        </>
	)
}

export default Auth
