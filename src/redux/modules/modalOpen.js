const HANDLE_EDIT = 'HANDLE_EDIT'

export const handleEdit = (boolean) => {
    return {
        type: HANDLE_EDIT,
        payload: boolean,
    }
}
const initialState = false

const modalOpen = (state = initialState, action) => {
    switch (action.type) {
        case HANDLE_EDIT:
            return action.payload
        default:
            return state;
    }

}
export default modalOpen