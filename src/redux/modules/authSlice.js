import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    //서버와 통신하며 accesToken의 만료를 확인
    isLoggedIn: !!localStorage.getItem("accessToken"),
    userAvatar: localStorage.getItem("avatar"),
    userNickname: localStorage.getItem("nickname"),
    userId: localStorage.getItem("userId"),
    islogin: false,
    users: [
        {
            userId: 'aaaa',
            userPassword: 'aaaa',
            userNickname: 'aaaa'
        },
        {
            userId: 'bbbb',
            userPassword: 'bbbb',
            userNickname: 'bbbb'
        },
        {
            userId: 'cccc',
            userPassword: 'cccc',
            userNickname: 'cccc'
        },
    ]
}
export const __getLetters = createAsyncThunk(
    "getLetters",
    (payload, thunkAPI) => {

    }
)

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        //유효한 토큰을 가지고 있으면 로그인상태 유지, 아니면 로그아웃처리하여 로그인 페이지로 보내버리기.
        // checkLogin: (state, action) => {
        //     return state.isLoggedIn
        // },
        signIn: (state, action) => {
            const { avatar, nickname, userId } = action.payload
            localStorage.setItem("avatar", avatar)
            localStorage.setItem("nickname", nickname)
            localStorage.setItem("userId", userId)
            state.userAvatar = avatar
            state.userNickname = nickname
            state.userId = userId
            state.isLoggedIn = true
        },
        signUp: (state, action) => {
            const { userId, userPassword } = action.payload
            const user = state.users.find(user => user.userId === userId && user.userPassword === userPassword)

            state.isLoggedIn = Boolean(user)
        }

    }

})
export default authSlice.reducer
export const { checkLogin, signUp, signIn } = authSlice.actions