import { baseApi } from "../../redux/api/baseApi";

export const withDrawalApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new withdrawal
    createWithdrawal: builder.mutation({
      query: (withdrawalData) => ({
        url: "/user/withdrawal/create-withdrawal",
        method: "POST",
        body: withdrawalData,
      }),
      invalidatesTags: ["Withdrawal"], // Cache invalidation for data consistency
    }),

    // Get all withdrawals
    viewWithdrawals: builder.query({
      query: () => ({
        url: "/user/withdrawal",
        method: "GET",
      }),
      providesTags: ["Withdrawal"],
    }),

    // Get a single withdrawal by ID
    singleWithdrawal: builder.query({
      query: (id) => ({
        url: `/user/withdrawal/${id}`,
        method: "GET",
      }),
      providesTags: ["Withdrawal"],
    }),

    // Get withdrawal history for a user
    userMultipleWithdrawals: builder.query({
      query: (userEmail) => ({
        url: `/user/withdrawal/history/user-multiple-withdrawal`,
        method: "GET",
        params: { userEmail },
      }),
      providesTags: ["Withdrawal"],
    }),

    // Update a withdrawal's status (PUT method)
    updateWithdrawalStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/user/withdrawal/status/${id}?status=${status}`, // Pass status in query
        method: 'PUT',
      }),
      invalidatesTags: ['Withdrawal'], // Cache invalidation
    }),


    // Filter withdrawals by status
    filterWithdrawalsByStatus: builder.query({
      query: (status) => ({
        url: `/user/withdrawal/statusFilter/filter-by-status`,
        method: "GET",
        params: { status },
      }),
      providesTags: ["Withdrawal"],
    }),


    // Delete a withdrawal
    deleteWithdrawal: builder.mutation({
      query: (id) => ({
        url: `/user/withdrawal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Withdrawal"], // Cache invalidation for consistency
    }),

    // Toggle withdrawal status (PUT method)
    toggleWithdrawalStatus: builder.mutation({
      query: (id) => ({
        url: `/user/withdrawal/toggle-status/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Withdrawal"], // Invalidate cache to reflect toggled status
    }),
  }),
});

export const {
  useCreateWithdrawalMutation,
  useViewWithdrawalsQuery,
  useSingleWithdrawalQuery,
  useUserMultipleWithdrawalsQuery,
  useUpdateWithdrawalStatusMutation,
  useDeleteWithdrawalMutation,
  useToggleWithdrawalStatusMutation,
  useFilterWithdrawalsByStatusQuery,
} = withDrawalApi;
