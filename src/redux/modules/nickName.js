const ADD_NICKNAME = "ADD_NICKNAME"

export const addNickName = (nickName) => {
    return {
        type: ADD_NICKNAME,
        payload: nickName
    }
}
const initialState = ''

const nickName = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NICKNAME:
            return action.payload
        default:
            return state;
    }

}
export default nickName