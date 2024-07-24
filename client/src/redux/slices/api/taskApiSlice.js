// import { TASKS_URL } from "../../../utils/contants";
// import { apiSlice } from "../apiSlice";

// const getAuthToken = () => {
//   // Replace this with your actual token retrieval logic
//   const { token } = localStorage.getItem("token");
//   console.log(token);
//   return token;
// };

// export const postApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     createTask: builder.mutation({
//       query: (data) => ({
//         url: `${TASKS_URL}`,
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${getAuthToken()}`, // Add the Authorization header
//         },
//         body: data,
//       }),
//     }),

//     duplicateTask: builder.mutation({
//       query: (id) => ({
//         url: `${TASKS_URL}/duplicate/${id}`,
//         method: "POST",
//         body: {},
//       }),
//     }),

//     updateTask: builder.mutation({
//       query: (data) => ({
//         url: `${TASKS_URL}/update/${data._id}`,
//         method: "PUT",
//         body: data,
//       }),
//     }),

//     getAllTask: builder.query({
//       query: ({ strQuery, isTrashed, search }) => ({
//         url: `${TASKS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
//         method: "GET",
//       }),
//     }),

//     getSingleTask: builder.query({
//       query: (id) => ({
//         url: `${TASKS_URL}/${id}`,
//         method: "GET",
//       }),
//     }),

//     createSubTask: builder.mutation({
//       query: ({ data, id }) => ({
//         url: `${TASKS_URL}/create-subtask/${id}`,
//         method: "PUT",
//         body: data,
//       }),
//     }),

//     postTaskActivity: builder.mutation({
//       query: ({ data, id }) => ({
//         url: `${TASKS_URL}/activity/${id}`,
//         method: "POST",
//         body: data,
//       }),
//     }),

//     trashTast: builder.mutation({
//       query: ({ id }) => ({
//         url: `${TASKS_URL}/${id}`,
//         method: "PUT",
//       }),
//     }),

//     deleteRestoreTast: builder.mutation({
//       query: ({ id, actionType }) => ({
//         url: `${TASKS_URL}/delete-restore/${id}?actionType=${actionType}`,
//         method: "DELETE",
//       }),
//     }),

//     getDasboardStats: builder.query({
//       query: () => ({
//         url: `${TASKS_URL}/dashboard`,
//         method: "GET",
//       }),
//     }),

//     changeTaskStage: builder.mutation({
//       query: (data) => ({
//         url: `${TASKS_URL}/change-stage/${data?.id}`,
//         method: "PUT",
//         body: data,
//       }),
//     }),
//   }),
// });

// export const {
//   usePostTaskActivityMutation,
//   useCreateTaskMutation,
//   useGetAllTaskQuery,
//   useCreateSubTaskMutation,
//   useTrashTastMutation,
//   useDeleteRestoreTastMutation,
//   useDuplicateTaskMutation,
//   useUpdateTaskMutation,
//   useGetSingleTaskQuery,
//   useGetDasboardStatsQuery,
//   useChangeTaskStageMutation,
// } = postApiSlice;
