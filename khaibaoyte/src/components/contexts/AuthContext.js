import axios from 'axios'
import { createContext, useReducer } from 'react'
import { LOCAL_STORAGE_TOKEN_NAME } from '../../config/Route/constants'
import { authReducer } from '../reducers/authReducer'


export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })

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
                url: 'http://localhost:5000/enterprise/pre-register',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: data
            })
            if (response.data.success) {
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken);
            }

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