import { baseApi } from "../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGadgets: builder.query({
      query: (params) => ({
        url: "/products/all-gadgets",
        method: "GET",
        params,
      }),
      providesTags: ["Gadget"],
    }),
    getSingleGadget: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Gadget"],
    }),
  }),
});

export const { useGetAllGadgetsQuery, useGetSingleGadgetQuery } = productApi;
