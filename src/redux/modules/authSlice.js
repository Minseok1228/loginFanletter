import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    //서버와 통신하며 accesToken의 만료를 확인
    isLoggedIn: !!localStorage.getItem("accessToken"),
    userAvatar: localStorage.getItem("avatar"),
    userNickname: localStorage.getItem("nickname"),
    userId: localStorage.getItem("userId"),
    islogin: false,
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        //유효한 토큰을 가지고 있으면 로그인상태 유지, 아니면 로그아웃처리하여 로그인 페이지로 보내버리기.
        //이거해야해!
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
    }

})
export default authSlice.reducer
export const { signIn } = authSlice.actions