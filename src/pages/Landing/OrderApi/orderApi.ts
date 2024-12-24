import { baseApi } from "../../../redux/api/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/user-order/create-order/",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["order"],
    }),
    viewOrders: builder.query({
      query: () => ({
        url: "/user-order/",
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/user-order/${id}/`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, ...orderData }) => ({
        url: `/user-order/${id}/`,
        method: "PUT",
        body: orderData,
      }),
      invalidatesTags: ["order"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/user-order/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),
    getOrdersByEmail: builder.query({
      query: (email) => ({
        url: `/user-order/userEmail?email=${encodeURIComponent(email)}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useViewOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useGetOrdersByEmailQuery,
} = orderApi;
