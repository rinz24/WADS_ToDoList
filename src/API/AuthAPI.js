import axios from "axios";

const URL = 'http://localhost:5000/auth'

const registerAccount = async (username, email, password) => {
    try {
        const res = await axios.post(URL + '/register', { username, email, password, }, { withCredentials: true })
        return { success: true, data: res.data }
    }
    catch (err){
        console.error("Sign in error: ", err)
        return { success: false, data: null }
    }
}

const accountLogin = async (identifier, password) => {
    try {
        const res = await axios.post(URL + '/login', { identifier, password, }, { withCredentials: true })
        return { success: true, data: res.data }
    }
    catch (err){
        console.error("Log in error: ", err)
        return { success: false, data: null }
    }
}

const accountLogout = async () => {
    try {
        const res = await axios.post(URL + '/logout', {}, { withCredentials: true })
        return { success: true, data: res.data }
    }
    catch (err){
        console.error("Log out error: ", err)
        return { success: false, data: null }
    }
}

const fetchUserData = async () => {
    try {
        const res = await axios.get(URL + '/get-data', { withCredentials: true })
        return res.data
    }
    catch (err){
        console.error("Failed to fetch user data: ", err)
        return null
    }
}

