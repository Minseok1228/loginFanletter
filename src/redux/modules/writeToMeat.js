
import { createSlice } from "@reduxjs/toolkit"

const initialState = "새우살"
const writeToSlice = createSlice({
    name: 'writeTo',
    initialState,
    reducers: {
        writeTo: (state, action) => {
            return action.payload
        }
    }
})
export default writeToSlice.reducer
export const { writeTo } = writeToSlice.actions