import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const commentSlice = createSlice({
    name: "comment",
    initialState: initialState,
    reducers: {
        addComment: (state, action) => {
            return action.payload
        }
    }
})

export default commentSlice.reducer
export const { addComment } = commentSlice.actions