import { createSlice } from "@reduxjs/toolkit"

const initialState = false
const modalOpenSlice = createSlice({
    name: 'modalOpen',
    initialState,
    reducers: {
        handleEdit: (state, action) => {
            return action.payload
        }
    }
})

export default modalOpenSlice.reducer
export const { handleEdit } = modalOpenSlice.actions