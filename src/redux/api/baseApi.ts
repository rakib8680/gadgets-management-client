import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes:["Gadget"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://gadgets-management-server.vercel.app/api",
  }),
  endpoints: () => ({}),
});
