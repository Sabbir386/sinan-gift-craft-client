import { baseApi } from "../redux/api/baseApi";

export const createCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (categoryInfo) => ({
        url: "/category/create-category/",
        method: "POST",
        body: categoryInfo,
      }),
      invalidatesTags: ["category"],
    }),
    viewCategory: builder.query({
      query: () => ({
        url: "/category/",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/category/${id}`,
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...categoryInfo }) => ({
        url: `/category/${id}/`,
        method: "PUT",
        body: categoryInfo,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useViewCategoryQuery,
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = createCategoryApi;
