import { createSlice } from "@reduxjs/toolkit";
import { initialUserStateType } from "./user.types";

const initialState: initialUserStateType = {
  currentUser: null,
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

const UserReducer = UserSlice.reducer;

export default UserReducer;
