import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
const nickNameSlice = createSlice({
    name: 'nickName',
    initialState,
    reducers: {
        addNickName: (state, action) => {
            return action.payload
        }
    }
})
export default nickNameSlice.reducer
export const { addNickName } = nickNameSlice.actions