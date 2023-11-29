const ADD_COMMENT = "ADD_COMMENT"

export const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}
const initialState = ""

const comment = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMENT:
            return action.payload
        default:
            return state;
    }

}
export default comment