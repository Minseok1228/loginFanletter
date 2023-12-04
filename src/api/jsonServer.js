import axios from "axios";
import authInstance from "./authApi";
const jsonServerInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
})

const accessToken = localStorage.getItem("accessToken")

const checkToken = async () => {
    if (accessToken) {
        try {
            await authInstance.get('/user', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                }
            })
        } catch (error) {
            console.log(error)
            console.log('토큰이 유효하지 않습니다.')

        }
    } else if (!accessToken) {
        console.log('토큰이 없습니다.')
    }
}

jsonServerInstance.interceptors.request.use(
    async (config) => {
        await checkToken()

        console.log('config', config)
        return (config)



    }, function (error) {
        console.log('프로미스', error)
        return Promise.reject(error)
    }
)

export default jsonServerInstance