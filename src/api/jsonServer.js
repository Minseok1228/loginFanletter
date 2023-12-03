import axios from "axios";
import authInstance from "./authApi";

const jsonServerInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
})

const accessToken = localStorage.getItem("accessToken")
const checkToken = async () => {
    if (accessToken) {
        try {
            const res = await authInstance.get('/user', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                }
            })
            console.log('체크토큰', res)

        } catch (error) {
            console.log(error)

        }
    } else if (!accessToken) {
        console.log('토큰이 없습니다.')
    }
}

jsonServerInstance.interceptors.request.use(
    async (config) => {
        checkToken()
        // if () {

        // }
        console.log('config', config)
        return (config)


        //if문을 통해 토큰유효 확인
        // if (await /**회원정보확인 로직 */)
    }, function (error) {
        console.log('프로미스', error)
        return Promise.reject(error)
    }
)

export default jsonServerInstance