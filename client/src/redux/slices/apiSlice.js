import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({ baseUrl: apiUrl });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
