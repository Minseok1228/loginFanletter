import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import jsonServerInstance from "../../api/jsonServer";
const initialState =
{
    fanLetters: [],
    isLoading: true,
    isError: false,
    error: null,
}
export const __getFanLetters = createAsyncThunk(
    "getFanLetters",
    async (payload, thunkAPI) => {
        try {
            console.log("Sending Axios request");
            const res = await jsonServerInstance.get(`/fanLetters`)

            // const res = await jsonServerInstance.get(`/fanLetters?_sort=createdAt&_order=desc`)
            //desc를 넣으면 오히려 과거순
            return thunkAPI.fulfillWithValue(res.data)
        } catch (error) {
            console.log('error', error)
            return thunkAPI.rejectWithValue(error.data)

        }
    }
)
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
    },
    extraReducers: {
        [__getFanLetters.pending]: (state) => {
            console.log("pending action");

            state.isLoading = true;
            state.isError = false;
        },
        [__getFanLetters.fulfilled]: (state, action) => {
            console.log("fulfilled action");

            state.isLoading = false;
            state.isError = false;
            state.fanLetters = (action.payload)
        },
        [__getFanLetters.rejected]: (state, action) => {
            console.log("rejected action");

            state.isLoading = false;
            state.isError = true;
            state.error = action.payload
        }
    }
})
export default fanlettersSlice.reducer
export const { addFanLetter, deleteFanLetter, changeFanLetter } = fanlettersSlice.actions