import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    registration: builder.mutation({
      query: (normalUser) => ({
        url: "/users/create-User",
        method: "POST",
        body: normalUser,
      }),
      invalidatesTags: ["normalUser"],
    }),
    viewNormalUsers: builder.query({
      query: () => ({
        url: "/normalUsers",
        method: "GET",
      }),
      providesTags: ["normalUser"],
    }),
    deleteNormalUser: builder.mutation({
      query: (id) => ({
        url: `/normalUsers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["normalUser"],
    }),
    singleNormalUser: builder.query({
      query: (id) => ({
        url: `/normalUsers/${id}`,
        method: "GET",
      }),
      providesTags: ["normalUser"],
    }),
    findByEmailUser: builder.query({
      query: (email) => ({
        url: `/users/find-by-email?email=${email}`,
        method: "GET",
      }),
      providesTags: ["users"],
    }),
    updateNormalUser: builder.mutation({
      query: ({ id, normalUser }) => ({
        url: `/normalUsers/${id}`,
        method: "PATCH",
        body: normalUser,
      }),
      invalidatesTags: ["normalUser"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegistrationMutation,
  useViewNormalUsersQuery,
  useDeleteNormalUserMutation,
  useUpdateNormalUserMutation,
  useSingleNormalUserQuery,
  useFindByEmailUserQuery,
} = authApi;
