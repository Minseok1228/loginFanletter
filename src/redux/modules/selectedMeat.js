
const SELECTED_MEAT = "SELECTED_MEAT"
export const selectMeat = (meat) => {
    return {
        type: SELECTED_MEAT,
        payload: meat,
    }
}

const initialState = '새우살'

const selectedMeat = (state = initialState, action) => {

    switch (action.type) {
        case SELECTED_MEAT:
            return action.payload
        default:
            return state;
    }

}
export default selectedMeat