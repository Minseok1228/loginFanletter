import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
const commentChangeSlice = createSlice({
    name: "commentChange",
    initialState: initialState,
    reducers: {
        changeComment: (state, action) => {
            return action.payload
        }
    }
})
export default commentChangeSlice.reducer
export const { changeComment } = commentChangeSlice.actions;