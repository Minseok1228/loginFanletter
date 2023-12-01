import fanletters from "../modules/fanletters";
import nickName from "../modules/nickName";
import comment from "../modules/comment";
import MEATS from "../modules/MEATS";
import selectedMeat from "../modules/selectedMeat";
import modalOpen from "../modules/modalOpen";
import commentChange from "../modules/commentChange";
import writeToMeat from "../modules/writeToMeat";
import authSlice from "../modules/authSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        commentChange,
        nickName,
        comment,
        MEATS,
        writeToMeat,
        selectedMeat,
        modalOpen,
        fanletters,
        authSlice,
    }
})

export default store