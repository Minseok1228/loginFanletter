const initialState = "새우살"
const WRITE_TO_MEAT = 'WRITE_TO_MEAT'

export const writeTo = (meat) => {
    return {
        type: WRITE_TO_MEAT,
        payload: meat
    }
}

const writeToMeat = (state = initialState, action) => {
    switch (action.type) {
        case WRITE_TO_MEAT:
            return action.payload
        default:
            return state;
    }

}
export default writeToMeat