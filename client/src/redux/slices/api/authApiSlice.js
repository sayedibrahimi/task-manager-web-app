// import { USERS_URL } from "../../../utils/contants";
// import { apiSlice } from "../apiSlice";

// export const authApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (data) => ({
//         url: "tasks/auth",
//         method: "POST",
//         body: data,
//       }),
//     }),
//     signup: builder.mutation({
//       query: (data) => ({
//         url: `${USERS_URL}`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     logout: builder.mutation({
//       query: () => ({
//         url: `${USERS_URL}/logout`,
//         method: "POST",
//       }),
//     }),
//   }),
// });

// export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
//   authApiSlice;
