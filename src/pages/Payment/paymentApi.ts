import { baseApi } from "../../redux/api/baseApi";

export const extendedBaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation({
      query: (paymentInfo) => ({
        url: "/payment/create-payment-intent",
        method: "POST",
        body: paymentInfo,
      }),
    }),
    savePaymentInfo: builder.mutation({
      query: (paymentInfo) => ({
        url: "/payment/save-payment-info",
        method: "POST",
        body: paymentInfo,
      }),
    }),
    createPaypalOrder: builder.mutation({
      query: () => ({
        url: "/paypal/create-order",
        method: "POST",
      }),
    }),
    completeOrder: builder.query({
      query: () => ({
        url: `/paypal/complete-order`,
        method: "GET",
      }),
    }),
    // Updated endpoint to get payment info without additional query params
    getPaymentInfo: builder.query({
      query: () => ({
        url: `/payment/payment-info`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePaymentIntentMutation,
  useSavePaymentInfoMutation,
  useCreatePaypalOrderMutation,
  useCompleteOrderQuery,
  useGetPaymentInfoQuery, // Export the new hook
} = extendedBaseApi;
