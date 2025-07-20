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
    createGadget: builder.mutation({
      query: (gadget) => ({
        url: "/products/add-gadgets",
        method: "POST",
        body: gadget,
      }),
      invalidatesTags: ["Gadget"],
    }),
    deleteGadget: builder.mutation({
      query: (id) => ({
        url: `products/delete-gadget/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Gadget"],
    }),
    updateGadget: builder.mutation({
      query: (payload) => ({
        url: `products/update-gadget/${payload.id}`,
        method: "PATCH",
        body: payload.data,
      }),
      invalidatesTags: ["Gadget"],
    }),
  }),
});

export const {
  useGetAllGadgetsQuery,
  useGetSingleGadgetQuery,
  useCreateGadgetMutation,
  useDeleteGadgetMutation,
  useLazyGetAllGadgetsQuery,
  useUpdateGadgetMutation,
} = productApi;
