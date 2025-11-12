import { baseApi } from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getSingleUser: builder.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, userId) => [{ type: "User", id: userId }],
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "user/profile/update",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      //dummy
      query: ({ userId, payload }) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      //dummy
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    bulkDeleteUsers: builder.mutation({
      query: (payload) => ({
        url: "/user/bulk-delete",
        method: "DELETE",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBulkDeleteUsersMutation,
} = userApi;
