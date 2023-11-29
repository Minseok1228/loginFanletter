import { createSlice } from "@reduxjs/toolkit"
import data from "../../assets/fakeData.json"

const initialState = data

const fanlettersSlice = createSlice({
    name: "fanletters",
    initialState: initialState,
    reducers: {
        addFanLetter: (state, action) => {
            console.log('fan', action.payload)
            return action.payload
        },
        deleteFanletter: (state, action) => {
            const newLetters = state.filter(letter => {
                return letter.id !== action.payload
            })
            return newLetters
        },
        changeFanLetter: (state, action) => {
            const letter = action.payload.letter
            const commentChange = action.payload.comment
            const changedletter = { ...letter, comment: commentChange };
            const changedFanLetters = state.map((letter) => {
                return letter.id === changedletter.id ? changedletter : letter;
            });

            return changedFanLetters
        }
    }
})
export default fanlettersSlice.reducer
export const { addFanLetter, deleteFanLetter, changeFanLetter } = fanlettersSlice.actions