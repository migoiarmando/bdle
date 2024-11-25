import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../root-reducer";

// Selector
export const selectUser = (state: RootState) => state.user;
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
