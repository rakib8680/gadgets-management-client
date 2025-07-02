import { baseApi } from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGadgets: builder.query({
      query: (params) => ({
        url: "/products/all-gadgets?limit=20",
        method: "GET",
        params,
      }),
      providesTags: ["Gadget"],
    }),
  }),
});

export const { useGetAllGadgetsQuery } = productApi;
