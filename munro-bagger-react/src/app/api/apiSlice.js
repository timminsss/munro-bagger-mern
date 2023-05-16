// instead of using axios
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  // change this for deployment
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
    tagTypes: ["Bagger", "User", "Munro"],
    endpoints: builder => ({})
})
