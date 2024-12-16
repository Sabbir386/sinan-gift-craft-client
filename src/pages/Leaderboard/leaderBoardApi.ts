import { baseApi } from "../../redux/api/baseApi";

// Extend the baseApi with the /all-payments and /recent-payments routes
export const leaderBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPayments: builder.query({
      query: () => ({
        url: "/payment/all-payments", // The route to fetch all payments
        method: "GET",
      }),
    }),
    getRecentPayments: builder.query({
      query: () => ({
        url: "/payment/recent-payments", // The route to fetch recent payments
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

// Export the hooks for fetching all payments and recent payments
export const { useGetAllPaymentsQuery, useGetRecentPaymentsQuery } = leaderBoardApi;
