import { createContext, useReducer, useEffect } from 'react'
import axios from 'axios'
import { authReducer } from '../reducers/authReducer'
import { LOCAL_STORAGE_TOKEN_NAME } from '../../config/Route/constants'
import setAuthToken from '../../utils/setAuthToken'


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

    // Authenticate user
    const loadUser = async () => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try {
            const response = await axios.get(`http://localhost:5000/home/`)
            if (response.data.success) {
                dispatch({
                    type: 'SET_AUTH',
                    payload: { isAuthenticated: true, user: response.data.user }
                })
            }
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch({
                type: 'SET_AUTH',
                payload: { isAuthenticated: false, user: null }
            })
        }
    }

    useEffect(() => loadUser(), [])

    //Login
    const loginUser = async data => {

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/home/login',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data,
            })
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }

            await loadUser()

            return response.data
        } catch (e) {
            return { success: false, message: e.message }
        }
    }

    //Register
    const registerUser = async data => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/home/register',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            })
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }

            await loadUser()

            return response.data
        }
        catch (e) {
            return { success: false, message: e.message }
        }
    }

    const registerEnterprise = async data => {
        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:5000/enterprise/register',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            })
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }

            await loadUser()

            return response.data
        }
        catch (e) {
            return { success: false, message: e.message }
        }
    }

    //ContextData
    const authContextData = { loginUser, registerUser, registerEnterprise, authState }

    //Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider