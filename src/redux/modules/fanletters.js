import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState =
{
    fanLetters: [],
    isLoading: true,
    isError: false,
    error: null,
}
console.log(initialState); // Add this line

export const __getFanLetters = createAsyncThunk(
    "getFanLetters",
    async (payload, thunkAPI) => {
        try {
            console.log("Sending Axios request");

            const res = await axios.get(`${process.env.REACT_APP_SEVER_URL}/fanLetters?_sort=createdAt&_order=desc`)
            console.log('res', res)
            console.log('fullfilled', thunkAPI.fulfillWithValue(res.data))
            return thunkAPI.fulfillWithValue(res.data)
        } catch (error) {
            console.log('error', error)
            return thunkAPI.rejectWithValue(error.data)

        }
    }
)
// export const __addFanLetters = createAsyncThunk(
//     "addFanLetters",
//     async (payload,thunkAPI)=>{
//         try {
//             const res = await axios.post('http://localhost:5000/fanLetters',payload)

//         } catch (error) {

//         }
//     }
// )
//data에서 id로 가져옴=>프로필?
// const fetchUserById = createAsyncThunk(
//     'users/fetchByIdStatus',
//     async (userId: number, thunkAPI) => {
//       const response = await userAPI.fetchById(userId)
//       return response.data
//     }
//   )
// extraReducers: (builder) => {
//     builder.addCase(fetchUserById.fulfilled, (state, action) => {
//       state.entities.push(action.payload)
//호출방법
//dispatch(fetchUserById(123))

//extraReducers []사용이유 =>  createAsyncThunk가 생성하는 액션타입 = 일반 문자열이 아닌 특별한 문자열
//

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