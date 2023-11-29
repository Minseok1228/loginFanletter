import { createSlice } from "@reduxjs/toolkit"

const initialState = '새우살'

const selectedMeatSlice = createSlice({
    name: 'selectedMeat',
    initialState,
    reducers: {
        selectMeat: (state, action) => {
            return action.payload
        }
    }
})
export default selectedMeatSlice.reducer
export const { selectMeat } = selectedMeatSlice.actions