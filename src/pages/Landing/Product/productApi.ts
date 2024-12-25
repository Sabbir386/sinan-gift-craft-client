import { baseApi } from "../../../redux/api/baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products/create-product",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["product"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getAllCategoriesWithProducts: builder.query({
      query: () => ({
        url: "/products/getAllCategoriesWithProducts",
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...productData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetAllCategoriesWithProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
