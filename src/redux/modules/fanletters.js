import data from "../../assets/fakeData.json"

const ADD_FANLETTER = "ADD_FANLETTER"
const DELETE_FANLETTER = "DELETE_FANLETTER"
const CHANGED_FANLETTER = 'CHANGED_FANLETTER'

export const addFanLetter = (letter) => {
    return {
        type: ADD_FANLETTER,
        payload: letter
    }
}
export const deleteFanletter = (letter) => {
    return {
        type: DELETE_FANLETTER,
        payload: letter
    }
}
export const changeFanletter = (letter) => {
    return {
        type: CHANGED_FANLETTER,
        payload: letter,
    }

}
const initialState = data

const fanletters = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FANLETTER:

            return action.payload
        case DELETE_FANLETTER:
            const newLetters = state.filter((letter) => {
                return letter.id !== action.payload;
            });

            return newLetters
        case CHANGED_FANLETTER:
            const letter = action.payload.letter
            const commentChange = action.payload.comment

            const changedletter = { ...letter, comment: commentChange };
            const changedFanLetters = state.map((letter) => {
                return letter.id === changedletter.id ? changedletter : letter;
            });

            return changedFanLetters

        default:
            return state;
    }

}
export default fanletters