import axios from 'axios'
import { registerData } from '../containers/Auth/RegisterPage'
import { authData } from '../containers/Auth/AuthPage'

const strapiApi = axios.create({
    baseURL: 'http://localhost:1337/api',
})

export const createUser = async (data: registerData) => {
    return await strapiApi.post('auth/local/register', {
        ...data,
    })
}

export const loginUser = async (data: authData) => {
    return await strapiApi.post('auth/local', { ...data })
}
