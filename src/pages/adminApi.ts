import { baseApi } from "../redux/api/baseApi";

export const createAdminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (adminInfo) => ({
        url: "/users/create-admin",
        method: "POST",
        body: adminInfo,
      }),
      invalidatesTags: ["admin"],
    }),
    viewAdmin: builder.query({
      query: () => ({
        url: "/admins",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
    singleAdmin: builder.query({
      query: (id) => ({
        url: `/admins/${id}`, 
        method: "GET",
      }),
      providesTags: ['Offer'], 
    }),
    updateAdmin: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/admins/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useViewAdminQuery,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
  useSingleAdminQuery
} = createAdminApi;
