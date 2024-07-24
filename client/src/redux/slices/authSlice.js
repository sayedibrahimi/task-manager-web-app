import { createSlice } from "@reduxjs/toolkit";
import fetchUser from "../../actions/usersActions";

const initialState = {
  user: null,
  isSidebarOpen: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUser.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchUser.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //       state.loading = false;
  //     })
  //     .addCase(fetchUser.rejected, (state) => {
  //       state.loading = false;
  //     });
  // },
});

export const { setOpenSidebar } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;

export default authSlice.reducer;
