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
    updateUser: builder.mutation({ //dummy
      query: ({ userId, payload }) => ({
        url: `/user/${userId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({ //dummy
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
