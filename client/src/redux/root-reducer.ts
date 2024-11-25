import { combineReducers } from "@reduxjs/toolkit";
import UserReducer from "./user/user.reducer";

const rootReducer = combineReducers({
  user: UserReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
