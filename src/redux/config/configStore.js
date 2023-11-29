import { createStore } from "redux";
import { combineReducers } from "redux";
import fanletters from "../modules/fanletters";
import nickName from "../modules/nickName";
import comment from "../modules/comment";
import MEATS from "../modules/MEATS";
import selectedMeat from "../modules/selectedMeat";
import modalOpen from "../modules/modalOpen";
import commentChange from "../modules/commentChange";
import writeToMeat from "../modules/writeToMeat";

const rootReducer = combineReducers({
    commentChange,
    nickName,
    comment,
    MEATS,
    writeToMeat,
    selectedMeat,
    modalOpen,
    fanletters,



});
const store = createStore(rootReducer)

export default store