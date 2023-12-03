import axios from "axios";

const authInstance = axios.create({
    baseURL: process.env.REACT_APP_AUTH_URL
})
export default authInstance